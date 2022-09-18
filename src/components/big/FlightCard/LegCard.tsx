import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { Colors } from '../../../theme/theme';

export interface ILeg {
  arrival_time: string;
  carrier: {
    logo: string;
    name: string;
  };
  departure: string;
  departure_time: string;
  destination: string;
}

const LegCard = ({ leg }: { leg: ILeg }) => (
  <div>
    <Typography variant='h5' sx={{ color: Colors.black, fontWeight: 500 }}>
      {leg.departure} - {leg.destination}
    </Typography>
    <Typography variant='h5' sx={{ color: Colors.black, fontWeight: 500 }}>
      {leg.carrier.name}
    </Typography>
    <Typography variant='body2'>Depart at:</Typography>
    <Typography variant='body2' sx={{ color: Colors.black, fontWeight: 500 }}>
      {format(new Date(leg.departure_time), 'MMM dd, yyyy p')}
    </Typography>
    <Typography variant='body2'>Arrive at:</Typography>
    <Typography variant='body2' sx={{ color: Colors.black, fontWeight: 500 }}>
      {format(new Date(leg.arrival_time), 'MMM dd, yyyy p')}
    </Typography>
  </div>
);

export default LegCard;
