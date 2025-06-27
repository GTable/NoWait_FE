import React from "react";

const PageFooterButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="w-full bg-white sticky left-0 bottom-0">
      <div className="flex justify-center py-8 px-5">{children}</div>
    </footer>
  );
};

export default PageFooterButton;
