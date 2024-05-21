import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import _ from "@lodash";
import { PartialDeep } from "type-fest";
import { useAppDispatch } from "app/store/store";
import { logIn } from "app/store/Auth";
import { getLocalStorage } from "src/utils";
import { useNavigate } from "react-router";

const defaultAuthConfig = {
  tokenStorageKey: "jwt_access_token",
  signInUrl: "api/auth/sign-in",
  signUpUrl: "api/auth/sign-up",
  tokenRefreshUrl: "api/auth/refresh",
  getUserUrl: "api/auth/user",
  updateUserUrl: "api/auth/user",
  updateTokenFromHeader: false,
};

export type JwtAuthProps<T> = {
  config: {
    tokenStorageKey: string;
    signInUrl: string;
    signUpUrl: string;
    tokenRefreshUrl: string;
    getUserUrl: string;
    updateUserUrl: string;
    /**
     * If the response auth header contains a new access token, update the token
     * in the Authorization header of the successful responses
     */
    updateTokenFromHeader: boolean;
  };
  onSignedIn?: (U: T) => void;
  onSignedUp?: (U: T) => void;
  onSignedOut?: () => void;
  onUpdateUser?: (U: T) => void;
  onError?: (error: AxiosError) => void;
};

type SignInPayload = {
  email?: string;
  password?: string;
};
export type JwtAuth<User, SignUpPayload> = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (U: SignInPayload) => void;
  signOut: () => void;
  signUp: (U: SignUpPayload) => Promise<AxiosResponse<User, AxiosError>>;
  updateUser: (U: PartialDeep<User>) => void;
  refreshToken: () => void;
  setIsLoading: (isLoading: boolean) => void;
};

/**
 * useJwtAuth hook
 * Description: This hook handles the authentication flow using JWT
 * It uses axios to make the HTTP requests
 * It uses jwt-decode to decode the access token
 * It uses localStorage to store the access token
 * It uses Axios interceptors to update the access token from the response headers
 * It uses Axios interceptors to sign out the user if the refresh token is invalid or expired
 */

const useJwtAuth = <User, SignUpPayload>(
  props: JwtAuthProps<User>
): JwtAuth<User, SignUpPayload> => {
  const {
    config,
    onSignedIn,
    onSignedOut,
    onSignedUp,
    onError,
    onUpdateUser,
  } = props;
  const dispatch = useAppDispatch();
  // Merge default config with the one from the props
  const authConfig = _.defaults(config, defaultAuthConfig);

  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Set session
   */
  const setSession = useCallback((accessToken: string, userDetail?: User) => {
    if (accessToken) {
      localStorage.setItem(authConfig.tokenStorageKey, accessToken);
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, []);

  const resetSession = useCallback(() => {
    localStorage.removeItem(authConfig.tokenStorageKey);
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("userDetail");
  }, []);

  /**
   * Get access token from local storage
   */
  const getAccessToken = useCallback(() => {
    return localStorage.getItem(authConfig.tokenStorageKey);
  }, []);

  /**
   * Handle sign-in success
   */
  const handleSignInSuccess = useCallback(
    (userData: User, accessToken: string) => {
      setSession(accessToken, userData);
      setIsAuthenticated(true);
      setUser(userData);
      onSignedIn(userData);
    },
    []
  );
  /**
   * Handle sign-up success
   */

  const handleSignUpSuccess = useCallback(
    (userData: User, accessToken: string) => {
      setSession(accessToken, userData);
      setIsAuthenticated(true);

      setUser(userData);

      onSignedUp(userData);
    },
    []
  );

  /**
   * Handle sign-in failure
   */
  const handleSignInFailure = useCallback((error: AxiosError) => {
    resetSession();

    setIsAuthenticated(false);
    setUser(null);

    handleError(error);
  }, []);

  /**
   * Handle sign-up failure
   */
  const handleSignUpFailure = useCallback((error: AxiosError) => {
    resetSession();

    setIsAuthenticated(false);
    setUser(null);

    handleError(error);
  }, []);

  /**
   * Handle error
   */
  const handleError = useCallback((error: AxiosError) => {
    onError(error);
  }, []);

  /**
   * Check if the access token is valid
   */
  const isTokenValid = useCallback((accessToken: string) => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
      } catch (error) {
        return false;
      }
    }
    return false;
  }, []);

  /**
   * Check if the access token exist and is valid on mount
   * If it is, set the user and isAuthenticated states
   * If not, clear the session
   */
  useEffect(() => {
    const attemptAutoLogin = async () => {
      const accessToken = getAccessToken();
      const userData = getLocalStorage("userDetail");

      if (!!accessToken) {
        handleSignInSuccess(userData, accessToken);
      } else {
        resetSession();
        return false;
      }
    };

    if (!isAuthenticated) {
      attemptAutoLogin().then(() => {
        setIsLoading(false);
      });
    }
  }, [
    isTokenValid,
    setSession,
    handleSignInSuccess,
    handleSignInFailure,
    handleError,
    getAccessToken,
    isAuthenticated,
  ]);

  /**
   * Sign in
   */
  const signIn = async (credentials: SignInPayload) => {
    let response = await dispatch(
      logIn({ email: credentials?.email, password: credentials?.password })
    );
    if (response?.payload?.status) {
      const userData = response?.payload.data?.user;
      const accessToken = response?.payload.data?.access_token;
      const signin = response?.payload.data?.user?.is_signed;
      const link = response?.payload.data?.user?.subscription_and_docusign;
      console.log(response?.payload.data, "response?.payload.data");
      localStorage.setItem(
        "userData",
        JSON.stringify(userData.subscription_and_docusign)
      );
      if (signin == 1) {
        handleSignInSuccess(userData, accessToken);
      } else {
        window.location.href = "/verification";
      }
    }
    return response;
  };

  /**
   * Sign up
   */
  const signUp = useCallback((data: SignUpPayload) => {
    const response = axios.post(authConfig.signUpUrl, data);

    response.then(
      (res: AxiosResponse<{ user: User; access_token: string }>) => {
        const userData = res?.data?.user;
        const accessToken = res?.data?.access_token;

        handleSignUpSuccess(userData, accessToken);

        return userData;
      },
      (error) => {
        const axiosError = error as AxiosError;

        handleSignUpFailure(axiosError);

        return axiosError;
      }
    );

    return response;
  }, []);

  /**
   * Sign out
   */
  const signOut = useCallback(() => {
    resetSession();

    setIsAuthenticated(false);
    setUser(null);

    onSignedOut();
  }, []);

  /**
   * Update user
   */
  const updateUser = useCallback(async (userData: PartialDeep<User>) => {
    try {
      const response: AxiosResponse<User, PartialDeep<User>> = await axios.put(
        authConfig.updateUserUrl,
        userData
      );

      const updatedUserData = response?.data;

      onUpdateUser(updatedUserData);

      return null;
    } catch (error) {
      const axiosError = error as AxiosError;

      handleError(axiosError);
      return axiosError;
    }
  }, []);

  /**
   * Refresh access token
   */
  const refreshToken = async () => {
    setIsLoading(true);

    console.log("accessToken4544", "accessToken4544");

    try {
      const response: AxiosResponse<string> = await axios.post(
        authConfig.tokenRefreshUrl
      );

      const accessToken = response?.headers?.["New-Access-Token"] as string;

      if (accessToken) {
        setSession(accessToken);

        return accessToken;
      }
      return null;
    } catch (error) {
      const axiosError = error as AxiosError;

      handleError(axiosError);
      return axiosError;
    }
  };

  /**
   * if a successful response contains a new Authorization header,
   * updates the access token from it.
   *
   */
  useEffect(() => {
    if (authConfig.updateTokenFromHeader && isAuthenticated) {
      axios.interceptors.response.use(
        (response) => {
          const newAccessToken = response?.headers?.[
            "New-Access-Token"
          ] as string;

          if (newAccessToken) {
            setSession(newAccessToken);
          }
          return response;
        },
        (error) => {
          const axiosError = error as AxiosError;

          if (axiosError?.response?.status === 401) {
            signOut();
            // eslint-disable-next-line no-console
            console.warn("Unauthorized request. User was signed out.");
          }
          return Promise.reject(axiosError);
        }
      );
    }
  }, [isAuthenticated]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    refreshToken,
    setIsLoading,
  };
};

export default useJwtAuth;
