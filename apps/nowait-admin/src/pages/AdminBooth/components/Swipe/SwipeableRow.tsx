import React, { useRef, useState } from "react";

type SwipeableRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
  disabled?: boolean;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const SwipeableRow = React.forwardRef<HTMLDivElement, SwipeableRowProps>(
  ({ children, onDelete, disabled = false, contentProps }, ref) => {
    const START_X = useRef(0);
    const START_Y = useRef(0);
    const [tx, setTx] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [mouseDragging, setMouseDragging] = useState(false);

    const BTN_WIDTH = 70;
    const GAP = 14; //삭제 버튼과 콘텐츠 사이 여백
    const MAX_LEFT = -(BTN_WIDTH + GAP);

    const movedRef = useRef(false);
    const suppressClickRef = useRef(false);

    /* ===== 터치 ===== */
    const onTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      const t = e.touches[0];
      START_X.current = t.clientX;
      START_Y.current = t.clientY;
      setDragging(true);
    };
    const onTouchMove = (e: React.TouchEvent) => {
      if (disabled || !dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - START_X.current;
      const dy = t.clientY - START_Y.current;
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) {
        e.preventDefault();
        setTx(Math.max(MAX_LEFT, dx)); //-84px까지 허용(70+14)
      }
      if (Math.abs(dx) > 10) movedRef.current = true;
    };
    const onTouchEnd = () => {
      if (disabled) return;
      if (movedRef.current) suppressClickRef.current = true;
      if (tx <= MAX_LEFT) onDelete(); //임계값을 -84px로
      setTx(0);
      setDragging(false);
    };

    /* ===== 마우스 ===== */
    const onMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      START_X.current = e.clientX;
      START_Y.current = e.clientY;
      setMouseDragging(true);
    };
    const onMouseMove = (e: React.MouseEvent) => {
      if (disabled || !mouseDragging) return;
      const dx = e.clientX - START_X.current;
      const dy = e.clientY - START_Y.current;
      if (Math.abs(dx) > 10) movedRef.current = true;
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) setTx(Math.max(MAX_LEFT, dx)); //-84px까지
    };
    const onMouseUp = () => {
      if (disabled) return;
      if (movedRef.current) suppressClickRef.current = true;
      if (tx <= MAX_LEFT) onDelete(); // -84px에서 삭제
      setTx(0);
      setMouseDragging(false);
    };

    return (
      <div
        className="relative overflow-hidden select-none"
        onClickCapture={(e) => {
          if (suppressClickRef.current) {
            e.stopPropagation();
            e.preventDefault();
            // @ts-ignore
            e.nativeEvent?.stopImmediatePropagation?.();
            suppressClickRef.current = false;
            movedRef.current = false;
          }
        }}
      >
        {/* 삭제 영역: 전체 폭을 70(버튼) + 14(GAP) = 84로 잡고 오른쪽 정렬 */}
        <div
          className="absolute top-[16px] right-0 flex items-center justify-end"
          style={{ width: BTN_WIDTH + GAP, height: 70 }}
        >
          <div
            className="rounded-[8px] bg-[#FFF0EB] flex items-center justify-center"
            style={{ width: BTN_WIDTH, height: 70 }}
          >
            <span className="text-[#FF4103] text-14-semibold">삭제</span>
          </div>
        </div>

        {/* 실제 row */}
        <div
          ref={ref}
          {...contentProps}
          className={`bg-white ${contentProps?.className ?? ""}`}
          style={{
            ...(contentProps?.style ?? {}),
            transform: `translateX(${tx}px)`,
            transition:
              dragging || mouseDragging ? "none" : "transform 200ms ease",
            position: "relative",
            zIndex: 1,
            width: "100%",
            userSelect: "none",
            touchAction: "pan-y",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => {
            if (mouseDragging) {
              if (tx <= MAX_LEFT) onDelete();
              setTx(0);
              setMouseDragging(false);
            }
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

SwipeableRow.displayName = "SwipeableRow";
