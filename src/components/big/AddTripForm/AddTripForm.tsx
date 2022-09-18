import { Collapse } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid/Grid';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../theme/theme';
import { Form } from '../../pages/Register/Register.styled';
import DatePicker from '../../small/DatePicker/DatePicker';
import DestinationAutocomplete, {
  ILocation,
} from '../../small/DestinationAutocomplete/DestinationAutocomplete';

const AddTripForm = ({
  onSubmitCallback: setSearchSessionId,
  onRemoveFlightUrls,
  onSetBookingSubUrl,
}: {
  onSubmitCallback: (id: null | number) => void;
  onRemoveFlightUrls: () => void;
  onSetBookingSubUrl: (string: string) => void;
}) => {
  const { auth } = useAuth();

  const [isFormOpened, setIsFormOpened] = useState(true);
  const [people, setPeople] = useState({
    children: 0,
    adults: 0,
  });
  const [dateRange, setDateRange] = useState<{
    from: string | null;
    to: string | null;
  }>({ from: null, to: null });
  const [activities, setActivities] = useState<string[]>([]);
  const [location, setLocation] = useState<null | ILocation>(null);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setSearchSessionId(null);

    const response = await fetch(`${apiEndpoint}/search_sessions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${auth?.token}`,
      },
      body: JSON.stringify({
        location_id: location?.id,
        activities: activities,
        start_date: dateRange.from,
        end_date: dateRange.to,
        ...people,
      }),
    });

    const json = await response.json();

    if (json.id) {
      setSearchSessionId(json.id);
      onSetBookingSubUrl(
        `start_date=${dateRange.from}&end_date=${dateRange.to}&adults=${people.adults}&children=${people.children}`
      );
    }

    setIsFormOpened(false);
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

  if (!isFormOpened) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        sx={{
          cursor: 'pointer',
          margin: 'auto',
          width: { sx: '100%', md: '50%' },
          border: '1px dotted',
          borderRadius: 4,
          pt: 3,
          pb: 3,
        }}
        onClick={() => {
          setIsFormOpened(true);
          setSearchSessionId(null);
          setActivities([]);
          setDateRange({ from: null, to: null });
          setPeople({
            children: 0,
            adults: 0,
          });
          setLocation(null);
          onRemoveFlightUrls();
        }}
      >
        <Typography variant='h5' sx={{ color: Colors.gray2 }}>
          Click to edit the search:
        </Typography>

        <Typography
          variant='body2'
          sx={{
            color: Colors.black,
            fontSize: 16,
            fontWeight: 500,
            textDecoration: 'underline',
          }}
        >
          {location?.name}, {location?.country}
        </Typography>
        {dateRange.from && dateRange.to && (
          <Typography
            variant='body2'
            sx={{ color: Colors.black, fontSize: 16 }}
          >
            {format(new Date(dateRange.from), 'MMM dd, yyyy')} -{' '}
            {format(new Date(dateRange.to), 'MMM dd, yyyy')}
          </Typography>
        )}
        <Typography variant='caption' sx={{ color: Colors.gray2 }}>
          {people?.children} children, {people?.adults} adults
        </Typography>
        <Typography variant='caption' sx={{ color: Colors.gray2 }}>
          {activities.join(', ')}
        </Typography>
      </Box>
    );
  }

  return (
    <Collapse in={isFormOpened}>
      <Form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mr: 0.5 }}>
                Information
              </Typography>
              <Typography variant='body2'>(required)</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <DestinationAutocomplete
              onChange={(location: ILocation | null) => setLocation(location)}
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mr: 0.5 }}>
                Activities
              </Typography>
              <Typography variant='body2'>(select at least 1)</Typography>
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
                  control={
                    <Checkbox
                      color='secondary'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Beach'
                  value='beach'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Hiking'
                  value='hiking'
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Museums'
                  value='museums'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Nightlife'
                  value='nightlife'
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Shopping'
                  value='shopping'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Nature'
                  value='nature'
                />
              </Box>
            </FormGroup>
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 5 }}
          disabled={
            (people.adults === 0 && people.children === 0) ||
            dateRange.from === null ||
            dateRange.to === null ||
            location === null ||
            activities.length === 0
          }
        >
          Take Me There
        </Button>
      </Form>
    </Collapse>
  );
};

export default AddTripForm;
