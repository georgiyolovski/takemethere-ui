import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { format } from 'date-fns';
import Image from '../../small/Image/Image';

interface IProps {
  start_date: Date;
  end_date: Date;
  title: string;
  cover_url: string;
}

const TripCard: React.FC<IProps> = ({
  start_date,
  end_date,
  title,
  cover_url,
}) => (
  <Box
    m={2}
    sx={{
      width: { xs: '100%', md: '450px' },
      borderRadius: 4,
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      '&:hover': {
        cursor: 'pointer',
      },
    }}
  >
    <Image src={cover_url} />
    <Box>
      <Typography textAlign='center' variant='h4' sx={{ marginTop: '20px' }}>
        {title}
      </Typography>
      <Typography
        textAlign='center'
        sx={{ color: 'secondary.main' }}
        variant='caption'
        component='p'
      >
        <strong>{format(new Date(start_date), 'dd MMM, yyyy')}</strong> to{' '}
        <strong>{format(new Date(end_date), 'dd MMM, yyyy')}</strong>
      </Typography>
    </Box>
  </Box>
);

export default TripCard;
