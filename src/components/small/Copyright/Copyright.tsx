import Link from '@mui/material/Link/Link';
import Typography from '@mui/material/Typography/Typography';

const Copyright = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://accedia.com/privacy-notice'>
        Accedia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
