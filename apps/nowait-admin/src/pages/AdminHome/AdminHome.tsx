import { useEffect, useMemo, useState } from "react";
import RoundTabButton from "./components/RoundTabButton";
import refreshIcon from "../../assets/refresh.svg";
import { WaitingCard } from "./components/WaitingCard";
import { useGetReservationList } from "../../hooks/Reservation/useGetReservationList";
import { useUpdateReservationStatus } from "../../hooks/Reservation/useUpdateReservationStatus";
import ConfirmRemoveModal from "../../components/ConfirmRemoveModal";
import ToggleSwitch from "./components/ToggleSwitch";
import { useGetCompletedList } from "../../hooks/Reservation/useGetCompletedList";
import { useToggleStoreActive } from "../../hooks/useToggleActive";
import { useGetStore } from "../../hooks/booth/store/useGetStore";

type WaitingStatus = "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED";

interface Reservation {
  id: number;
  userId: number;
  reservationNumber: string;
  time: string;
  requestedAt: string;
  updatedAt?: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phone: string;
  status: WaitingStatus;
  calledAt?: string;
}

const AdminHome = () => {
  const [noShowIds, setNoShowIds] = useState<number[]>([]);
  const { mutate: updateStatus } = useUpdateReservationStatus();
  const [showModal, setShowModal] = useState(false);

  const [activeTab, setActiveTab] = useState("전체");
  const storeId = Number(localStorage.getItem("storeId"));
  const [isOn, setIsOn] = useState<boolean | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [targetReservation, setTargetReservation] =
    useState<Reservation | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: store } = useGetStore(storeId);
  const { data: waitingList, refetch: refetchWaiting } =
    useGetReservationList(storeId); //calling, wating
  const { data: completedList, refetch: refetchCompleted } =
    useGetCompletedList(storeId); //canceled, conformed
  const { mutate: toggleActive } = useToggleStoreActive();

  const toggle = () => {
    toggleActive(storeId, {
      onSuccess: (newStatus: boolean) => {
        setIsOn(newStatus);
      },
      onError: () => {
        alert("활성화 상태 변경 실패");
      },
    });
  };
  //대기 중 카드 개수
  const waitingCount = reservations.filter(
    (res) => res.status === "WAITING"
  ).length;

  localStorage.setItem("waitingCount", waitingCount.toString());
  //호출 중 카드 개수
  const callingCount = reservations.filter(
    (res) => res.status === "CALLING"
  ).length;
  //완료 카드 개수
  const confirmedCount = reservations.filter(
    (res) => res.status === "CONFIRMED"
  ).length;
  //최소된 카드 개수
  const cancelledCount = reservations.filter(
    (res) => res.status === "CANCELLED"
  ).length;

  const tabLabels = [
    { label: "전체" },
    { label: "대기 중", count: waitingCount },
    { label: "호출 중", count: callingCount },
    { label: "입장 완료", count: confirmedCount },
    { label: "대기 취소", count: cancelledCount },
  ];

  const statusMap = {
    WAITING: "대기 중",
    CALLING: "호출 중",
    CONFIRMED: "입장 완료",
    CANCELLED: "대기 취소",
  };

  const filteredReservations = useMemo(() => {
    const sorted = [...reservations].sort((a, b) => a.id - b.id);
    if (activeTab === "전체") return reservations;

    const targetStatus = Object.entries(statusMap).find(
      ([, label]) => label === activeTab
    )?.[0];

    if (!targetStatus) return [];

    return sorted.filter((res) => res.status === targetStatus);
  }, [reservations, activeTab]);

  // 호출 버튼 클릭 이벤트
  const handleCall = (id: number, userId: number) => {
    updateStatus(
      { storeId, userId, status: "CALLING" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) =>
              res.id === id
                ? (() => {
                    // 입장/취소 기록은 흐름상 초기화하는게 보통 자연스러움
                    return {
                      ...res,
                      status: "CALLING",
                      calledAt: new Date().toISOString(),
                      confirmedAt: undefined,
                      cancelledAt: undefined,
                    };
                  })()
                : res
            )
          );
        },
      }
    );
  };

  const handleEnter = (id: number, userId: number) => {
    const now = new Date().toISOString();
    updateStatus(
      { storeId, userId, status: "CONFIRMED" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) => {
              if (res.id !== id) return res;
              return { ...res, status: "CONFIRMED", confirmedAt: now };
            })
          );
        },
      }
    );
  };

  const handleClose = (id: number, userId: number) => {
    const now = new Date().toISOString();
    updateStatus(
      { storeId, userId, status: "CANCELLED" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) => {
              if (res.id !== id) return res;
              return { ...res, status: "CANCELLED", cancelledAt: now };
            })
          );
        },
      }
    );
  };

  const handleNoShow = (id: number) => {
    setNoShowIds((prev) => {
      if (!prev.includes(id)) return [...prev, id];
      return prev;
    });
  };

  const handleRefresh = async () => {
    if (isRefreshing) return; // 중복 클릭 방지
    setIsRefreshing(true);
    try {
      await Promise.all([refetchWaiting(), refetchCompleted()]);
    } finally {
      // 살짝 딜레이를 주면 회전이 끊기지 않고 보여짐 (선택)
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  useEffect(() => {
    if (!Array.isArray(waitingList) || !Array.isArray(completedList)) return;

    const now = Date.now();

    const normalize = (res: any): Reservation => {
      console.log(res, "현재 데이터");
      const requested = new Date(res.createdAt ?? "");
      const calledAtValid = res.calledAt && !isNaN(Date.parse(res.calledAt));
      const called = calledAtValid ? new Date(res.calledAt) : undefined;
      // reservationNumber 끝의 4자리 추출
      const idFromNumber = parseInt(res.reservationNumber.slice(-4), 10);

      return {
        id: Number(idFromNumber),
        userId: Number(res.userId),
        reservationNumber: res.reservationNumber,
        requestedAt: res.createdAt,
        time: requested.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        waitMinutes: Math.floor((now - requested.getTime()) / 60000),
        peopleCount: res.partySize,
        name: res.userName,
        phoneNumber: res.phoneNumber,
        status: res.status,
        calledAt:
          res.status === "CALLING" && called ? called.toISOString() : undefined,
        updatedAt: res.updatedAt,
      };
    };

    const merged = [...waitingList, ...completedList].map(normalize);
    const unique = merged.filter(
      (res, idx, arr) =>
        idx ===
        arr.findIndex((r) => r.reservationNumber === res.reservationNumber)
    );

    setReservations(unique);
  }, [waitingList, completedList]);
  useEffect(() => {
    if (store) {
      setIsOn(store.isActive);
    }
  }, [store]);

  return (
    <div className={`w-full flex flex-col items-center space-y-6`}>
      <section
        id="대기 현황"
        className="flex w-full [@media(min-width:375px)_and_(max-width:431px)]:justify-center m-0"
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-[30px]">
            <div className="flex items-baseline space-x-[6px]">
              <h1 className="text-title-20-bold">대기 접수</h1>
              <span
                className={`text-title-20-bold transition-all duration-700 ${
                  isOn ? "text-primary" : "text-navy-35"
                }`}
              >
                {isOn ? "on" : "off"}
              </span>
            </div>
            <ToggleSwitch isOn={!!isOn} toggle={toggle} />
          </div>
        </div>
      </section>

      <section id="대기자 목록" className="flex flex-col w-full">
        <div className="relative w-full">
          <div className="mask-fade-right">
            <div className="overflow-x-auto scrollbar-hide pr-12">
              <div className="flex flex-wrap whitespace-nowrap [@media(max-width:431px)]:flex-nowrap -mr-5">
                {tabLabels.map(({ label, count }) => (
                  <RoundTabButton
                    key={label}
                    label={label}
                    active={activeTab === label}
                    onClick={() => setActiveTab(label)}
                    count={label === "전체" ? undefined : count}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="새로고침"
            onClick={handleRefresh}
            disabled={isRefreshing}
            aria-busy={isRefreshing}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                 cursor-pointer [@media(max-width:431px)]:hidden"
          >
            <img
              src={refreshIcon}
              alt=""
              className={`block ${
                isRefreshing ? "animate-[spin_0.6s_linear_1]" : ""
              }`}
            />
          </button>
        </div>
      </section>

      <div className="w-full grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  [@media(max-width:431px)]:place-items-center">
        {filteredReservations.map((res) => {
          const requested = new Date(res.requestedAt);
          console.log(res, "웨이팅 카드 정보");

          return (
            <WaitingCard
              key={res.userId + "-" + res.requestedAt}
              number={res.id}
              time={requested.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
              waitMinutes={Math.floor(
                (Date.now() - requested.getTime()) / 60000
              )}
              peopleCount={res.peopleCount}
              name={res.name}
              phoneNumber={res.phoneNumber}
              status={res.status}
              requestedAt={res.requestedAt}
              calledAt={res.calledAt}
              confirmedAt={res.updatedAt}
              cancelledAt={res.updatedAt}
              isNoShow={noShowIds.includes(res.id)}
              onCall={() => handleCall(res.id, res.userId)}
              onEnter={() => handleEnter(res.id, res.userId)}
              onClose={() => handleClose(res.id, res.userId)}
              onDelete={() => {
                setTargetReservation(res);
                setShowModal(true);
              }}
              onNoShow={() => handleNoShow(res.id)}
            />
          );
        })}
      </div>
      {showModal && targetReservation && (
        <ConfirmRemoveModal
          mode={null}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            handleClose(targetReservation.id, targetReservation.userId);
            setShowModal(false);
            setTargetReservation(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminHome;
