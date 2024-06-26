export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginSocialPayload {
  email: string;
  social_id: string;
  social_type: number;
  first_name: string;
  last_name: string;
}

export interface ForgotPassPayload {
  email: string;
}
export interface refreshToken {
  token: any;
}
export interface SetPasswordType {
  token: string;
  password: string;
}
export interface Pyalod {
  code?: number | undefined;
  data: any;
  message: string;
  status: number;
}
export interface ApiResponse {
  status: number;
  message: string;
  code: number;
  data: any | null; // or more specific type if known
  meta: any | null;
}
/**
 * The type definition for the initial state of the auth slice.
 */
export type initialStateProps = {
  status: string;
  email?: string;
  userData?: any[];
  UserResponse?: any[];
};

export interface AuthState {
  // Define properties of your 'auth' slice
  status: boolean;
  email: string | null;
  userData: any[];
  UserResponse: any;
}

export interface AuthRootState {
  auth: AuthState; // Add other slices if needed
}
