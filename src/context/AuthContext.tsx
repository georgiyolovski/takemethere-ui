import isAfter from 'date-fns/isAfter';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

export interface IAuth {
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
  token: string;
}

interface IAuthContext {
  auth: IAuth | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

const DEFAULT_AUTH_STATE: IAuth = {
  avatarUrl: '',
  email: '',
  firstName: '',
  lastName: '',
  exp: 0,
  token: '',
};

const DEFAULT_CONTEXT: IAuthContext = {
  auth: null,
  setAuth: () => {},
  logout: () => {},
};

const AuthStateContext = React.createContext(DEFAULT_CONTEXT);

interface IProps {
  children: React.ReactNode;
}

interface JwtExtendedPayload {
  aud: string;
  avatar_url: string;
  email: string;
  exp: number;
  first_name: string;
  iat: number;
  id: number;
  iss: string;
  jti: string;
  last_name: string;
  nbf: number;
}

const parseJWT = (jwt: string) => {
  try {
    const decoded = jwt_decode<JwtExtendedPayload>(jwt);
    return {
      avatarUrl: decoded.avatar_url,
      email: decoded.email,
      firstName: decoded.first_name,
      lastName: decoded.last_name,
      exp: decoded.exp,
      token: jwt,
    } as IAuth;
  } catch {
    return DEFAULT_AUTH_STATE as IAuth;
  }
};

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuth>(DEFAULT_AUTH_STATE);
  const router = useRouter();

  useEffect(() => {
    // Check if the token is in the context
    if (!authState.token) {
      const jwtToken = window.sessionStorage.getItem('token');

      // Check if the token is in sessionStorage
      if (jwtToken) {
        const parsed = parseJWT(jwtToken);
        const expDate = new Date(parsed.exp * 1000);

        // Check if the token has expired
        if (isAfter(new Date(), expDate)) {
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('firstName');
          window.sessionStorage.removeItem('avatar');
          router.push('/login');
        } else {
          setAuthState(parsed);
        }
      } else {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('firstName');
        window.sessionStorage.removeItem('avatar');
        router.push('/login');
      }
    }
  }, [authState.token, router]);

  return (
    <AuthStateContext.Provider
      value={{
        auth: authState,
        setAuth: (token: string) => {
          const parsed = parseJWT(token);
          setAuthState(parsed);
          window.sessionStorage.setItem('token', parsed.token);
          window.sessionStorage.setItem('firstName', parsed.firstName);
          window.sessionStorage.setItem('avatar', parsed.avatarUrl);
        },
        logout: () => {
          setAuthState(DEFAULT_AUTH_STATE);
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('firstName');
          window.sessionStorage.removeItem('avatar');

          router.push('/login');
        },
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

const useAuth = (): IAuthContext => useContext(AuthStateContext);

export { AuthProvider, useAuth };
