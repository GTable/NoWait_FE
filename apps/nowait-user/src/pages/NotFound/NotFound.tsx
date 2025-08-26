import NotFoundImage from "../../assets/notFound.png";
const NotFound = () => {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
      <img src={NotFoundImage} width="175px" height="150px" alt="페이지를 찾을 수 없습니다" />
      <h1 className="text-headline-24-bold mb-[14px]">페이지를 찾을 수 없어요</h1>
      </div>
    </main>
  );
};

export default NotFound;
