import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useRouter } from 'next/router';
import Header from '../../big/Header/Header';
import TripCard from '../../big/TripCard/TripCard';

interface IProps {
  trips?: {
    from: Date;
    to: Date;
    destination: string;
    src: string;
  }[];
}

const MyTrips: React.FC<IProps> = ({ trips = [] }) => {
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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h1' textAlign='center' sx={{ marginBottom: 4 }}>
            {`My Trips${trips && trips.length ? `(${trips.length})` : ''}`}
          </Typography>

          {(!trips || trips?.length === 0) && (
            <Box mb={3} mt={3}>
              <Typography textAlign='center'>
                It seems that you have no planned trips yet.
              </Typography>
              <Typography textAlign='center'>
                Click the button bellow to add one!
              </Typography>
            </Box>
          )}

          {trips && trips.length
            ? trips.map(({ from, to, destination, src }) => (
                <TripCard
                  key={`${from}-${to}-${destination}`}
                  from={from}
                  to={to}
                  destination={destination}
                  src={src}
                />
              ))
            : null}

          <IconButton
            onClick={() => {
              router.push('/add-trip');
            }}
          >
            <AddCircleIcon color='secondary' fontSize='large' />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default MyTrips;
