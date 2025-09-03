// src/components/NewOrderToast.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useNewOrderToastStore } from "../hooks/useNewOrderToastStore";
import CloseButton from "./closeButton";

function formatCurrency(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

/** 오른쪽 스와이프 dismiss + 탭 탐지 */
function SwipeToDismiss({
  onDismiss,
  onTap,
  children,
}: {
  onDismiss: () => void;
  onTap?: () => void;
  children: React.ReactNode;
}) {
  const THRESHOLD = 60;
  const MAX_X = 140;
  const TAP_TOL = 6;

  const startX = React.useRef(0);
  const startY = React.useRef(0);
  const moved = React.useRef(false);

  const [tx, setTx] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    moved.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (Math.abs(dx) > TAP_TOL || Math.abs(dy) > TAP_TOL) moved.current = true;

    // 수직 우선이면 무시
    if (Math.abs(dy) > Math.abs(dx)) return;

    // 오른쪽 이동만 반영
    if (dx > 0) setTx(Math.min(MAX_X, dx));
  };

  const endDrag = () => {
    if (!dragging) return;

    const didSwipe = tx >= THRESHOLD;
    if (didSwipe) {
      onDismiss(); // 스와이프 → 제거
    } else if (!moved.current) {
      onTap?.(); // 거의 안 움직였으면 → 탭으로 처리
    }
    setTx(0);
    setDragging(false);
  };

  // 스와이프 후 발생하는 "유령 클릭" 1회 차단(탭은 통과)
  const onClickCapture = (e: React.MouseEvent) => {
    if (tx >= THRESHOLD) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="pointer-events-auto" onClickCapture={onClickCapture}>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          transform: `translateX(${tx}px)`,
          transition: dragging ? "none" : "transform 200ms ease",
          touchAction: "pan-y",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function NewOrderToast() {
  const { toasts, removeToast } = useNewOrderToastStore();
  const navigate = useNavigate();
  const storeId = localStorage.getItem("storeId") ?? "";

  const dismissedSet = useMemo(() => {
    try {
      const raw = localStorage.getItem("toasts:dismissed");
      return new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      return new Set<string>();
    }
  }, [toasts]);

  const visibles = useMemo(() => {
    const res: typeof toasts = [];
    for (const t of toasts) {
      if (!dismissedSet.has(t.id)) res.push(t);
      if (res.length === 3) break;
    }
    return res; // [1,2,3] → 3 삭제 시 [1,2,4] → 다음 [1,2,4], 4 삭제 시 [1,2,5] ...
  }, [toasts, dismissedSet]);

  return (
    <>
      <audio
        id="new-order-audio"
        src="/assets/sound/newOrder.mp3"
        preload="auto"
      />
      <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        {visibles.map((t) => {
          const tableId = t.meta?.tableId as number | undefined;
          const orderName = t.meta?.orderName ?? "신규 주문";
          const menuDetails = (t.meta?.menuDetails ?? {}) as Record<
            string,
            { quantity?: number; price?: number }
          >;

          const names = Object.keys(menuDetails);
          const computedTotal =
            typeof t.meta?.totalPrice === "number"
              ? t.meta.totalPrice
              : names.reduce((sum, name) => {
                  const { quantity = 0, price = 0 } = menuDetails[name] ?? {};
                  return sum + quantity * price;
                }, 0);

          const firstMenu = names[0];
          const othersCount = Math.max(0, names.length - 1);
          const summary =
            firstMenu && othersCount > 0
              ? `${firstMenu} 외 ${othersCount}개`
              : firstMenu || "메뉴 없음";

          return (
            <SwipeToDismiss
              key={t.id}
              onDismiss={() => removeToast(t.id)}
              onTap={() => {
                const params = new URLSearchParams();
                params.set("order", String(t.orderId));
                params.set("status", t.status);
                navigate(
                  {
                    pathname: `/admin/orders/${storeId}`,
                    search: params.toString(),
                  },
                  { replace: true }
                );

                removeToast(t.id);
              }}
            >
              <div
                role="alert"
                className={[
                  "relative w-[262px] h-[95px] px-[13px] pt-[13px] pb-[16px]",
                  "rounded-[14px] bg-[#FBFBFB]/50 border border-[#E9E9E9]",
                  "backdrop-blur-[200px] shadow-[0_8px_25px_rgba(0,0,0,0.10)]",
                  "translate-y-2 opacity-0 animate-[toastIn_200ms_ease_forwards]",
                ].join(" ")}
              >
                {/* 상단: 라벨 & 닫기 */}
                <div className="flex items-center justify-between">
                  <span className="text-13-semibold text-[#222222]/60">
                    신규 주문
                  </span>
                  <CloseButton
                    width={9.41}
                    height={9.41}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeToast(t.id);
                    }}
                  />
                </div>

                {/* 본문 */}
                <div className="mt-[6px] flex items-center gap-[8px]">
                  <div className="w-9 h-9 rounded-full bg-[#6C7B94] flex items-center justify-center">
                    <span className="text-18-semibold">{tableId ?? "-"}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-15-semibold">
                      {orderName}
                      <span className="mx-[6px] text-[#D5D5D5]">|</span>
                      {formatCurrency(computedTotal)}
                    </div>
                    <div className="mt-[2px] text-13-medium whitespace-nowrap">
                      {summary}
                    </div>
                  </div>
                </div>

                <style>{`@keyframes toastIn{to{transform:translateY(0);opacity:1}}`}</style>
              </div>
            </SwipeToDismiss>
          );
        })}
      </div>
    </>
  );
}
