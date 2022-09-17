import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';

interface IProps {
  label?: string;
  id?: string;
  name?: string;
}

const PasswordTextField: React.FC<IProps> = ({
  label = 'Password',
  id = 'password',
  name = 'password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  return (
    <TextField
      required
      fullWidth
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      id={id}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextField;
