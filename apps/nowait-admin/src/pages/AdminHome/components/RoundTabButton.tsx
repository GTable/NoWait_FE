// src/components/RoundTabButton.tsx
import React from "react";
import clsx from "clsx";

interface RoundTabButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

const RoundTabButton: React.FC<RoundTabButtonProps> = ({
  label,
  active = false,
  onClick,
  count,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 h-[33px] rounded-full text-14-medium font-semibold transition cursor-pointer",
        "whitespace-nowrap",
        active ? "text-white bg-navy-80" : "bg-white text-navy-30"
      )}
    >
      {label}
      {count !== undefined && count > 0 && <span>&nbsp;{count}</span>}
    </button>
  );
};

export default RoundTabButton;
