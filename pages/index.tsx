import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  //TODO: Add styles to Home Page
  return (
    <header className='header'>
      <div className='text-box'>
        <h1 className='heading-primary'>
          <span className='heading-primary-main'>Dive in!</span>
          <span className='heading-primary-sub'>Check out our quizzes!</span>
        </h1>
        <div className='auth-btns'>
          <Link href='/register'> SIGN UP</Link>
          <Link href='/login'>LOG IN</Link>
        </div>
      </div>
    </header>
  );
};

export default Home;
