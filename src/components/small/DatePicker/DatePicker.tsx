import { PaperProps } from '@mui/material/Paper';
import { PopperProps } from '@mui/material/Popper';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import format from 'date-fns/format';
import React from 'react';
import styled from '../../../theme/styled';
import { Colors } from '../../../theme/theme';

const VALID_FORMATTED_DATE = 'May 01, 1900';
export const VALID_FORMATTED_DATE_LENGTH = VALID_FORMATTED_DATE.length;

type TextFieldProps = MuiTextFieldProps & {
  fontSize?: number;
};

const TextField = styled(
  (props: TextFieldProps) => <MuiTextField {...props} />,
  {
    shouldForwardProp: (prop) => prop !== 'fontSize',
  }
)(({ fontSize }) => ({
  width: '100%',
  '& .MuiOutlinedInput-input': {
    fontSize: fontSize || 16,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderWidth: '1px',
  },
  '& .MuiInputLabel-root': {
    fontSize: fontSize || 16,
  },
}));

export const DEFAULT_DATEPICKER_STYLES = {
  '& .MuiTypography-root': {
    fontSize: 16,
  },
  '& .MuiPickersDay-root': {
    borderRadius: '50%',
    fontSize: 16,
    fontFamily: 'Atma',
  },
  '& .PrivatePickersFadeTransitionGroup-root': {
    fontFamily: 'Atma',
  },
  '& .PrivatePickersYear-root > .Mui-selected': {
    fontFamily: 'Atma',
  },
  '& .MuiPickersDay-dayOutsideMonth': {
    color: 'rgba(0, 0, 0, 0.1)!important',
  },
  '& .MuiPickersDay-root:hover': {
    backgroundColor: Colors.green1,
  },
  '& .MuiPickersDay-today': {
    borderColor: `${Colors.green1}!important`,
  },
  '& .Mui-selected': {
    backgroundColor: `${Colors.green2}!important`,
    color: `${Colors.green1}!important`,
    border: `1px solid ${Colors.green1}!important`,
  },
};

export const formatDate = (dateString: string | Date, formatString: string) => {
  try {
    return format(new Date(dateString), formatString);
  } catch (e) {
    return 'unknown';
  }
};

export interface DatePickerProps {
  label: string;
  value: Date | string | null;
  disableFuture?: boolean;
  required?: boolean;
  textFieldProps?: TextFieldProps;
  minDate?: Date;
  maxDate?: Date;
  popperProps?: Partial<PopperProps>;
  paperProps?: Partial<PaperProps>;
  onChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  disableFuture = false,
  required,
  textFieldProps,
  popperProps,
  paperProps,
  minDate,
  maxDate,
  onChange,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        value={value}
        disableFuture={disableFuture}
        minDate={minDate}
        maxDate={maxDate}
        label={label}
        openTo='day'
        inputFormat='MMM dd, yyyy'
        views={['year', 'month', 'day']}
        onChange={onChange}
        showDaysOutsideCurrentMonth
        orientation='portrait'
        renderInput={(params) => (
          <TextField {...params} {...textFieldProps} required={required} />
        )}
        PopperProps={{
          placement: 'bottom',
          ...popperProps,
        }}
        PaperProps={{
          sx: DEFAULT_DATEPICKER_STYLES,
          ...paperProps,
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
