import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState {
  // 각 store별 타이머 상태를 저장
  timers: Record<
    number,
    {
      timeLeft: number;
      startTime: number; // 타이머가 시작된 시간 (timestamp)
      isActive: boolean;
    }
  >;

  // 타이머 설정 (10분 = 600초)
  setTimer: (storeId: number, timeLeft: number) => void;

  // 타이머 업데이트 (1초씩 감소)
  updateTimer: (storeId: number) => void;

  // 타이머 초기화
  resetTimer: (storeId: number) => void;

  // 특정 store의 남은 시간 가져오기
  getTimeLeft: (storeId: number) => number;

  // 타이머가 활성화되어 있는지 확인
  isTimerActive: (storeId: number) => boolean;

  // 모든 타이머 정리
  clearAllTimers: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timers: {},

      setTimer: (storeId: number, timeLeft: number) => {
        set((state) => ({
          timers: {
            ...state.timers,
            [storeId]: {
              timeLeft,
              startTime: Date.now(),
              isActive: true,
            },
          },
        }));
      },

      updateTimer: (storeId: number) => {
        set((state) => {
          const timer = state.timers[storeId];
          if (!timer || !timer.isActive) return state;

          const elapsed = Math.floor((Date.now() - timer.startTime) / 1000);
          const newTimeLeft = Math.max(0, timer.timeLeft - elapsed);

          return {
            timers: {
              ...state.timers,
              [storeId]: {
                ...timer,
                timeLeft: newTimeLeft,
                startTime: Date.now(), // 새로운 기준점 설정
                isActive: newTimeLeft > 0,
              },
            },
          };
        });
      },

      resetTimer: (storeId: number) => {
        set((state) => ({
          timers: {
            ...state.timers,
            [storeId]: {
              timeLeft: 600, // 10분으로 초기화
              startTime: Date.now(),
              isActive: true,
            },
          },
        }));
      },

      getTimeLeft: (storeId: number) => {
        const timer = get().timers[storeId];
        if (!timer || !timer.isActive) return 0;

        const elapsed = Math.floor((Date.now() - timer.startTime) / 1000);
        return Math.max(0, timer.timeLeft - elapsed);
      },

      isTimerActive: (storeId: number) => {
        const timer = get().timers[storeId];
        return timer?.isActive && timer.timeLeft > 0;
      },

      clearAllTimers: () => {
        set({ timers: {} });
      },
    }),
    {
      name: "timer-storage",
      // 타이머는 새로고침 시에도 유지되지만, 너무 오래된 타이머는 정리
      partialize: (state) => ({
        timers: Object.fromEntries(
          Object.entries(state.timers).filter(([_, timer]) => {
            const elapsed = Math.floor((Date.now() - timer.startTime) / 1000);
            return timer.timeLeft - elapsed > 0;
          })
        ),
      }),
    }
  )
);
