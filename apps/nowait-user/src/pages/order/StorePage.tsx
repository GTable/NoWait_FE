import { useNavigate } from "react-router-dom";
import type { MenuType } from "../../types/order/menu";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";

const dummyData: MenuType[] = [
  {
    id: "1",
    name: "우리 학과 최고의 자랑거리 메뉴인 숙주 삼결살 볶음 입니다.",
    description:
      "숙주 삼겹살에 대한 메뉴 설명입니다.숙주 삼겹살에 대한 메뉴 설명입니다.",
    price: 12000,
    image: "",
  },
  {
    id: "2",
    name: "과일 화채",
    description: "시원한 과일 화채 입니다.",
    price: 10000,
    image: "",
  },
  {
    id: "3",
    name: "파인애플 샤베트",
    description:
      "시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.",
    price: 9000,
    image: "",
  },
];

const StorePage = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();

  return (
    <div>
      <div className="px-5 mt-8 pb-[124px]">
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
                    onClick={() =>
                      navigate(`/asd/menu/${data.id}`, { state: data })
                    }
                    className="w-full flex justify-between cursor-pointer text-left"
                  >
                    <div className="max-w-[224px]">
                      <h2 className="text-black-90 mb-1 text-ellipsis line-clamp-2">
                        {data.name}
                      </h2>
                      <h2 className="text-black-70">
                        {data.price.toLocaleString()}원
                      </h2>
                    </div>
                    <img
                      className="w-[90px] h-[90px] bg-black-70"
                      src={`${data.image}`}
                      alt="음식 메뉴 이미지"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {cart && cart.length > 0 && (
        <PageFooterButton>
          <Button textColor="white" onClick={() => navigate("/:storeId/order")}>
            <TotalButton mode="store"/>
          </Button>
        </PageFooterButton>
      )}
    </div>
  );
};

export default StorePage;
