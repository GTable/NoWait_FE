import SoldOutModal from "./components/SoldOutModal";
import { useOrderListLogic } from "./hooks/useOrderListLogic";
import CartList from "./components/CartList";
import OrderFooter from "./components/OrderFooter";
import EmptyCart from "./components/EmptyCart";
import BackHeader from "../../../components/BackHeader";

const OrderListPage = () => {
  
  const {
    cart,
    storeId,
    isAnimatingOut,
    modal,
    soldOutMenus,
    handleOrder,
    handleRemoveSoldOutMenus,
  } = useOrderListLogic();

  if (cart.length === 0 && isAnimatingOut) {
    return <EmptyCart />;
  }

  return (
    <div>
      <BackHeader title="장바구니" />
      <section className="flex flex-col grow min-h-[calc(100dvh-164px)] pt-7 px-5 mt-12">
        <h1 className="text-headline-22-bold mb-5">
          주문 총 <span className="text-primary">{cart.length}건</span>
        </h1>
        <CartList cart={cart} storeId={storeId} />
      </section>
      <OrderFooter onOrder={handleOrder} />
      {modal.isOpen && soldOutMenus && soldOutMenus!.length > 0 && (
        <SoldOutModal
          menus={soldOutMenus}
          onConfirm={handleRemoveSoldOutMenus}
        />
      )}
    </div>
  );
};

export default OrderListPage;
