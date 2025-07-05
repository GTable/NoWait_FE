import React from "react";

interface ConfirmRemoveModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmRemoveModal = ({
  onCancel,
  onConfirm,
}: ConfirmRemoveModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white rounded-[20px] p-6 w-[305px] h-[170px] 
    md:w-[372px] text-center"
      >
        <h2 className="text-[17px] font-semibold text-black mb-2">
          대기열에서 제거할까요?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          삭제 후에는 대기 정보가 복구되지 않아요.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-md border border-gray-300 text-gray-600 bg-white"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-md bg-[#FF3B30] text-white font-medium"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveModal;
