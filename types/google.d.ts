declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (
            parentElement: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: string;
              shape?: "rectangular" | "pill" | "circle" | "square";
              width?: string;
            }
          ) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
          // Add beginSignIn here
          beginSignIn: () => void;
        };
      };
    };
  }
}
