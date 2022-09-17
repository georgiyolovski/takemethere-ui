import MuiAvatar from '@mui/material/Avatar';
import MuiButton from '@mui/material/Button';
import styled from '../../../theme/styled';

export const Div = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: `${theme.palette.secondary.main}!important`,
}));

export const Form = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
