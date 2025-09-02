import { create } from "zustand";

type OrderStatus = "WAITING_FOR_PAYMENT" | "COOKING" | "COOKED";

type Toast = {
  id: string;
  orderId: number;
  status: OrderStatus;
  title: string;
  body: string;
  meta?: {
    tableId: number;
    orderName: string;
    createdAt: string;
    menuDetails?: Record<string, { quantity: number; price: number }>;
    totalPrice?: number;
  };
};

type S = {
  toasts: Toast[];
  pushToast: (t: Toast) => void;
  removeToast: (id: string) => void;
};

const DISMISSED_KEY = "toasts:dismissed";

const loadDismissed = (): Set<string> => {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
};

const saveDismissed = (setObj: Set<string>) => {
  try {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...setObj]));
  } catch {}
};

export const useNewOrderToastStore = create<S>((set, get) => ({
  toasts: [],
  pushToast: (t) => {
    const dismissed = loadDismissed();
    if (dismissed.has(t.id)) return;
    // 중복 방지
    if (get().toasts.some((x) => x.id === t.id)) return;
    set((s) => ({
      toasts: [...s.toasts, t],
    }));
    // 사운드 (선택)
    try {
      const audio =
        document.querySelector<HTMLAudioElement>("#new-order-audio");
      audio?.play();
    } catch {}
    // 탭 비활성 시 타이틀 뱃지 (선택)
    if (document.hidden) {
      const base = document.title;
      document.title = "● 신규 주문 - " + base;
      setTimeout(() => (document.title = base), 4000);
    }
  },
  removeToast: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    const dismissed = loadDismissed();
    if (!dismissed.has(id)) {
      dismissed.add(id);
      saveDismissed(dismissed);
    }
  },
}));
