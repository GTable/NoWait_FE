import type { MouseEventHandler } from "react";
import closeIcon from "../assets/close.svg";
interface CloseButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: number;
  height?: number;
}

const CloseButton = ({
  onClick,
  width = 11,
  height = 11,
}: CloseButtonProps) => {
  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onClick}
      className={`flex items-center justify-center h-6 w-6`}
    >
      <img
        src={closeIcon}
        width={width}
        height={height}
        alt="닫기 아이콘"
        className="hover:brightness-[110%] cursor-pointer"
      />
    </button>
  );
};

export default CloseButton;
