import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    id: "1",
    menu: "우리 학과 최고의 자랑거리 메뉴인 숙주 삽결살 볶음 입니다. 많이 드시러 오세요.",
    price: "12,000원",
    image: "",
  },
  {
    id: "2",
    menu: "과일 화채",
    price: "10,000원",
    image: "",
  },
  {
    id: "3",
    menu: "파인애플 샤베트",
    price: "9,000원",
    image: "",
  },
];

const StorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-8">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-headline-24-bold">스페이시스</h1>
          <h2 className="text-text-16-medium">5번 테이블</h2>
        </div>
        <button
          onClick={() => alert("주문 내역")}
          className="text-14-medium bg-black-20 py-2 px-2.5 rounded-[8px] text-black-70 cursor-pointer"
        >
          주문내역
        </button>
      </div>
      <div>
        <h1 className="text-title-20-semibold mb-3">메뉴</h1>
        <ul>
          {dummyData.map((data) => {
            return (
              <li key={data.id} className="mb-5">
                <button
                  onClick={() => navigate(`/asd/menu/${data.id}`)}
                  className="w-full flex justify-between cursor-pointer text-left"
                >
                  <div className="max-w-[224px]">
                    <h2 className="text-black-90 mb-1 text-ellipsis line-clamp-2">
                      {data.menu}
                    </h2>
                    <h2 className="text-black-70">{data.price}</h2>
                  </div>
                  <img
                    className="w-[90px] h-[90px] bg-black-70"
                    src={data.image}
                    alt="음식 메뉴 이미지"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StorePage;
