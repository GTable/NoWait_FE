// src/hooks/useDetectNewOrders.ts
import { useEffect, useRef } from "react";
import type { Order } from "../types/order";
import { useNewOrderToastStore } from "./useNewOrderToastStore";

// “신규” 기준: 먼저 본 적 없는 주문 ID && (선택) 초기 상태
const isInitialStatus = (o: Order) => o.status === "WAITING_FOR_PAYMENT";

export function useDetectNewOrders(orders: Order[] | undefined) {
  const seenIdsRef = useRef<Set<number>>(new Set());
  const initializedRef = useRef(false);
  const lastSeenTsRef = useRef<number>(
    Number(localStorage.getItem("orders:last-seen") || 0)
  );

  const { pushToast } = useNewOrderToastStore();

  useEffect(() => {
    if (!orders) return;

    if (!initializedRef.current) {
      seenIdsRef.current = new Set(orders.map((o) => o.id));
      const maxCreated = Math.max(
        lastSeenTsRef.current,
        ...orders.map((o) => new Date(o.createdAt).getTime())
      );
      lastSeenTsRef.current = isFinite(maxCreated) ? maxCreated : 0;
      localStorage.setItem("orders:last-seen", String(lastSeenTsRef.current));
      initializedRef.current = true;
      return;
    }

    // 디프: 새 ID 또는 마지막 본 시각 이후에 만들어진 주문
    const newOnes = orders.filter((o) => {
      const isNewId = !seenIdsRef.current.has(o.id);
      const newerThanLastSeen =
        new Date(o.createdAt).getTime() > lastSeenTsRef.current;
      return isInitialStatus(o) && (isNewId || newerThanLastSeen);
    });

    if (newOnes.length) {
      newOnes.forEach((o) =>
        pushToast({
          id: String(o.id),
          orderId: o.id,
          status: o.status,
          title: "신규 주문 도착",
          body: `테이블 ${o.tableId} / ${o.depositorName ?? "고객"}`,
          meta: {
            tableId: o.tableId,
            orderName: o.depositorName,
            createdAt: o.createdAt,
            menuDetails: o.menuDetails, // 서버 응답이 { "화채": { quantity: 1, price: 3000 } } 이런 구조라면 그대로
            totalPrice: o.totalPrice ?? undefined, // 응답에 있으면 그대로, 없으면 생략 가능
          },
        })
      );
      // last-seen 갱신
      const maxCreated = Math.max(
        lastSeenTsRef.current,
        ...newOnes.map((o) => new Date(o.createdAt).getTime())
      );
      lastSeenTsRef.current = maxCreated;
      localStorage.setItem("orders:last-seen", String(maxCreated));
    }

    // 스냅샷 갱신
    seenIdsRef.current = new Set(orders.map((o) => o.id));
  }, [orders, pushToast]);
}
