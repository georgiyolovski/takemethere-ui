import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
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

interface IProps {
  place: IPlace;
  onClick: () => void;
}

const PlaceCard: React.FC<IProps> = ({ place, onClick }) => {
  return (
    <Box
      mb={4}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'unset' },
        width: '100%',
        padding: '30px',
        borderRadius: 4,
        boxShadow: {
          xs: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
          md: 'none',
        },
        '&:hover': {
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        },
      }}
    >
      <Box mt='auto' mb='auto' mr={{ md: 2 }}>
        <Checkbox onChange={onClick} />
      </Box>

      <Image src={place.image_url} />
      <Box ml={2}>
        <Typography
          variant='h5'
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {place.name}
        </Typography>
        <Typography
          variant='caption'
          component='p'
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {place.address}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'unset' },
          }}
        >
          <Rating readOnly defaultValue={place.rating} precision={0.1} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'unset' },
          }}
        >
          {place.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag.replaceAll('_', ' ')}
              sx={{
                mr: { xs: 'auto', md: 0.5 },
                mb: { xs: 0.5, md: 0 },
                width: 'fit-content',
                ml: 'auto',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceCard;
