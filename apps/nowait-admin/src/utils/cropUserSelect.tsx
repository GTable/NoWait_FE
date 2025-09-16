export type CroppedAreaPixels = {
  width: number;
  height: number;
  x: number;
  y: number;
};

function readImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = url;
  });
}

/** react-easy-crop의 croppedAreaPixels을 받아 지정한 출력 크기로 캔버스 리사이즈 */
export async function getCroppedFile(
  file: File,
  cropPx: CroppedAreaPixels,
  outW: number,
  outH: number,
  mime: "image/jpeg" | "image/png" = "image/jpeg",
  quality = 0.92
): Promise<File> {
  const imageURL = URL.createObjectURL(file);
  const image = await readImage(imageURL);

  // 소스 크롭 → 타겟 크기(outW×outH)로 리사이즈
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  // drawImage(이미지, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(
    image,
    cropPx.x,
    cropPx.y,
    cropPx.width,
    cropPx.height,
    0,
    0,
    outW,
    outH
  );

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), mime, quality)
  );

  const ext = mime === "image/png" ? "png" : "jpg";
  const out = new File([blob], file.name.replace(/\.\w+$/, `.${ext}`), {
    type: mime,
    lastModified: Date.now(),
  });

  URL.revokeObjectURL(imageURL);
  return out;
}
