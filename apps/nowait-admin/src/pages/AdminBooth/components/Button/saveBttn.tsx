import React from "react";
import loadingSpanner from "../../../../assets/loading.svg";

interface SaveButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onClick,
  loading,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`w-full py-4 rounded-[8px] text-14-semibold transition-colors
        ${
          disabled
            ? loading
              ? "flex justify-center bg-[#16191E] text-white cursor-pointer"
              : "bg-black-25 text-black-55 cursor-not-allowed"
            : "bg-[#16191E] text-white cursor-pointer"
        }`}
    >
      {loading ? (
        <div>
          <img src={loadingSpanner} className="animate-spin" />
        </div>
      ) : (
        "저장하기"
      )}
    </button>
  );
};

export default SaveButton;
