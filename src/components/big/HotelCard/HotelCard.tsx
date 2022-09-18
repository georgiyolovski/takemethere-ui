import MenuBookIcon from '@mui/icons-material/MenuBook';
import { CircularProgress, IconButton, Radio, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import Image from '../../small/Image/Image';
export interface IHotel {
  address: string;
  full_price: number;
  id: string;
  name: string;
  picture_url: string;
  rating: number;
}

interface IProps {
  hotel: IHotel;
  onClick?: () => void;
  isChecked?: boolean;
  isDetailsPage?: boolean;
  bookingSubUrl: string;
}

const HotelCard: React.FC<IProps> = ({
  hotel,
  onClick,
  isChecked,
  isDetailsPage,
  bookingSubUrl,
}) => {
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();

  const handleClickButton = () => {
    setLoading(true);
    fetch(
      `${apiEndpoint}/hotels/booking_url?name=${hotel.name}&${bookingSubUrl}`,
      {
        headers: {
          Authorization: `${auth?.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.url) {
          window.open(res.url, '_blank')?.focus();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Box
      mb={4}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'unset' },
        width: '100%',
        padding: isDetailsPage ? '0px' : '30px',
        borderRadius: 4,
        boxShadow: {
          xs: isDetailsPage
            ? 'none'
            : '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
          md: 'none',
        },
        '&:hover': {
          boxShadow: isDetailsPage
            ? 'none'
            : '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        },
      }}
    >
      {onClick && (
        <Box mt='auto' mb='auto' mr={{ md: 2 }}>
          <Radio onChange={onClick} checked={isChecked} />
        </Box>
      )}
      <Image src={hotel.picture_url} />
      <Box ml={2} mt={{ xs: 1, md: 0 }}>
        <Typography
          variant='h5'
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {hotel.name}
        </Typography>
        <Typography
          variant='caption'
          component='p'
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {hotel.address}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'unset' },
            mb: 1,
          }}
        >
          <Rating readOnly defaultValue={hotel.rating} precision={0.1} />
        </Box>
        <Typography
          variant='h4'
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          ${hotel.full_price}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'unset' },
            mb: 1,
          }}
        >
          {loading ? (
            <CircularProgress color='secondary' />
          ) : (
            <Tooltip arrow title='Check hotel'>
              <IconButton color='secondary' onClick={handleClickButton}>
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HotelCard;
