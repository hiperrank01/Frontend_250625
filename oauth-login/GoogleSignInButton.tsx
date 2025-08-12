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
    if (scriptLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: onSuccess,
        auto_select: false,
      });

      if (buttonRef.current) {
        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme,
          size,
          text: type === "standard" ? buttonText : "",
          shape,
          width,
        });
      }
    }
  }, [
    scriptLoaded,
    clientId,
    onSuccess,
    buttonText,
    theme,
    size,
    type,
    shape,
    width,
  ]);

  return <div ref={buttonRef} className="google-signin-button"></div>;
};
