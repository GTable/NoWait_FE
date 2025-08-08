interface PropsType {
  mode? : "default" | "orderDetails"
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
      className={`${className} py-2 px-4 rounded-[12px] border-1 bg-white ${mode==="default" ? "border-[#ececec] text-black-70" : "border-[#dddddd] text-black-80"}`}
      onClick={onClick}
    >
      <p className="flex items-center justify-center gap-1 text-[14px] font-bold">
        {children}
      </p>
    </button>
  );
};
