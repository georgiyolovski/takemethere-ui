import { CircularProgress, Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useCallback, useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import FlightCard, { IFlight } from '../FlightCard/FlightCard';

interface IFlights {
  outgoing: IFlight[];
  return: IFlight[];
}

interface IProps {
  searchSessionId: number;
}

const Flights: React.FC<IProps> = ({ searchSessionId }) => {
  const { auth } = useAuth();

  const [loadingFlights, setLoadingFlights] = useState(false);
  const [flights, setFlights] = useState<null | IFlights>(null);

  const getFlights = useCallback(
    (id: number) => {
      setLoadingFlights(true);

      fetch(`${apiEndpoint}/search_sessions/${id}/flights`, {
        headers: {
          Authorization: `${auth?.token}`,
        },
      })
        .then((res) => res.json())
        .then((res: IFlights) => setFlights(res))
        .catch((err) => console.log(err))
        .finally(() => setLoadingFlights(false));
    },
    [auth?.token]
  );

  useEffect(() => {
    if (searchSessionId) {
      getFlights(searchSessionId);
    }
  }, [getFlights, searchSessionId]);

  return (
    <>
      <Box mt={3}>
        {loadingFlights && (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        )}
        {flights && (
          <Box width='100%'>
            <>
              <Grid container spacing={2} mt={4} mb={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant='h4' sx={{ mr: 0.5 }}>
                      Outgoing
                    </Typography>
                    <Typography variant='body2'>(select a flight)</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%' }}>
                {flights.outgoing.map((flight) => (
                  <FlightCard key={JSON.stringify(flight)} flight={flight} />
                ))}
              </Box>
            </>

            <>
              <Grid container spacing={2} mt={4} mb={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant='h4' sx={{ mr: 0.5 }}>
                      Return
                    </Typography>
                    <Typography variant='body2'>(select a flight)</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%' }}>
                {flights.return.map((flight) => (
                  <FlightCard key={JSON.stringify(flight)} flight={flight} />
                ))}
              </Box>
            </>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Flights;
