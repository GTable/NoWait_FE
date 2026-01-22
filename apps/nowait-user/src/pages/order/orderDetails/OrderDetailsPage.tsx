import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BackOnlyHeader from "../../../components/BackOnlyHeader";
import FullPageLoader from "../../../components/FullPageLoader";
import EmptyOrderDetails from "./components/EmptyOrderDetails";
import { getOrderDetails } from "../../../api/order";
import OrderCard from "./components/OrderCard";

const OrderDetailsPage = () => {
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["orderDetails", storeId],
    queryFn: () => getOrderDetails(storeId!, Number(tableId!)),
    select: (data) => data?.response,
  });

  if (isLoading) return <FullPageLoader />;

  //주문내역 없을 시
  if (!orderDetails || orderDetails?.length === 0) return <EmptyOrderDetails />;

  return (
    <div>
      <BackOnlyHeader />
      <div className="bg-black-15 min-h-screen py-16 px-5">
        <h1 className="text-headline-22-bold mb-[23px] text-black-90">
          주문내역 <span className="text-primary">{orderDetails.length}건</span>
        </h1>
        <ul>
          {orderDetails?.map((order) => {
            return <OrderCard key={order.orderId} order={order} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
