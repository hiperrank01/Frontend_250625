import React, { useEffect, useRef } from "react";
import { useGoogleAuth } from "./useGoogleAuth";
import { GoogleSignInButtonProps } from "@/types/auth";

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  clientId,
  onSuccess,
  onError,
  buttonText = "Sign in with Google",
  theme = "outline",
  size = "large",
  type = "standard",
  shape = "rectangular",
  width = "",
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { scriptLoaded } = useGoogleAuth({
    clientId,
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (scriptLoaded && buttonRef.current && window.google) {
      // 기존 버튼이 있다면 제거하고 다시 렌더링
      buttonRef.current.innerHTML = ''; // 기존 내용을 비웁니다.
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: theme,
        size: size,
        text: type === "standard" ? buttonText : "",
        shape: shape,
        width: width,
      });
    }
  }, [scriptLoaded, buttonRef.current, buttonText, theme, size, type, shape, width]); // buttonRef.current를 의존성 배열에 추가

  return <div ref={buttonRef} className="google-signin-button"></div>;
};
