import React from "react";
import PageFooterButton from "../order/PageFooterButton";
import { Button } from "@repo/ui";

const CenteredContentLayout = ({
  children,
  onClick,
  buttonText,
}: {
  children: React.ReactNode;
  onClick: () => void;
  buttonText: string;
}) => {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <div className="flex flex-col items-center text-center px-5">
        {children}
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={onClick}>
          {buttonText}
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default CenteredContentLayout;
