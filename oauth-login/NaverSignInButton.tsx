import React from "react";

const NaverSignInButton = () => {
  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
    const state = crypto.randomUUID();
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
    window.location.href = url;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full h-12 flex items-center justify-center rounded-md"
      style={{ backgroundColor: "#03C75A" }}
    >
      <a target="_blank">
        <span className="text-white font-bold">네이버 로그인</span>
      </a>
    </button>
  );
};

export default NaverSignInButton;
