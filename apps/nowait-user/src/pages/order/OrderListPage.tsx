import MenuItem from "../../components/order/MenuItem";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";
import { sumTotalPrice } from "../../utils/sumUtils";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();

  const orderHandleButton = () => {
    navigate("/:storeId/order", { state: sumTotalPrice(cart) });
  };
  return (
    <div>
      <div className="py-8 px-5 h-[100dvh]">
        <h1 className="text-headline-24-bold mb-5">총 주문 {cart.length}건</h1>
        <ul>
          {cart.map((item) => {
            return (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            );
          })}
        </ul>
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={orderHandleButton}>
          <TotalButton mode="order" />
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default OrderListPage;
