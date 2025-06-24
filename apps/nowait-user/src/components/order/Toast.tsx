interface PropsType {
  message: string;
}

const Toast = ({ message }: PropsType) => {
  return (
    <div className="flex justify-center items-center px-4 py-2.5 rounded-[999px] bg-[#F2F6F9] fade-in">
      <p className="text-14-medium text-navy-70">{message}</p>
    </div>
  );
};

export default Toast;
