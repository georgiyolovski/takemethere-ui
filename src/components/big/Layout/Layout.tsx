import { Typography } from '@mui/material';
import Box from '@mui/system/Box';
import Header from '../../big/Header/Header';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ title, children }) => {
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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h1' textAlign='center' sx={{ marginBottom: 4 }}>
            {title}
          </Typography>

          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
