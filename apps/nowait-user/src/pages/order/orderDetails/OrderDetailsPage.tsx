import EmptyOrderDetails from "./components/EmptyOrderDetails";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../../../api/order";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import BackOnlyHeader from "../../../components/BackOnlyHeader";

interface OrderDetailsType {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
}

//주문내역 status에 따른 값, 컬러 객체
const statusMap = {
  WAITING_FOR_PAYMENT: { label: "입금 대기 중", color: "text-black-90" },
  COOKING: { label: "조리 중", color: "text-black-90" },
  COOKED: { label: "조리 완료", color: "text-black-60" },
};
type OrderStatus = keyof typeof statusMap;

const OrderDetailsPage = () => {
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");

  const { data } = useQuery({
    queryKey: ["orderDetails", storeId, tableId],
    queryFn: () => getOrderDetails(storeId, tableId!),
    select: (data) => data.response,
  });
  console.log(data);

  //주문내역 없을 시
  if (!data || data?.length < 1) return <EmptyOrderDetails />;

  return (
    <div>
      <BackOnlyHeader />
      <div className="bg-black-15 min-h-screen py-[30px] px-5">
        <h1 className="text-headline-24-bold mb-[23px] text-black-90">
          주문내역 <span className="text-primary">{data.length}건</span>
        </h1>
        <ul>
          {data.map((order) => {
            // 주문 상태에 따른 값 보여주기
            const statusData = statusMap[order?.status as OrderStatus];
            return (
              <li
                key={order.orderId}
                className="p-[22px] bg-white rounded-[22px] mb-4"
              >
                <div className="mb-7.5">
                  <h1
                    className={`text-title-20-bold mb-2 ${statusData.color}
                    `}
                  >
                    {statusData.label}
                  </h1>
                  <p className="text-14-regular text-black-60">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <ul className="border-b-1 border-[#ececec] pb-5 mb-5">
                  {order.items?.map((item: OrderDetailsType) => {
                    return (
                      <li
                        key={item?.menuId}
                        className="flex justify-between items-center mb-2.5 last:mb-0"
                      >
                        <h1 className="text-16-regular text-black-90">
                          {item?.menuName}
                        </h1>
                        <span className="text-16-regular text-black-60">
                          {item?.quantity}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-between items-center">
                  <h1 className="text-16-semibold">결제금액</h1>
                  <h2 className="text-16-semibold">
                    {order.totalPrice.toLocaleString()}원
                  </h2>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
