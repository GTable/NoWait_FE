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
        "px-4 h-[33px] rounded-full border-[1.5px] text-14-medium font-semibold transition cursor-pointer",
        active
          ? "bg-white text-black border-navy-30"
          : "bg-white text-navy-30 border-navy-30"
      )}
    >
      {label}
    </button>
  );
};

export default RoundTabButton;
