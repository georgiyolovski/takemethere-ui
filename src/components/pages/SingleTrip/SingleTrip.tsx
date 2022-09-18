import { Button, CircularProgress, Link } from '@mui/material';
import Chip from '@mui/material/Chip/Chip';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import HotelCard, { IHotel } from '../../big/HotelCard/HotelCard';
import Layout from '../../big/Layout/Layout';
import PlaceCard, { IPlace } from '../../big/PlaceCard/PlaceCard';
import Image from '../../small/Image/Image';

interface ITripDetails {
  activities: string[];
  adults: number;
  children: number;
  cover_url: string;
  hotels: {
    items: IHotel[];
  };

  tickets: {
    items: string[];
  };

  places: {
    items: IPlace[];
  };
  location: {
    country: string;
    name: string;
  };
  end_date: string;
  start_date: string;
  title: string;
}

const SingleTrip = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const [trip, setTrip] = useState<ITripDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${apiEndpoint}/trips/${router.query.id}`, {
      headers: {
        Authorization: `${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((items) => setTrip(items))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [auth?.token, router.query.id]);

  return (
    <Layout title={trip ? trip.title : ''} showLink>
      <>
        {loading && (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        )}{' '}
        {trip && (
          <Box mt={3}>
            <Box
              display='flex'
              flexDirection={{ xs: 'column', md: 'row' }}
              mb={{ xs: 2, md: 8 }}
            >
              <Box
                mr={5}
                mb={{ xs: 5, md: 0 }}
                width={{ xs: '100%', md: 'auto' }}
                display={{ xs: 'flex', md: 'block' }}
                justifyContent='center'
              >
                <Image src={trip.cover_url} alt={trip.title} width={300} />
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
              >
                <Box mb={2}>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ color: 'secondary.main' }}
                    variant='h4'
                  >
                    Destination
                  </Typography>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ fontSize: 16 }}
                    variant='caption'
                    component='p'
                  >
                    <strong>{trip.location.name}</strong>,{' '}
                    {trip.location.country}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ color: 'secondary.main' }}
                    variant='h4'
                  >
                    Dates
                  </Typography>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ fontSize: 16 }}
                    variant='caption'
                    component='p'
                  >
                    <strong>
                      {format(new Date(trip.start_date), 'dd MMM, yyyy')}
                    </strong>{' '}
                    to{' '}
                    <strong>
                      {format(new Date(trip.end_date), 'dd MMM, yyyy')}
                    </strong>
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ color: 'secondary.main' }}
                    variant='h4'
                  >
                    Activities
                  </Typography>
                  <Box
                    sx={{
                      display: { xs: 'flex', md: 'flow-root' },
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: { xs: 'center', md: 'unset' },
                    }}
                  >
                    {trip.activities.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag.replaceAll('_', ' ')}
                        sx={{
                          mr: { xs: 'auto', md: 0.5 },
                          mb: 0.5,
                          width: 'fit-content',
                          ml: 'auto',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <Box mb={2}>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ color: 'secondary.main' }}
                    variant='h4'
                  >
                    Reservation details
                  </Typography>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ fontSize: 16 }}
                    variant='caption'
                    component='p'
                  >
                    <strong>{trip.adults}</strong> adults,{' '}
                    <strong>{trip.children}</strong> children
                  </Typography>

                  {trip.tickets.items.length === 2 ? (
                    <Box
                      sx={{
                        width: { xs: '100%', md: 'auto' },
                        mt: 1,
                        mb: 1,
                        display: { xs: 'flex', md: 'block' },
                        justifyContent: 'space-around',
                      }}
                    >
                      <Link
                        href={trip.tickets.items[0]}
                        target='_blank'
                        sx={{ textDecoration: 'none', mr: 1 }}
                      >
                        <Button variant='outlined' color='secondary'>
                          Outgoing flight
                        </Button>
                      </Link>
                      <Link
                        href={trip.tickets.items[1]}
                        target='_blank'
                        sx={{ textDecoration: 'none', mr: 1 }}
                      >
                        <Button variant='outlined' color='secondary'>
                          Return flight
                        </Button>
                      </Link>
                    </Box>
                  ) : null}

                  {trip.hotels.items.length === 1 ? (
                    <Box mt={2} mb={2}>
                      <HotelCard
                        isDetailsPage
                        key={JSON.stringify(trip.hotels.items[0])}
                        hotel={trip.hotels.items[0]}
                      />
                    </Box>
                  ) : null}
                </Box>

                <Box>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ color: 'secondary.main' }}
                    variant='h4'
                    mb={0.5}
                  >
                    Selected attractions
                  </Typography>
                  {trip.places.items.map((place: IPlace) => (
                    <PlaceCard
                      isDetailsPage
                      key={JSON.stringify(place)}
                      place={place}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </>
    </Layout>
  );
};

export default SingleTrip;
