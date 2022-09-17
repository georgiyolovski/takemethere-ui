import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import Image from '../../small/Image/Image';

interface IProps {
  from: Date;
  to: Date;
  destination: string;
  src: string;
}

const TripCard: React.FC<IProps> = ({ from, to, destination, src }) => (
  <Box
    m={2}
    sx={{
      width: { xs: '100%', md: '70%' },
      borderRadius: 4,
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&:hover': {
        transform: 'translateY(-7px)',
        boxShadow:
          '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      },
    }}
  >
    <Image src={src} />
    <Box>
      <Typography textAlign='center' variant='h4'>
        {formatDistanceStrict(from, to, {
          unit: 'day',
        })}{' '}
        in {destination}
      </Typography>
      <Typography textAlign='center'>
        {format(from, 'MMM dd, yyyy')} - {format(to, 'MMM dd, yyyy')}
      </Typography>
    </Box>
  </Box>
);

export default TripCard;
