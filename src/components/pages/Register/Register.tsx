import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import Copyright from '../../small/Copyright/Copyright';
import GoogleLogin from '../../small/GoogleLogin/GoogleLogin';
import Image from '../../small/Image/Image';
import PasswordTextField from '../../small/PasswordTextField/PasswordTextField';
import { Button, Div, Form } from './Register.styled';

const Register = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);

    const response = await fetch(`${apiEndpoint}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.get('email'),
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
        password: data.get('password'),
      }),
    });

    const json = await response.json();

    if (json.token) {
      setAuth(json.token);
      router.push('/my-trips');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Div>
        <Image src='/logo/svg/tmd_logo_no_text.svg' alt='image' />
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordTextField />
            </Grid>

            <Grid item xs={12}>
              <PasswordTextField
                name='password-confirm'
                label='Confirm Password'
                id='password-confirm'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained'>
            Register
          </Button>
          <Grid container justifyContent='center' mb={2}>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Click here to login..
              </Link>
            </Grid>
          </Grid>
        </Form>
        or
      </Div>
      <GoogleLogin label='Signup with Google' action='register' />
      <Copyright />
    </Container>
  );
};

export default Register;
