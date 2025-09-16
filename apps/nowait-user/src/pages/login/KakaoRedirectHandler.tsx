import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const KakaoRedirectHandler: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URL(document.location.toString()).searchParams;
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      console.log("Access Token received from URL: ", accessToken);

      // JWT 토큰 디코딩
      const decodeAccessToken = jwtDecode(accessToken) as any;
      const phoneEntered = decodeAccessToken.phoneEntered;

      console.log("Decoded token:", decodeAccessToken);
      console.log("Phone entered:", phoneEntered);

      // accessToken과 phoneEntered 값을 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("phoneEntered", phoneEntered.toString());

      queryClient.setQueryData(["auth", "token"], true);
      queryClient.invalidateQueries({ queryKey: ["auth", "token"] });

      // 약간의 지연 후 리다이렉트 (캐시 업데이트 반영 시간)
      setTimeout(() => {
        // phoneEntered 값에 따라 다른 경로로 이동
        if (phoneEntered) {
          navigate("/", { replace: true });
        } else {
          navigate("/onboarding", { replace: true });
        }
      }, 100);
    } else {
      console.log("No access token found");
      navigate("/login", { replace: true });
    }
  }, [queryClient, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default KakaoRedirectHandler;
