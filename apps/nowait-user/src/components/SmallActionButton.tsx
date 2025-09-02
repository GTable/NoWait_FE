interface PropsType {
  mode?: "default" | "orderDetails";
  type?: "button" | "submit" | "reset";
  ariaLabel: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}
export const SmallActionButton = ({
  mode = "default",
  type = "button",
  children,
  onClick,
  ariaLabel,
  className,
}: PropsType) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`${className} py-2 px-4 rounded-[12px] border-1 ${
        mode === "default" ? "border-[#ececec] " : "border-[#dddddd]"
      }`}
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center text-[14px] font-bold ${
          mode === "default" ? "text-black-70" : "text-black-80"
        }`}
      >
        {children}
      </div>
    </button>
  );
};
