import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useRouter } from 'next/router';
import Layout from '../../big/Layout/Layout';
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
    <Layout
      title={`My Trips${trips && trips.length ? `(${trips.length})` : ''}`}
    >
      <>
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
      </>
    </Layout>
  );
};

export default MyTrips;
