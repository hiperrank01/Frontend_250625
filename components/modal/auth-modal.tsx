"use client";

import { useState } from "react";
import { LoginModal } from "./login-modal";
import { SignUpModal } from "./signup-modal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => {
    setIsLogin((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {isLogin ? (
          <LoginModal
            isOpen={isOpen}
            onClose={onClose}
            onSignUpClick={toggleModal}
          />
        ) : (
          <SignUpModal
            isOpen={isOpen}
            onClose={onClose}
            onLoginClick={toggleModal}
          />
        )}
      </div>
    </>
  );
}