import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useCallback, useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import PlaceCard, { IPlace } from '../PlaceCard/PlaceCard';

interface IProps {
  onSelectPlace: (place: IPlace) => void;
  searchSessionId: number;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
}

const PlacesForm: React.FC<IProps> = ({
  onSelectPlace,
  onSubmit,
  searchSessionId,
  isSubmitDisabled,
}) => {
  const [places, setPlaces] = useState<IPlace[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { auth } = useAuth();

  const getPlaces = useCallback(
    (id: number) => {
      setLoading(true);

      fetch(`${apiEndpoint}/search_sessions/${id}/places`, {
        headers: {
          Authorization: `${auth?.token}`,
        },
      })
        .then((res) => res.json())
        .then((res: IPlace[]) => setPlaces(res))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    },
    [auth?.token]
  );

  useEffect(() => {
    if (searchSessionId) {
      getPlaces(searchSessionId);
    }
  }, [getPlaces, searchSessionId]);

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
              Attractions
            </Typography>
            <Typography variant='body2'>(select at least 1)</Typography>
          </Box>
        </Grid>
      </Grid>
      {places &&
        places.map((place) => (
          <PlaceCard
            key={JSON.stringify(place)}
            place={place}
            onClick={() => onSelectPlace(place)}
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

export default PlacesForm;
