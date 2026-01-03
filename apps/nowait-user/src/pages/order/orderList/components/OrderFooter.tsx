import { Button } from "@repo/ui";
import PageFooterButton from "../../../../components/order/PageFooterButton";
import TotalButton from "../../../../components/order/TotalButton";

interface Props {
  onOrder: () => void;
}

const OrderFooter = ({ onOrder }: Props) => {
  return (
    <PageFooterButton background="gradient">
      <Button textColor="white" onClick={onOrder}>
        <TotalButton variant="orderPage" actionText="주문하기" />
      </Button>
    </PageFooterButton>
  );
};

export default OrderFooter;
