import Button from '@mui/material/Button';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from '../src/theme/styled';

const HomePage = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  background:
    'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(193,238,238,1) 75%, rgba(0,139,139,1) 100%)',
}));

const ContentSection = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  '> div': {
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
    },
    padding: 50,
  },

  h1: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    marginTop: -20,
    color: theme.palette.secondary.main,
    fontFamily: 'Atma',
  },

  ul: {
    marginBottom: 30,
  },

  li: {
    listStyle: 'url(images/tick.svg)',
  },

  'li::marker': {
    marginTop: 2,
  },
}));

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <HomePage>
      <ContentSection>
        <img src='/logo/svg/tmd_logo_no_text.svg' width={400} />
        <div>
          <h1>Plan the trip of your dreams!</h1>
          <p>Select your dream destination, we take care of the rest:</p>
          <ul>
            <li>Plane tickets</li>
            <li>Hotel bookings</li>
            <li>Places to visit</li>
          </ul>
          <Button variant='contained' onClick={() => router.push('/login')}>
            Get started now!
          </Button>
        </div>
      </ContentSection>
    </HomePage>
  );
};

export default Home;
