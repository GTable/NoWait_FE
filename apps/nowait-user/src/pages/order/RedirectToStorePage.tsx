import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RedirectToStorePage = () => {
  const { storeId, tableId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (storeId && tableId) {
      //테이블 아이디 로컬스토리지 저장(다른 방법 생각)
      localStorage.setItem("tableId", tableId);
      navigate(`/${storeId}?table=${tableId}`, { replace: true });
    }
  }, [storeId, tableId, navigate]);

  return null;
};

export default RedirectToStorePage;
