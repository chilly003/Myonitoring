import React, { useState } from "react";
import naverIcon from "../../assets/images/naver_icon.png";
import kakaoIcon from "../../assets/images/kakao_icon.png";
import googleIcon from "../../assets/images/google_icon.png";
import { api } from '../../api/axios';

const LoginSignUp: React.FC = () => {
  // 현재 활성화된 탭 상태 (login 또는 signup)
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // 제목과 설명 텍스트
  const title =
    activeTab === "login"
      ? "묘니터링에 오신 것을 환영해요!"
      : "묘니터링에 가입하세요!";
  const description =
    activeTab === "login"
      ? "고양이 급식과 건강을 한 번에!\n묘니터링에 오신 것을 환영합니다."
      : "고양이 급식과 건강을 한 번에!\n묘니터링에 오신 것을 환영합니다.";

  const handleKakaoLogin = async () => {
    try {
      // axios를 사용하여 환경변수를 API에서 가져옴
      const { data: config } = await api.get('/api/env/oauth/kakao');
      
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${config.KAKAO_CLIENT_ID}&redirect_uri=${config.KAKAO_REDIRECT_URI}&response_type=code`;
      
      window.location.href = KAKAO_AUTH_URL;
    } catch (error) {
      console.error('Failed to fetch OAuth configuration:', error);
    }
  };

  // 소셜 로그인 버튼 내용
  const socialButtons = [
    {
      id: "naver",
      icon: naverIcon,
      alt: "네이버 로고",
      text: activeTab === "login" ? "네이버 로그인" : "네이버로 가입하기",
      bgColor: "#06BE34", // 네이버 색상 코드
      textColor: "#FFFFFF",
    },
    {
      id: "kakao",
      icon: kakaoIcon,
      alt: "카카오 로고",
      text: activeTab === "login" ? "카카오 로그인" : "카카오로 가입하기",
      bgColor: "#FDDC3F", // 카카오 색상 코드
      onClick: handleKakaoLogin, // 카카오 로그인 핸들러 추가
    },
    {
      id: "google",
      icon: googleIcon,
      alt: "구글 로고",
      text: activeTab === "login" ? "구글 로그인" : "구글로 가입하기",
      bgColor: "#FFFFFF", // 구글 색상 코드 (흰색)
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-8">
      {/* 상단 탭 */}
      <div className="flex w-full max-w-md justify-around border-b border-gray-300">
        <button
          className={`w-1/2 py-2 text-center text-lg mt-3 mb-3 ${
            activeTab === "login" ? "font-bold text-black" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Log in
        </button>
        <button
          className={`w-1/2 py-2 text-center text-lg mt-3 mb-3 ${
            activeTab === "signup" ? "font-bold text-black" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign up
        </button>
      </div>
  
      {/* 공통 레이아웃 */}
      <div className="flex flex-col items-center mt-8 overflow-hidden flex-grow">
        {/* 제목과 설명 */}
        <h1 className="text-xl mb-3 font-bold text-center">{title}</h1>
        <p className="text-gray-500 text-center leading-relaxed whitespace-pre-line">
          {description}
        </p>
  
        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-4 mt-12 w-full max-w-xs">
          {socialButtons.map((button) => (
            <div key={button.id} className="w-full flex justify-center">
              <button
                onClick={button.onClick}
                className={`flex items-center justify-center gap-2 py-[12px] px-[16px] rounded-md shadow ${button.bgColor}`}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  height: "48px",
                  backgroundColor: button.bgColor,
                  color: button.textColor,
                }}
              >
                <img src={button.icon} alt={button.alt} className="w-5 h-5" />
                <span className="truncate">{button.text}</span>
              </button>
            </div>
          ))}
        </div>
  
        {/* 하단 이미지 */}
        <div className="mt-auto relative overflow-hidden">
          <img
            src="/Cat.png"
            alt="로고 고양이"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative translate-y-16"
          />
        </div>
      </div>
    </div>
  );
  
};

export default LoginSignUp;
