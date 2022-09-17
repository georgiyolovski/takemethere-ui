import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

export interface IAuth {
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface IAuthContext {
  auth: IAuth | null;
  setAuth: (token: string) => void;
  setDefaultAuth: () => void;
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
  setDefaultAuth: () => {},
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
      token: jwt,
    } as IAuth;
  } catch {
    return DEFAULT_AUTH_STATE as IAuth;
  }
};

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuth>(DEFAULT_AUTH_STATE);
  const router = useRouter();

  return (
    <AuthStateContext.Provider
      value={{
        auth: authState,
        setAuth: (token: string) => {
          const parsed = parseJWT(token);
          setAuthState(parsed);
          sessionStorage.setItem('token', parsed.token);
          sessionStorage.setItem('firstName', parsed.firstName);
          sessionStorage.setItem('avatar', parsed.avatarUrl);
        },
        setDefaultAuth: () => {
          setAuthState(DEFAULT_AUTH_STATE);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('firstName');
          sessionStorage.removeItem('avatar');

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
