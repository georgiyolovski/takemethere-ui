import MuiCloseIcon from '@mui/icons-material/Close';
import MuiIconButton from '@mui/material/IconButton';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiTypography from '@mui/material/Typography';
import React from 'react';
import { useSnackbar } from '../../../context/SnackbarContext';
import styled from '../../../theme/styled';
import { Colors } from '../../../theme/theme';

export const CustomSnackbar = styled(MuiSnackbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: 390,
  },
}));

export const Container = styled('div', {
  shouldForwardProp: (prop: string) => prop !== 'color',
})(({ color }) => ({
  width: 390,
  backgroundColor: color || Colors.white,
  border: `2px solid ${Colors.white}`,
}));

export const CloseIcon = styled(MuiCloseIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const IconButton = styled(MuiIconButton)({
  position: 'absolute',
  right: 0,
});

export const Typography = styled(MuiTypography)(() => ({
  color: Colors.white,
  textAlign: 'center',
})) as typeof MuiTypography;

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  marginTop: theme.spacing(2.5),
})) as typeof Typography;

export const TitleContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
});

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3.75, 3.75, 3.75),
}));

const Snackbar: React.FC = () => {
  const { snackbar, hideSnackbar } = useSnackbar();

  if (!snackbar) return null;

  return (
    <CustomSnackbar
      open
      autoHideDuration={snackbar?.autoHideDuration || 4500}
      onClose={hideSnackbar}
      anchorOrigin={
        snackbar?.anchorOrigin || {
          horizontal: 'center',
          vertical: 'top',
        }
      }
    >
      <Container color={snackbar?.color}>
        <TitleContainer>
          <Title variant='body2'>{snackbar?.title || ''}</Title>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={hideSnackbar}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
        </TitleContainer>
        <ContentContainer>
          <Typography variant='body2'>{snackbar.message}</Typography>
          <>{snackbar?.children}</>
        </ContentContainer>
      </Container>
    </CustomSnackbar>
  );
};

export default Snackbar;
