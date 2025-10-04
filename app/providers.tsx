"use client";

import { ReactNode, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useLogout } from "@/hooks/login/use-auth";

function SessionChecker() {
  const logout = useLogout();

  useEffect(() => {
    const checkToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const isExpired = Date.now() >= decodedToken.exp! * 1000;
          if (isExpired) {
            console.log("Access token expired, logging out.");
            logout();
          }
        } catch (error) {
          console.error("Failed to decode token, logging out.", error);
          logout();
        }
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [logout]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionChecker />
      {children}
    </QueryClientProvider>
  );
}
