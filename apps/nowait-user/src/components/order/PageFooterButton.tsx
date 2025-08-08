import React from "react";

const PageFooterButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <footer className="fixed bottom-0 w-full max-w-[430px] min-w-[320px] bg-[linear-gradient(to_top,_white_80%,_transparent_100%)]">
      <div className={`${className} flex justify-center pt-8 pb-5 px-5`}>
        {children}
      </div>
    </footer>
  );
};

export default PageFooterButton;
