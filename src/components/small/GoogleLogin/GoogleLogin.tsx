import { useRouter } from 'next/router';
import { GoogleLogin as GoogleLoginBtn } from '@react-oauth/google';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import styled from '../../../theme/styled';

interface IProps {
  label: string;
  action: 'register' | 'login';
}

const Div = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(4),

  '& > *': {
    borderRadius: '4px!important',
    fontWeight: '700!important',
    justifyContent: 'center',
  },
}));

const GoogleLogin: React.FC<IProps> = ({ action, label }) => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const onSuccess = async ({ credential }: any) => {
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
          token: credential,
        }),
      });
      const json = await response.json();

      if (json.token) {
        setAuth(json.token);
        router.push('/my-trips');
      }
    }
  };

  return (
    <Div>
      <GoogleLoginBtn
        auto_select={false}
        onSuccess={onSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </Div>
  );
};

export default GoogleLogin;
