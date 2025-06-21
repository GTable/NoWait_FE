// src/components/RedBadge.tsx
import React from "react";

interface RedBadgeProps {
  label: string;
}

const RedBadge: React.FC<RedBadgeProps> = ({ label }) => {
  return (
    <div className="inline-block h-[32px] bg-[#FFECE6]  rounded-[8px] flex items-center justify-center">
      <p className="flex py-[5px] px-[10px] items-center h-[32px] text-[#ff4103] text-16-medium">
        {label}
      </p>
    </div>
  );
};

export default RedBadge;
