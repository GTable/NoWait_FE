import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const useRouterHistory = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [stack, setStack] = useState<string[]>([]);
    console.log(stack)
  useEffect(() => {
    setStack((prev) => [...prev, location.pathname]);
  }, [navigate]);
};
