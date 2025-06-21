// src/components/ImageBox.tsx
import React from "react";
import clsx from "clsx";

interface ImageBoxProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  contain?: boolean;
  border?: boolean;
  shadow?: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
  src,
  alt = "",
  width = 100,
  height = 100,
  rounded = true,
  contain = false,
  border = false,
  shadow = false,
}) => {
  return (
    <div
      className={clsx(
        "overflow-hidden",
        rounded && "rounded-lg",
        border && "border border-gray-200",
        shadow && "shadow"
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <img
        src={src}
        alt={alt}
        className={clsx(
          "w-full h-full object-cover",
          contain && "object-contain"
        )}
      />
    </div>
  );
};

export default ImageBox;
