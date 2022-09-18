import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
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

const MyTrips: React.FC<IProps> = () => {
  const router = useRouter();

  const { auth } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch(`${apiEndpoint}/trips`, {
      headers: {
        Authorization: `${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((items) => setTrips(items))
      .catch((err) => console.log(err));
  }, [auth?.token]);

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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
          }}
        >
          {trips && trips.length
            ? trips.map(({ start_date, end_date, title, cover_url }) => (
                <TripCard
                  key={title}
                  start_date={start_date}
                  end_date={end_date}
                  title={title}
                  cover_url={cover_url}
                />
              ))
            : null}
        </Box>

        <Box width='100%' justifyContent='center' display='flex'>
          <IconButton
            onClick={() => {
              router.push('/add-trip');
            }}
          >
            <AddCircleIcon color='secondary' fontSize='large' />
          </IconButton>
        </Box>
      </>
    </Layout>
  );
};

export default MyTrips;
