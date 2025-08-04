export interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignUpClick: (email: string) => void;
}

export interface SignUpRequest {
  password: string;
  confirmPassword: string;
  nm: string;
  phn_no: string;
  rcm_eml: string | "";
  prv_agr_yn: string;
  tos_agr_yn: string;
  adv_rcv_yn: string;
  eml_adr: string;
}
