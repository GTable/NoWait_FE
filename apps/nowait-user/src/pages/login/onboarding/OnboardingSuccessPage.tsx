import SuccessImage from "../../../assets/icon/signup.svg?react";

const OnboardingSuccessPage = () => {
  return (
    <div className="flex w-full h-[100dvh] items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-[30px]">
        <div className="flex w-[150px] h-[150px]">
          <SuccessImage />
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-[14px]">
          <div className="flex text-headline-24-bold text-black-100">
            가입을 축하드려요
          </div>
          <div className="flex text-16-regular text-black-70">
            노웨잇과 함께 축제를 즐겨봐요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSuccessPage;
