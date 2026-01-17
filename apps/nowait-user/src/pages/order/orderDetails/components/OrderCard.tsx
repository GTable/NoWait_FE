import type {
  OrderDetailsType,
  OrderStatus,
} from "../../../../types/order/order";

interface OrderCardProps {
  order: {
    orderId: number;
    status: OrderStatus;
    createdAt: string;
    items: OrderDetailsType[];
    totalPrice: number;
  };
}

//주문내역 status에 따른 값, 컬러 객체
const ORDER_STATUS_MAP = {
  WAITING_FOR_PAYMENT: { label: "입금 대기 중", color: "text-black-90" },
  COOKING: { label: "조리 중", color: "text-black-90" },
  COOKED: { label: "조리 완료", color: "text-black-60" },
} as const;

const OrderCard = ({ order }: OrderCardProps) => {
    
  const status = ORDER_STATUS_MAP[order.status];

  return (
    <li className="p-[22px] bg-white rounded-[22px] mb-4">
      <header className="mb-7.5">
        <h2 className={`text-title-18-bold mb-2 ${status.color}`}>
          {status.label}
        </h2>
        <p className="text-14-regular text-black-60">{order.createdAt}</p>
      </header>

      <ul className="border-b border-[#ececec] pb-5 mb-5">
        {order.items.map((item) => (
          <li
            key={item.menuId}
            className="flex justify-between items-center mb-2.5 last:mb-0"
          >
            <span className="text-16-regular text-black-90">
              {item.menuName}
            </span>
            <span className="text-16-regular text-black-60">
              {item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <footer className="flex justify-between items-center">
        <span className="text-16-semibold">결제금액</span>
        <span className="text-16-semibold">
          {order.totalPrice.toLocaleString()}원
        </span>
      </footer>
    </li>
  );
};

export default OrderCard;
