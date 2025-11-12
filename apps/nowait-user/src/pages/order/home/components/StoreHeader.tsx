import { useNavigate, useParams } from "react-router-dom";

const StoreHeader = ({
  storeName,
  isLoading,
}: {
  storeName: string | undefined;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");
  return (
    <section className="flex justify-between items-start mb-7">
      <div className="max-w-[250px]">
        {!isLoading ? (
          <h1 className="text-headline-24-bold mb-1.5">{storeName}</h1>
        ) : (
          <h1 className="w-[230px] h-6 mb-1.5 bg-black-20 rounded-sm"></h1>
        )}

        <h2 className="text-16-medium text-black-70">{tableId}번 테이블</h2>
      </div>
      <button
        onClick={() => navigate(`/${storeId}/orderDetails`)}
        className="text-14-semibold bg-black-20 py-2 px-2.5 rounded-lg text-black-70 cursor-pointer"
      >
        주문내역
      </button>
    </section>
  );
};

export default StoreHeader;
