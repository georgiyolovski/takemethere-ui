import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid/Grid';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import Flights from '../../big/Flights/Flights';
import Layout from '../../big/Layout/Layout';
import DatePicker from '../../small/DatePicker/DatePicker';
import DestinationAutocomplete from '../../small/DestinationAutocomplete/DestinationAutocomplete';
import { Form } from '../Register/Register.styled';

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
    </Layout>
  );
};

export default AddTrip;
