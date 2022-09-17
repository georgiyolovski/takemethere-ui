import { SnackbarOrigin } from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react';
import Snackbar from '../components/small/Snackbar/Snackbar';

export interface SnackbarState {
  message: string;
  title?: string;
  color?: string;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  children?: JSX.Element | JSX.Element[];
  onClose?: () => void;
}

export interface SnackbarContextValue {
  snackbar: SnackbarState | null;
  showSnackbar: (snackbar: SnackbarState) => void;
  hideSnackbar: () => void;
}

export const DEFAULT_SNACKBAR_CONTEXT: SnackbarContextValue = {
  snackbar: null,
  showSnackbar: () => {},
  hideSnackbar: () => {},
};

export const SnackbarContext = createContext(DEFAULT_SNACKBAR_CONTEXT);

export const useSnackbar = () => useContext(SnackbarContext);

export interface SnackbarProviderProps {
  children: JSX.Element | JSX.Element[];
  value?: SnackbarState | null;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  value,
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(value || null);

  const showSnackbar = useCallback((data: SnackbarState) => {
    setSnackbar(data);
  }, []);

  const hideSnackbar = useCallback(() => setSnackbar(null), []);

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
