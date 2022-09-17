import { AppBar, Box, Button, Grid, Link, Toolbar } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../theme/theme';
import Dropdown from '../../small/Dropdown/Dropdown';
import Image from '../../small/Image/Image';

const Header = (): JSX.Element => {
  const { auth, setDefaultAuth } = useAuth();

  return (
    <AppBar
      position='sticky'
      sx={{ padding: '0.5, 0', backgroundColor: Colors.white }}
    >
      <Toolbar sx={{ padding: '0, 4.5' }}>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item sx={{ display: 'flex' }}>
            <Link
              href='/'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              <Image width={40} />
              <Box component='span' sx={{ fontFamily: 'Atma' }}>
                TakeMeThere
              </Box>
            </Link>
          </Grid>

          <Grid item sx={{ alignSelf: 'flex-end' }}>
            <Dropdown
              avatarSrc={auth?.avatarUrl}
              buttonLabel={`Hi, ${auth?.firstName}` || 'Hi, unknown'}
            >
              <Button onClick={setDefaultAuth} variant='text'>
                Logout
              </Button>
            </Dropdown>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
