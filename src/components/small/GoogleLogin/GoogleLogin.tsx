import { useRouter } from 'next/router';
import {
  GoogleLogin as GoogleLoginButton,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import styled from '../../../theme/styled';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

interface IProps {
  label: string;
  action: 'register' | 'login';
}

const Div = styled('div')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(4),

  '& > *': {
    width: '100%',
    borderRadius: '4px!important',
    fontWeight: '700!important',
    justifyContent: 'center',
  },
}));

const GoogleLogin: React.FC<IProps> = ({ action, label }) => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (auth?.token) {
      router.push('/my-trips');
    } else {
      const response = await fetch(`${apiEndpoint}/auth/${action}/google`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: (res as GoogleLoginResponse).tokenId,
        }),
      });
      const json = await response.json();

      if (json.token) {
        setAuth(json.token);
        router.push('/my-trips');
      }
    }
  };

  const onFailure = (err: any) => {
    console.log('Login failed: res:', err);
  };

  return (
    <Div>
      <GoogleLoginButton
        clientId={clientId}
        buttonText={label}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy='single_host_origin'
        style={{
          boxShadow:
            '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        }}
        isSignedIn={true}
      />
    </Div>
  );
};

export default GoogleLogin;
