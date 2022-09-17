import SearchIcon from '@mui/icons-material/Search';
import MuiAutocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from 'lodash';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';

interface IOption {
  country: string;
  id: number;
  name: string;
}

const DestinationAutocomplete = ({
  onChange,
}: {
  onChange: (id: number | null) => void;
}) => {
  const { auth } = useAuth();

  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const performSearch = (value: string) => {
    setLoading(true);

    fetch(`${apiEndpoint}/locations?name=${value}`, {
      headers: {
        Authorization: `${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MuiAutocomplete
      fullWidth
      openOnFocus
      freeSolo
      clearOnEscape
      options={options}
      inputValue={inputValue}
      onInputChange={(_, value, reason) => {
        setInputValue(value);
        if (reason === 'input' && value.length > 3) {
          setOptions([]);
          onChange(null);

          debounce(performSearch, 300)(value);
        } else if (value.length === 0) {
          setOptions([]);
          onChange(null);
        }
      }}
      onChange={(_, option) => {
        if (typeof option === 'string' || !option?.id) {
          onChange(null);
        } else {
          onChange(option.id);
        }
      }}
      renderOption={(props, option) => (
        <Typography
          variant='body2'
          key={`${option.name}-${option.country}`}
          {...props}
        >
          {option.name}, {option.country}
        </Typography>
      )}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return '';
        } else {
          return `${option.name}, ${option.country}`;
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label='Destination'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: loading ? (
              <CircularProgress color='primary' size={20} />
            ) : (
              params.InputProps.endAdornment
            ),
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'no',
          }}
        />
      )}
    />
  );
};
export default DestinationAutocomplete;
