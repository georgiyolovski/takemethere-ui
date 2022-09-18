import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid/Grid';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import styled from '../../../theme/styled';
import { Colors } from '../../../theme/theme';
import Flights from '../../big/Flights/Flights';
import Layout from '../../big/Layout/Layout';
import DatePicker from '../../small/DatePicker/DatePicker';
import DestinationAutocomplete from '../../small/DestinationAutocomplete/DestinationAutocomplete';
import { Form } from '../Register/Register.styled';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

interface IFlight {
  outgoing: {
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
  }[];
  return: {
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
      amount: 19.0;
      id: string;
      impressionId: string;
    };
    search_hash: string;
    search_id: string;
  }[];
}

const AddTrip = () => {
  const { auth } = useAuth();

  const [people, setPeople] = useState({
    children: 0,
    adults: 0,
  });
  const [dateRange, setDateRange] = useState<{
    from: string | null;
    to: string | null;
  }>({ from: null, to: null });
  const [activities, setActivities] = useState<string[]>([]);
  const [location, setLocation] = useState<null | number>(null);

  const [searchSessionId, setSearchSessionId] = useState<null | number>(null);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const response = await fetch(`${apiEndpoint}/search_sessions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${auth?.token}`,
      },
      body: JSON.stringify({
        location_id: location,
        activities,
        start_date: dateRange.from,
        end_date: dateRange.to,
        ...people,
      }),
    });

    const json = await response.json();

    if (json.id) {
      setSearchSessionId(json.id);
    }
  };

  const handleCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.checked) {
      setActivities((prevState) => [...prevState, ev.target.value]);
    } else {
      setActivities((prevState) =>
        prevState.filter((activity) => activity !== ev.target.value)
      );
    }
  };

  const flights = {
    outgoing: [
      // {
      //   legs: [
      //     {
      //       arrival_time: '2022-09-18T21:15:00+02:00',
      //       carrier: {
      //         logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/WizzAir.png',
      //         name: 'Wizzair',
      //       },
      //       departure: 'SOF',
      //       departure_time: '2022-09-18T20:15:00+03:00',
      //       destination: 'CIA',
      //     },
      //   ],
      //   notes: [],
      //   price: {
      //     amount: 232,
      //     id: 'Kayak|1|15',
      //     impressionId: 'a3087c64-4a40-43a9-8fc4-a4be56636d4d.21985',
      //   },
      //   search_hash: '8ce6e33bac3780af94f8ac895be81d42',
      //   search_id: 'b64d565d-66e7-4754-93d2-1ab7360ae67b.440',
      // },
      {
        legs: [
          {
            arrival_time: '2022-09-18T23:59:00+03:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'SOF',
            departure_time: '2022-09-18T22:25:00+03:00',
            destination: 'CHQ',
          },
          {
            arrival_time: '2022-09-18T23:59:00+03:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'SOF',
            departure_time: '2022-09-18T22:25:00+03:00',
            destination: 'CHQ',
          },
          {
            arrival_time: '2022-09-19T16:55:00+02:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'CHQ',
            departure_time: '2022-09-19T15:40:00+03:00',
            destination: 'CIA',
          },
        ],
        notes: ['Long layover at CHQ for <b>15h 41m</b>'],
        price: {
          amount: 104,
          id: 'Kayak|1|28',
          impressionId: 'a3087c64-4a40-43a9-8fc4-a4be56636d4d.21991',
        },
        search_hash: '8ce6e33bac3780af94f8ac895be81d42',
        search_id: 'b64d565d-66e7-4754-93d2-1ab7360ae67b.440',
      },
      {
        legs: [
          {
            arrival_time: '2022-09-18T18:05:00+03:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'SOF',
            departure_time: '2022-09-18T16:55:00+03:00',
            destination: 'CFU',
          },
          {
            arrival_time: '2022-09-19T13:20:00+02:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'CFU',
            departure_time: '2022-09-19T12:50:00+03:00',
            destination: 'CIA',
          },
        ],
        notes: ['Long layover at CFU for <b>18h 45m</b>'],
        price: {
          amount: 247,
          id: 'Kayak|1|7',
          impressionId: 'a3087c64-4a40-43a9-8fc4-a4be56636d4d.21993',
        },
        search_hash: '8ce6e33bac3780af94f8ac895be81d42',
        search_id: 'b64d565d-66e7-4754-93d2-1ab7360ae67b.440',
      },
    ],
    return: [
      {
        legs: [
          {
            arrival_time: '2022-09-22T00:25:00+03:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/WizzAir.png',
              name: 'Wizzair',
            },
            departure: 'CIA',
            departure_time: '2022-09-21T21:30:00+02:00',
            destination: 'SOF',
          },
        ],
        notes: [],
        price: {
          amount: 51,
          id: 'SkyScanner|1|1',
          impressionId: 'f1f81c94-ac57-4cc7-8e2c-c8701d367211.24336',
        },
        search_hash: 'd474adaa753974cb31af5b2339f85ac0',
        search_id: 'f69c860e-f6d8-4850-8b7b-27e6a5bd0b17.479',
      },
      {
        legs: [
          {
            arrival_time: '2022-09-21T08:50:00+02:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'CIA',
            departure_time: '2022-09-21T06:45:00+02:00',
            destination: 'BVA',
          },
          {
            arrival_time: '2022-09-21T14:05:00+03:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/WizzAir.png',
              name: 'Wizzair',
            },
            departure: 'BVA',
            departure_time: '2022-09-21T10:20:00+02:00',
            destination: 'SOF',
          },
        ],
        notes: ['Layover at BVA for <b>1h 30m</b>'],
        price: {
          amount: 67,
          id: 'SkyScanner|2|4',
          impressionId: 'f1f81c94-ac57-4cc7-8e2c-c8701d367211.24339',
        },
        search_hash: 'd474adaa753974cb31af5b2339f85ac0',
        search_id: 'f69c860e-f6d8-4850-8b7b-27e6a5bd0b17.479',
      },
      {
        legs: [
          {
            arrival_time: '2022-09-21T14:00:00+01:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'CIA',
            departure_time: '2022-09-21T12:25:00+02:00',
            destination: 'STN',
          },
          {
            arrival_time: '2022-09-21T21:35:00+03:00',
            carrier: {
              logo: 'https://static.tacdn.com/img2/flights/airlines/logos/100x100/RyanAir.png',
              name: 'Ryanair',
            },
            departure: 'STN',
            departure_time: '2022-09-21T16:35:00+01:00',
            destination: 'SOF',
          },
        ],
        notes: ['Layover at STN for <b>2h 35m</b>'],
        price: {
          amount: 120,
          id: 'SkyScanner|2|5',
          impressionId: 'f1f81c94-ac57-4cc7-8e2c-c8701d367211.24340',
        },
        search_hash: 'd474adaa753974cb31af5b2339f85ac0',
        search_id: 'f69c860e-f6d8-4850-8b7b-27e6a5bd0b17.479',
      },
    ],
  };

  return (
    <Layout title='Add a Trip'>
      <Form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h4' sx={{ mr: 0.5 }}>
                Information
              </Typography>
              <Typography variant='body2'>(required)</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <DestinationAutocomplete
              onChange={(id: number | null) => setLocation(id)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label='From'
              required
              value={dateRange.from}
              onChange={(newDate) => {
                if (newDate) {
                  setDateRange((prevState) => ({
                    ...prevState,
                    from: format(newDate, 'yyyy-LL-dd'),
                  }));
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label='To'
              required
              value={dateRange.to}
              onChange={(newDate) => {
                if (newDate) {
                  setDateRange((prevState) => ({
                    ...prevState,
                    to: format(newDate, 'yyyy-LL-dd'),
                  }));
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='children'
              value={people.children}
              onChange={(ev) => {
                const value = +ev.target.value;

                if (value >= 0) {
                  setPeople((prevState) => ({
                    ...prevState,
                    children: value,
                  }));
                } else {
                  setPeople((prevState) => ({
                    ...prevState,
                    children: 0,
                  }));
                }
              }}
              type='number'
              name='children'
              label='Children'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              value={people.adults}
              onChange={(ev) => {
                const value = +ev.target.value;

                if (value >= 0) {
                  setPeople((prevState) => ({
                    ...prevState,
                    adults: value,
                  }));
                } else {
                  setPeople((prevState) => ({
                    ...prevState,
                    adults: 0,
                  }));
                }
              }}
              type='number'
              id='adults'
              label='Adults'
              name='adults'
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h4' sx={{ mr: 0.5 }}>
                Activities
              </Typography>
              <Typography variant='body2'>(optional)</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label='Beach'
                  value='beach'
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label='Hiking'
                  value='hiking'
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label='Museums'
                  value='museums'
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label='Nightlife'
                  value='nightlife'
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label='Shopping'
                  value='shopping'
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label='Nature'
                  value='nature'
                />
              </Box>
            </FormGroup>
          </Grid>
        </Grid>
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 5 }}>
          Take Me There
        </Button>
      </Form>
      {searchSessionId && <Flights searchSessionId={searchSessionId} />}
      <>
        <Grid container spacing={2} mt={4} mb={2}>
          <Typography variant='h4'>Outgoing</Typography>
        </Grid>
        <Box sx={{ width: '100%' }}>
          {flights.outgoing.map((flight) => (
            <Box
              key={flight.search_hash}
              sx={{
                cursor: 'pointer',
                padding: { md: 4 },
                '&:hover': {
                  borderRadius: 4,
                  boxShadow:
                    '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
                },
              }}
            >
              <Stepper
                alternativeLabel
                activeStep={3}
                connector={<ColorlibConnector />}
              >
                {flight.legs.map((leg) => (
                  <Step key={leg.departure_time}>
                    <StepLabel
                      StepIconComponent={(props) => (
                        <img
                          style={{
                            height: 50,
                            width: 50,
                            borderRadius: '50%',
                          }}
                          {...props}
                          src={leg.carrier.logo}
                        />
                      )}
                    >
                      <Box>
                        <Typography
                          variant='h5'
                          sx={{ color: Colors.black, fontWeight: 500 }}
                        >
                          {leg.destination} - {leg.departure}
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
                          {format(
                            new Date(leg.departure_time),
                            'MMM dd, yyyy p'
                          )}
                        </Typography>
                        <Typography variant='body2'>Arrive at:</Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: Colors.black, fontWeight: 500 }}
                        >
                          {format(new Date(leg.arrival_time), 'MMM dd, yyyy p')}
                        </Typography>
                      </Box>
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
            </Box>
          ))}
        </Box>
      </>
    </Layout>
  );
};

export default AddTrip;
