import { Button } from "@repo/ui";

type Props = {
  isActive: boolean;
  hasMarkers: boolean;
  onStart: () => void;
  onStop: () => void;
  onUndo: () => void;
  onReset: () => void;
  onCopy: () => void;
};

const MapControls = ({
  isActive,
  hasMarkers,
  onStart,
  onStop,
  onUndo,
  onReset,
  onCopy,
}: Props) => {
  return (
    <div className="flex gap-1 fixed left-1/2 bottom-2.5 -translate-x-1/2 w-full z-50 px-2.5">
      <Button disabled={isActive} onClick={onStart}>시작</Button>
      <Button disabled={!isActive} onClick={onStop}>중지</Button>
      <Button disabled={!hasMarkers} onClick={onUndo}>뒤로가기</Button>
      <Button onClick={onReset}>초기화</Button>
      <Button disabled={!hasMarkers} onClick={onCopy}>복사</Button>
    </div>
  );
};

export default MapControls;