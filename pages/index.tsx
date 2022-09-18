import { url } from 'inspector';
import type { NextPage } from 'next';
import Link from 'next/link';
import styled from '../src/theme/styled';

const HomePage = styled('div')(({ theme }) => ({
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

  a: {
    padding: '10px 20px',
    backgroundColor: '#32b94d',
    color: 'white',
    borderRadius: 10,
    textDecoration: 'none',
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
  //TODO: Add styles to Home Page
  return (
    // <header className='header'>
    //   <div className='text-box'>
    //     <h1 className='heading-primary'>
    //       <span className='heading-primary-main'>Dive in!</span>
    //       <span className='heading-primary-sub'>Check out our quizzes!</span>
    //     </h1>
    //     <div className='auth-btns'>
    //       <Link href='/register'> SIGN UP</Link>
    //       <Link href='/login'>LOG IN</Link>
    //     </div>
    //   </div>
    // </header>
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
          <a href='/login'>Get started now!</a>
        </div>
      </ContentSection>
    </HomePage>
  );
};

export default Home;
