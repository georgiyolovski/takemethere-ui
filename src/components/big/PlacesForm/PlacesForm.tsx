import { Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { useState } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';

const PlacesForm = () => {
  const [places, setPlaces] = useState([
    {
      id: 'ChIJz9cDEQ2jpBIRyPyyZbHXCkA',
      address: 'Barceloneta Beach, Spain',
      image_url:
        'https://lh3.googleusercontent.com/places/AM5lPC_R18c11eDCnK_ljRU4tJRQmMW3jK5nGoVZvtcMAPAPU95eYGnhVgibOJVq8VzMKqSldM9Leb6HSf0kt8NOyvD2En2h_spGMw=s1600-w700',
      location: {
        lat: 41.3783713,
        lng: 2.1924685,
      },
      name: 'Barceloneta Beach',
      rating: 4.3,
      tags: ['natural_feature', 'establishment'],
    },
    {
      id: 'ChIJz9cDEQ2jpBIRyPyyZbHXCkA',
      address: 'Pl. de Catalunya, 1, 4, 08002 Barcelona, Spain',
      image_url:
        'https://lh3.googleusercontent.com/places/AM5lPC_rza_XebgjA5T3hbkK6dunULHq8D6FcausyvvL56bHyuWsxcYjhfbzyvGdtVWrwvrlT8hGHJ_DAFNk8OzvJj5JsrXnqyOf2g=s1600-w700',
      location: {
        lat: 41.3858752,
        lng: 2.1691163,
      },
      name: 'Centre Comercial El Triangle',
      rating: 4,
      tags: ['shopping_mall', 'point_of_interest', 'store', 'establishment'],
    },
  ]);

  return (
    <Box mt={3}>
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
            <Typography variant='body2'>(select options)</Typography>
          </Box>
        </Grid>
      </Grid>
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </Box>
  );
};

export default PlacesForm;
