export interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignUpClick: (email: string) => void;
}
