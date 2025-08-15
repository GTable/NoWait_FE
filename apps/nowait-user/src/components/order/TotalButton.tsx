import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

interface PropsType {
  variant?: "default" | "orderPage";
  addedPrice?: number | undefined;
  actionText: string;
}

const TotalButton = ({
  variant = "default",
  addedPrice,
  actionText,
}: PropsType) => {
  const { cart } = useCartStore();
  const baseTotal = sumTotalPrice(cart);
  const [price, setPrice] = useState(baseTotal);
  const [trend, setTrend] = useState(0);
  console.log(trend);
  console.log(addedPrice);
  useEffect(() => {
    if (addedPrice !== undefined) {
      setTrend(1);
    }
    setPrice(baseTotal + (addedPrice || 0));
  }, [baseTotal, addedPrice]);

  return (
    <div className="flex items-center gap-2 text-[17px] font-semibold ml-1">
      {variant !== "orderPage" && (
        <p className="w-[22px] rounded-[5px] bg-white">
          <span className="text-[14px] font-extrabold text-cool-black">
            {sumQuantity(cart, "quantity")}
          </span>
        </p>
      )}
      <NumberFlow
        value={price}
        trend={trend}
        transformTiming={{
          duration: 950,
          easing: `linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)`,
        }}
        suffix={`원 ${actionText}`}
      />
    </div>
  );
};

export default TotalButton;
