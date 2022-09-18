import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Image from '../../small/Image/Image';

export interface IPlace {
  id: string;
  address: string;
  image_url: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  rating: number;
  tags: string[];
}

const PlaceCard = ({ place, key }: { place: IPlace; key: string }) => {
  return (
    <Box
      key={key}
      mb={4}
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Image src={place.image_url} />
      <Box ml={2}>
        <Typography variant='h5'>{place.name}</Typography>
        <Typography variant='caption'>{place.address}</Typography>
        <Box>
          <Rating readOnly defaultValue={place.rating} precision={0.1} />
        </Box>
        <Box>
          {place.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag.replaceAll('_', ' ')}
              sx={{ mr: { xs: 0, md: 0.5 }, mb: { xs: 0.5, md: 0 } }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceCard;
