import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useCallback, useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import HotelCard, { IHotel } from '../HotelCard/HotelCard';

interface IProps {
  onSelectHotel: (hotel: IHotel) => void;
  searchSessionId: number;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  selectedHotel: IHotel | null;
}

const HotelsForm: React.FC<IProps> = ({
  onSelectHotel,
  onSubmit,
  searchSessionId,
  isSubmitDisabled,
  selectedHotel,
}) => {
  const [hotels, setHotels] = useState<IHotel[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { auth } = useAuth();

  const getHotels = useCallback(
    (id: number) => {
      setLoading(true);

      fetch(`${apiEndpoint}/search_sessions/${id}/hotels`, {
        headers: {
          Authorization: `${auth?.token}`,
        },
      })
        .then((res) => res.json())
        .then((res: IHotel[]) => setHotels(res))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    },
    [auth?.token]
  );

  useEffect(() => {
    if (searchSessionId) {
      getHotels(searchSessionId);
    }
  }, [getHotels, searchSessionId]);

  return (
    <Box mt={3}>
      {loading && (
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography variant='h4' color='error' textAlign='center'>
          Please try another search!
        </Typography>
      )}
      {!loading && !error && (
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
                Hotels
              </Typography>
              <Typography variant='body2'>(select a hotel)</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      {hotels &&
        hotels.map((hotel) => (
          <HotelCard
            key={JSON.stringify(hotel)}
            hotel={hotel}
            onClick={() => onSelectHotel(hotel)}
            isChecked={selectedHotel?.id === hotel.id}
          />
        ))}
      <Button
        variant='contained'
        fullWidth
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        Save My Trip
      </Button>
    </Box>
  );
};

export default HotelsForm;
