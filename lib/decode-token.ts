import { jwtDecode } from 'jwt-decode';

interface DecodedGoogleToken {
  iss: string; // Issuer (e.g., accounts.google.com)
  azp: string; // Authorized party
  aud: string; // Audience (your client ID)
  sub: string; // Subject (Google user ID)
  hd?: string; // Hosted domain (if applicable)
  email: string;
  email_verified: boolean;
  nbf: number; // Not before
  name: string;
  picture: string; // Profile picture URL
  given_name: string;
  family_name: string;
  locale: string;
  iat: number; // Issued at
  exp: number; // Expiration time
  jti: string; // JWT ID
}

export const decodeGoogleIdToken = (token: string): DecodedGoogleToken | null => {
  try {
    return jwtDecode<DecodedGoogleToken>(token);
  } catch (error) {
    console.error("Error decoding Google ID token:", error);
    return null;
  }
};
