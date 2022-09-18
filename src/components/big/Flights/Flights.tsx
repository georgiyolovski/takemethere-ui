import { CircularProgress, Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useCallback, useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../theme/theme';
import FlightCard, { IFlight } from '../FlightCard/FlightCard';

interface IFlights {
  outgoing: IFlight[];
  return: IFlight[];
}

interface IProps {
  searchSessionId: number;
  onSaveFlightUrl: (flightUrl: string) => void;
}

const Flights: React.FC<IProps> = ({ searchSessionId, onSaveFlightUrl }) => {
  const { auth } = useAuth();

  const [loadingFlights, setLoadingFlights] = useState(false);
  const [flights, setFlights] = useState<null | IFlights>(null);
  const [selectedFlights, setSelectedFlights] = useState<IFlight[]>([]);

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

  if (selectedFlights.length === 2) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        sx={{
          margin: '16px auto',
          borderRadius: 4,
          width: { sx: '100%', md: '50%' },
          pt: 3,
          pb: 3,
          border: '1px dotted',
        }}
      >
        <Typography variant='h5' sx={{ color: Colors.gray2 }}>
          Selected tickets:
        </Typography>
        <Box display='flex' justifyContent='space-around' width='100%'>
          {selectedFlights.map((flight, index) => (
            <Box key={JSON.stringify(flight)}>
              <Typography variant='caption' textAlign='center'>
                {index === 0 ? 'Outgoing' : 'Return'}
              </Typography>
              <Typography
                textAlign='center'
                variant='body2'
                sx={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'underline',
                }}
              >
                {flight.legs[0].departure} -{' '}
                {flight.legs[flight.legs.length - 1].destination}
              </Typography>
              <Typography
                textAlign='center'
                variant='body2'
                sx={{ color: Colors.black, fontSize: 16 }}
              >
                ${flight.price.amount}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

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
            {selectedFlights.length === 0 && (
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
                    <FlightCard
                      key={JSON.stringify(flight)}
                      flight={flight}
                      onSaveFlightUrl={onSaveFlightUrl}
                      onClickFlightCallback={(flight: IFlight) =>
                        setSelectedFlights((prevState) => [
                          ...prevState,
                          flight,
                        ])
                      }
                    />
                  ))}
                </Box>
              </>
            )}

            {selectedFlights.length === 1 && (
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
                    <FlightCard
                      key={JSON.stringify(flight)}
                      flight={flight}
                      onSaveFlightUrl={onSaveFlightUrl}
                      onClickFlightCallback={(flight: IFlight) =>
                        setSelectedFlights((prevState) => [
                          ...prevState,
                          flight,
                        ])
                      }
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Flights;
