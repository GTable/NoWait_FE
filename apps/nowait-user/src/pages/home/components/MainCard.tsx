import { useColor } from "color-thief-react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { NotOpenIcon, WaitingIcon, WaitingCardIcon } from "./HomeIcon";
import type { WaitingItem } from "../../../types/WaitingItem";
import block from "../../../assets/block.png";
import MyWaitingCard from "./MyWaitingCard";

// WaitingCard Props
interface WaitingCardProps {
  type: "waiting";
  item: WaitingItem;
}

// StoreCard Props
interface StoreCardProps {
  type: "store";
  storeId: number;
  name: string;
  departmentName: string;
  profileImageUrl: string;
  isActive: boolean;
  deleted: boolean;
  waitingCount?: number;
}

// HomeWaitingCard Props
interface HomeWaitingCardProps {
  type: "homeWaiting";
  storeName: string;
  queueNumber: number;
  onClick?: () => void;
}

// HomeCard Props
interface HomeCardProps {
  type: "homeCard";
  imageUrl: string;
  waitingCount?: number;
  storeName: string;
  departmentName: string;
  onClick?: () => void;
}

// 대기 중인 주점 데이터 타입
interface WaitingStoreData {
  storeId: number;
  storeName: string;
  departmentName: string;
  rank: number;
  teamsAhead: number;
  partySize: number;
  status: string;
  registeredAt: string;
  location: string;
  profileImageUrl: string;
}

// MyWaitingCard Props
interface MyWaitingCardProps {
  type: "myWaitingCard";
  waitingStores: WaitingStoreData[]; // 여러 주점 데이터 배열
  currentSlide: number;
  onSlideChange: (slide: number) => void;
  onClick?: () => void;
  onRefresh?: () => void;
}

type MainCardProps =
  | WaitingCardProps
  | StoreCardProps
  | HomeWaitingCardProps
  | HomeCardProps
  | MyWaitingCardProps;

// 대기 카드 컴포넌트
const WaitingCard = ({ item }: { item: WaitingItem }) => {
  // S3 URL을 프록시 URL로 변환
  const getProxyImageUrl = (originalUrl: string) => {
    if (originalUrl.includes("gtablestoreimage-resize-bucket")) {
      const path = originalUrl.replace(
        "https://gtablestoreimage-resize-bucket.s3.ap-northeast-2.amazonaws.com",
        ""
      );
      return `/api/images${path}`; // 프록시 경로 사용
    } else if (originalUrl.includes("gtablestoreimage")) {
      const path = originalUrl.replace(
        "https://gtablestoreimage.s3.ap-northeast-2.amazonaws.com",
        ""
      );
      return `/api/banner-images${path}`; // 다른 프록시 경로 사용
    }
    return originalUrl;
  };

  const proxyImageUrl = getProxyImageUrl(item.imageUrl);

  // 각 카드마다 개별적으로 색상 추출 (프록시 URL 사용)
  const { data: dominantColor } = useColor(proxyImageUrl, "rgbArray", {
    crossOrigin: "anonymous",
    quality: 10,
  });

  // RGB 배열을 RGBA 문자열로 변환하는 함수
  const formatRgbaColor = (
    rgbArray: [number, number, number] | undefined,
    alpha: number = 1
  ) => {
    if (!rgbArray) return `rgba(139, 92, 246, ${alpha})`; // 기본 보라색
    return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${alpha})`;
  };

  // 그라데이션용 색상 설정
  const startColor = formatRgbaColor(
    dominantColor as [number, number, number] | undefined,
    0.7
  );
  const endColor = formatRgbaColor(
    dominantColor as [number, number, number] | undefined,
    1.0
  );

  return (
    <div className="flex-shrink-0 w-72 h-full snap-center">
      <div
        className="w-full h-full rounded-2xl overflow-hidden relative"
        style={{
          background: `linear-gradient(to bottom, 
            ${startColor} 0%, 
            ${startColor} 20%, 
            ${endColor} 45%, 
            ${endColor} 100%)`,
        }}
      >
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${proxyImageUrl}')`,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 60%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 60%)",
          }}
        >
          {/* 이미지 위 그라데이션 오버레이 (기존과 동일하게 70에서 100으로) */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${startColor} 0%, ${startColor} 30%, ${endColor} 100%)`,
            }}
          />
        </div>

        {/* 상단 번호 */}
        <div className="absolute top-6 left-6 text-30-semibold text-white-100 z-10">
          #{item.number}
        </div>

        {/* 하단 정보 블럭 */}
        <div className="absolute bottom-0 left-0 right-0 px-7.5 pt-9 pb-7.5">
          <div className="text-white-100">
            <div className="mb-4">
              <div className="text-headline-22-bold">{item.storeName}</div>
              <div className="text-16-regular text-[#DBDBDB]">
                {item.category}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <div className="flex text-bold-16 leading-[150%] text-[#FFFFFF]/60">
                  인원
                </div>
                <div className="flex text-16-regular text-white-100">
                  {item.people}명
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex text-bold-16 leading-[150%] text-[#FFFFFF]/60">
                  일시
                </div>
                <div className="flex text-16-regular text-white-100">
                  {item.date}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex text-bold-16 leading-[150%] text-[#FFFFFF]/60">
                  위치
                </div>
                <div className="flex text-16-regular text-white-100">
                  {item.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 스토어 카드 컴포넌트
const StoreCardComponent = ({
  storeId,
  name,
  departmentName,
  profileImageUrl,
  isActive,
  deleted,
  waitingCount,
}: Omit<StoreCardProps, "type">) => {
  const navigate = useNavigate();

  // 삭제된 주점은 렌더링하지 않음
  if (deleted) {
    return null;
  }

  const status = isActive ? "open" : "closed";

  // 스토어 클릭 핸들러
  const handleStoreClick = () => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div
      className="flex flex-row py-3 gap-3 w-full min-w-0 items-center cursor-pointer"
      onClick={handleStoreClick}
    >
      <div className="rounded-full w-11 h-11 bg-gray-200 flex-shrink-0 flex items-center justify-center">
        {profileImageUrl ? (
          <img
            alt={`${name} 주점 이미지`}
            src={profileImageUrl}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="text-16-bold text-black-60 flex items-center justify-center">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-row gap-2 items-center min-w-0">
          <div className="text-title-16-semibold text-black-90 text-start truncate flex-shrink min-w-0">
            {name}
          </div>
          {status === "open" && (waitingCount || 0) > 0 ? (
            <WaitingIcon waitingCount={waitingCount || 0} />
          ) : status !== "open" ? (
            <NotOpenIcon />
          ) : null}
        </div>
        <div className="flex text-13-regular text-black-70 text-start">
          {departmentName}
        </div>
      </div>
    </div>
  );
};

// 홈 대기 카드 컴포넌트
const HomeWaitingCardComponent = ({
  storeName,
  queueNumber,
  onClick,
}: Omit<HomeWaitingCardProps, "type">) => {
  return (
    <div
      className="bg-primary flex text-start pl-5.25 pb-2.75 relative overflow-hidden w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="mt-7 text-14-medium text-black-100">현재 내 순서</div>
        <div className="mt-1 text-title-20-bold text-black-100">
          {storeName}
        </div>
        <div className="mt-9 text-black-100 font-bold tracking-[-0.02em] text-xl">
          <span className="font-work-sans text-[54px] font-semibold tracking-[-0.03em] pr-0.5">
            {queueNumber}
          </span>
          번째
        </div>
      </div>
      <div className="mt-12 ml-4.5 absolute bottom-0 right-0">
        <img src={block} alt="block" className="icon-l w-44 h-34" />
      </div>
    </div>
  );
};

// 홈 카드 컴포넌트
const HomeCardComponent = ({
  imageUrl,
  waitingCount,
  storeName,
  departmentName,
  onClick,
}: Omit<HomeCardProps, "type">) => {
  return (
    <div
      className={`relative flex flex-col justify-end w-65 h-42.5 pl-5 pb-5 rounded-2xl bg-cover bg-center bg-no-repeat cursor-pointer ${
        imageUrl ? "bg-white-100" : "bg-black-60"
      }`}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      }}
      onClick={onClick}
    >
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 rounded-2xl z-10" />
      <div className="relative z-20">
        <div className="flex flex-col gap-2">
          {(waitingCount || 0) > 0 && (
            <WaitingCardIcon waitingCount={waitingCount || 0} />
          )}
          <div className="flex flex-col">
            <div className="text-title-16-semibold text-white-100">
              {storeName}
            </div>
            <div className="text-13-regular text-black-60">
              {departmentName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 카드 컴포넌트
const MainCard = memo(
  (props: MainCardProps) => {
    if (props.type === "waiting") {
      return <WaitingCard item={props.item} />;
    } else if (props.type === "store") {
      return (
        <StoreCardComponent
          storeId={props.storeId}
          name={props.name}
          departmentName={props.departmentName}
          profileImageUrl={props.profileImageUrl}
          isActive={props.isActive}
          deleted={props.deleted}
          waitingCount={props.waitingCount}
        />
      );
    } else if (props.type === "homeWaiting") {
      return (
        <HomeWaitingCardComponent
          storeName={props.storeName}
          queueNumber={props.queueNumber}
          onClick={props.onClick}
        />
      );
    } else if (props.type === "homeCard") {
      return (
        <HomeCardComponent
          imageUrl={props.imageUrl}
          waitingCount={props.waitingCount}
          storeName={props.storeName}
          departmentName={props.departmentName}
          onClick={props.onClick}
        />
      );
    } else if (props.type === "myWaitingCard") {
      return (
        <MyWaitingCard
          waitingStores={props.waitingStores}
          currentSlide={props.currentSlide}
          onSlideChange={props.onSlideChange}
          onClick={props.onClick}
          onRefresh={props.onRefresh}
        />
      );
    }

    return null;
  },
  (prevProps, nextProps) => {
    // myWaitingCard 타입일 때만 특별한 비교 로직 적용
    if (
      prevProps.type === "myWaitingCard" &&
      nextProps.type === "myWaitingCard"
    ) {
      // waitingStores 배열의 참조가 같으면 리렌더링하지 않음
      return (
        prevProps.waitingStores === nextProps.waitingStores &&
        prevProps.currentSlide === nextProps.currentSlide &&
        prevProps.onSlideChange === nextProps.onSlideChange &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.onRefresh === nextProps.onRefresh
      );
    }

    // 다른 타입들은 기본 비교
    return false;
  }
);

export default MainCard;
