import { useEffect, useRef, useState } from "react";
import dropIcon from "../../../../assets/drop_down.svg";

export const DropdownSelect = ({
  type,
  value,
  onChange,
  options,
  placeholder,
  className = "w-[124.25px]",
}: {
  type?: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const isPlaceholder = value == null || value.trim().length === 0;
  const display = isPlaceholder ? placeholder : value;

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // 키보드 탐색
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      setOpen(true);
      setHighlight(0);
      e.preventDefault();
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      setHighlight((h) => Math.min(h + 1, options.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlight((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlight >= 0) onChange(options[highlight]);
      setOpen(false);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      e.preventDefault();
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* 트리거 버튼 */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`h-full w-full ${
          type === "bank" ? "rounded-xl" : "rounded-lg"
        } border border-[#DDDDDD] bg-white focus:bg-[#FAFAFA] p-[10px] text-13-regular text-left`}
      >
        <span className={isPlaceholder ? "text-gray-400" : "text-black-90"}>
          {display}
        </span>
        <img
          src={dropIcon}
          alt=""
          className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 옵션 리스트 */}
      {open && (
        <div
          role="listbox"
          className="dropdown-scroll absolute left-0 top-[calc(100%+8px)] z-20 w-full rounded-lg border border-[#DDDDDD] bg-white
                      max-h-64 overflow-auto overscroll-contain"
        >
          {options.map((opt, idx) => {
            const selected = opt === value;
            const active = idx === highlight;

            return (
              <button
                key={opt}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlight(idx)}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-[124.25px] text-left px-[10px] py-[10px] text-13-regular
                            ${selected ? "text-black-90" : "text-black-90"}
                            ${active ? "bg-[#FAFAFA]" : "bg-white"}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
