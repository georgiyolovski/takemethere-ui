import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../theme/theme';
import Card from '../../small/Card/Card';

export interface IFlight {
  legs: {
    arrival_time: string;
    carrier: {
      logo: string;
      name: string;
    };
    departure: string;
    departure_time: string;
    destination: string;
  }[];
  notes: string[];
  price: {
    amount: number;
    id: string;
    impressionId: string;
  };
  search_hash: string;
  search_id: string;
}

interface IProps {
  key: string;
  flight: IFlight;
}

const FlightCard: React.FC<IProps> = ({ key, flight }) => {
  const { auth } = useAuth();

  const handleClickFlight = () => {
    fetch(
      `${apiEndpoint}/booking_url?search_hash=${
        flight.search_hash
      }&destination=${flight.legs[flight.legs.length - 1].destination}&id=${
        flight.price.id
      }&origin=${flight.legs[0].departure}&search_id=${
        flight.search_id
      }&impression_id=${flight.price.impressionId}`,
      {
        headers: {
          Authorization: `${auth?.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res: { booking_url?: string }) => {
        if (res.booking_url) {
          window.open(res.booking_url, '_blank')?.focus();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card key={key} onClick={handleClickFlight}>
      <Stepper alternativeLabel>
        {flight.legs.map((leg) => (
          <Step key={leg.departure_time}>
            <StepLabel
              StepIconComponent={(props) => (
                <img
                  {...props}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: '50%',
                    border: `1px dotted ${Colors.gray2}`,
                  }}
                  src={leg.carrier.logo}
                />
              )}
            >
              <div>
                <Typography
                  variant='h5'
                  sx={{ color: Colors.black, fontWeight: 500 }}
                >
                  {leg.departure} - {leg.destination}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{ color: Colors.black, fontWeight: 500 }}
                >
                  {leg.carrier.name}
                </Typography>
                <Typography variant='body2'>Depart at:</Typography>
                <Typography
                  variant='body2'
                  sx={{ color: Colors.black, fontWeight: 500 }}
                >
                  {format(new Date(leg.departure_time), 'MMM dd, yyyy p')}
                </Typography>
                <Typography variant='body2'>Arrive at:</Typography>
                <Typography
                  variant='body2'
                  sx={{ color: Colors.black, fontWeight: 500 }}
                >
                  {format(new Date(leg.arrival_time), 'MMM dd, yyyy p')}
                </Typography>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' mt={4} mb={2}>
          Total price: ${flight.price.amount}
        </Typography>
        {flight.notes.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='body2'
              sx={{ color: Colors.black, fontWeight: 500 }}
            >
              Notes:
            </Typography>
            {flight.notes.map((data) => (
              <Typography
                variant='body2'
                key={data}
                dangerouslySetInnerHTML={{ __html: data }}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </Card>
  );
};

export default FlightCard;
