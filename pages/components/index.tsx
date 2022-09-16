import Button from '@mui/material/Button';
import type { NextPage } from 'next';

const Components: NextPage = () => {
  return (
    <>
      <div style={{ margin: 20 }}>
        <Button variant='contained'>contained</Button>
        <Button variant='contained' color='secondary'>
          contained
        </Button>
        <Button variant='contained' color='error'>
          contained
        </Button>
        <Button variant='contained' color='warning'>
          contained
        </Button>
        <Button variant='outlined'>outlined</Button>
        <Button variant='outlined' color='secondary'>
          outlined
        </Button>
        <Button variant='outlined' color='error'>
          outlined
        </Button>
        <Button variant='outlined' color='warning'>
          outlined
        </Button>
        <Button variant='text'>text</Button>
        <Button variant='text' color='secondary'>
          text
        </Button>
        <Button variant='text' color='error'>
          text
        </Button>
        <Button variant='text' color='warning'>
          text
        </Button>
        <Button variant='underlined'>underlined</Button>
      </div>
    </>
  );
};

export default Components;
