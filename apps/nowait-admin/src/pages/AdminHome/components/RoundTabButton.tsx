// src/components/RoundTabButton.tsx
import React from "react";
import clsx from "clsx";

interface RoundTabButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const RoundTabButton: React.FC<RoundTabButtonProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 h-[33px] rounded-full border text-14-medium font-semibold transition",
        active
          ? "bg-white text-black border-gray-300"
          : "bg-white text-gray-400 border-gray-200"
      )}
    >
      {label}
    </button>
  );
};

export default RoundTabButton;
