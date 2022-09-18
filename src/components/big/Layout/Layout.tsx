import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useRouter } from 'next/router';
import Header from '../../big/Header/Header';
interface IProps {
  title: string;
  children: React.ReactNode;
  showLink?: boolean;
}

const Layout: React.FC<IProps> = ({ title, children, showLink }) => {
  const router = useRouter();

  return (
    <>
      <Header />
      <Box
        component='main'
        sx={{
          width: '100%',
          p: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '70%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showLink && (
            <Button
              color='secondary'
              onClick={() => router.push('/my-trips')}
              sx={{ fontSize: 15, alignSelf: 'baseline' }}
            >
              <ArrowBackIcon />
              Back to My Trips
            </Button>
          )}

          <Typography variant='h1' textAlign='center' sx={{ marginBottom: 4 }}>
            {title}
          </Typography>

          <div style={{ width: '100%' }}>{children}</div>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
