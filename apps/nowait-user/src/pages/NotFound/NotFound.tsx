import NotFoundImage from "../../assets/notFound.png";
const NotFound = () => {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
      <img src={NotFoundImage} width="150px" height="150px" alt="페이지를 찾을 수 없습니다" />
      <h1 className="text-headline-24-bold mb-[14px]">페이지를 찾을 수 없어요</h1>
      <h2 className="text-16-regular text-black-70">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </h2>
      </div>
    </main>
  );
};

export default NotFound;
