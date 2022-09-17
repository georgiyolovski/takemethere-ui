import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Button, Menu } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

interface IProps {
  buttonLabel: string;
  avatarSrc?: string;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<IProps> = ({
  buttonLabel,
  avatarSrc,
  children,
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button
        aria-expanded={open ? 'true' : undefined}
        variant='text'
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {avatarSrc && (
          <Avatar
            src={avatarSrc}
            sx={{ marginRight: 1, width: 30, height: 30, borderRadius: '50%' }}
          />
        )}
        {buttonLabel}
      </Button>
      <Menu
        elevation={0}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {React.Children.toArray(children).map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
