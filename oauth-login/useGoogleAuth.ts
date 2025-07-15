import { useEffect, useState } from "react";

interface GoogleAuthResponse {
  credential?: string;
  select_by?: string;
}

interface GoogleAuthOptions {
  clientId: string;
  onSuccess: (response: GoogleAuthResponse) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleAuthResponse) => void;
          }) => void;
          renderButton: (
            parentElement: HTMLElement,
            options: {
              theme: string;
              size: string;
              text: string;
              shape?: string;
              width?: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export const useGoogleAuth = ({
  clientId,
  onSuccess,
  onError,
}: GoogleAuthOptions) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "google-identity-script";
    if (document.getElementById(scriptId)) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = (e) => {
      console.error("Failed to load Google Identity Services script", e);
      if (onError) onError(e);
    };
    document.head.appendChild(script);

    return () => {
      if (document.getElementById(scriptId)) {
        document.head.removeChild(script);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (scriptLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: GoogleAuthResponse) => {
          if (response.credential) {
            onSuccess(response);
          } else {
            console.error(
              "Google authentication failed: No credential received",
              response
            );
            if (onError)
              onError(
                new Error(
                  "Google authentication failed: No credential received"
                )
              );
          }
        },
      });
    }
  }, [scriptLoaded, clientId, onSuccess, onError]);

  return { scriptLoaded };
};
