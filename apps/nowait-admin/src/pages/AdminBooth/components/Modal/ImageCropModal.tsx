import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { getCroppedFile } from "../../../../utils/cropUserSelect";
import { useWindowWidth } from "../../../../hooks/useWindowWidth";

type Props = {
  /** 원본 파일 */
  file: File;
  /** 고정 비율 (예: 1, 또는 375/246) */
  aspect: number;
  /** 결과물 사이즈 */
  outWidth: number;
  outHeight: number;
  /** 이미지 인코딩 */
  mime?: "image/jpeg" | "image/png";
  quality?: number;
  /** 완료 콜백 (크롭된 File 반환) */
  onDone: (cropped: File) => void;
  onClose: () => void;
  title?: string;
};

export default function ImageCropModal({
  file,
  aspect,
  outWidth,
  outHeight,
  mime = "image/jpeg",
  quality = 0.92,
  onDone,
  onClose,
  title = "이미지 자르기",
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setSubmitting(true);
    try {
      const result = await getCroppedFile(
        file,
        {
          x: croppedAreaPixels.x,
          y: croppedAreaPixels.y,
          width: croppedAreaPixels.width,
          height: croppedAreaPixels.height,
        },
        outWidth,
        outHeight,
        mime,
        quality
      );
      onDone(result);
    } finally {
      setSubmitting(false);
    }
  };

  const url = URL.createObjectURL(file);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
      <div className="w-full max-w-[520px] rounded-2xl bg-white py-4 px-5">
        <div className="mb-3 text-16-semibold">{title}</div>

        <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-black cropper-wrapper">
          <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={true}
            zoomWithScroll={true}
            minZoom={1}
            maxZoom={6}
            objectFit="contain"
          />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <input
            className="w-full"
            type="range"
            min={1}
            max={6}
            step={0.01}
            value={zoom}
            onChange={(e) => {
              const v = Number(e.target.value);
              setZoom(v);
              const percent = ((v - 1) / (6 - 1)) * 100;
              e.target.style.setProperty("--value", `${percent}%`);
            }}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="h-10 rounded-lg bg-black-10 px-4"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="h-10 rounded-lg bg-black px-4 text-white disabled:opacity-60"
            disabled={submitting}
            onClick={handleConfirm}
          >
            {submitting ? "처리 중…" : "적용"}
          </button>
        </div>
      </div>
    </div>
  );
}
