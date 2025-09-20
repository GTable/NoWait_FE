import React from "react";

const PageFooterButton = ({
  children,
  background,
  className = "",
}: {
  children: React.ReactNode;
  background?: "default" | "gradient" | "transparent";
  className?: string;
}) => {
  const backgroundClass = (() => {
    switch (background) {
      case "gradient":
        return "bg-[linear-gradient(to_top,_white_80%,_transparent_100%)]";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-white";
    }
  })();

  return (
    <footer
      className={`fixed bottom-0 w-full max-w-[430px] min-w-[320px] ${backgroundClass}`}
    >
      <div className={`${className} flex justify-center pt-8 pb-6 px-5`}>
        {children}
      </div>
    </footer>
  );
};

export default PageFooterButton;
