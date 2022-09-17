import jwt_decode from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';

export interface IAuth {
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface IAuthContext {
  auth: IAuth | null;
  setAuth: (toke: string) => void;
}

const DEFAULT_AUTH_STATE: IAuth = {
  avatarUrl: '',
  email: '',
  firstName: '',
  lastName: '',
  token: '',
};

const DEFAULT_CONTEXT: IAuthContext = {
  auth: null,
  setAuth: () => {},
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

export const SESSION_STORAGE_KEY = 'auth';

const parseJWT = (jwt: string) => {
  try {
    const decoded = jwt_decode<JwtExtendedPayload>(jwt);
    return {
      avatarUrl: decoded.avatar_url,
      email: decoded.email,
      firstName: decoded.first_name,
      lastName: decoded.last_name,
      token: jwt,
    } as IAuth;
  } catch {
    return DEFAULT_AUTH_STATE as IAuth;
  }
};

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuth>(DEFAULT_AUTH_STATE);

  useEffect(() => {
    if (authState.token) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, authState?.token);
    }
  }, [authState]);

  return (
    <AuthStateContext.Provider
      value={{
        auth: authState,
        setAuth: (token: string) => {
          setAuthState(parseJWT(token));
        },
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

const useAuth = (): IAuthContext => useContext(AuthStateContext);

export { AuthProvider, useAuth };
