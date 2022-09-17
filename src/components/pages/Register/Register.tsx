import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Copyright from '../../small/Copyright/Copyright';
import GoogleLogin from '../../small/GoogleLogin/GoogleLogin';
import PasswordTextField from '../../small/PasswordTextField/PasswordTextField';
import { Button, Div, Form, Image } from './Register.styled';

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('password-confirm'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    });
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
      <GoogleLogin label='Signup with Google' />
      <Copyright />
    </Container>
  );
};

export default Register;
