import NumberFlow from "@number-flow/react";
import QuantitySelector from "../../../../components/common/QuantitySelector";

interface Props {
  price: number;
  quantity: number;
  onChangeQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const MenuOrderSection = ({
  price,
  quantity,
  onChangeQuantity,
}: Props) => {
  return (
    <section className="fixed bottom-28 w-full max-w-[430px] min-w-[320px] bg-white">
      <div className="flex justify-between items-center px-5">
        <h2 className="text-[24px] font-semibold">
          <NumberFlow value={price * quantity} suffix="원" />
        </h2>

        <QuantitySelector
          mode="state"
          quantity={quantity}
          setQuantity={onChangeQuantity}
        />
      </div>
    </section>
  );
};

export default MenuOrderSection;
