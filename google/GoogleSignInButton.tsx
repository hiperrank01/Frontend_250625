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
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: theme,
        size: size,
        text: type === "standard" ? buttonText : "",
        shape: shape,
        width: width,
      });
    }
  }, [scriptLoaded, buttonText, theme, size, type, shape, width]);

  return <div ref={buttonRef} className="google-signin-button"></div>;
};
