import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const options = [
  'Edit',
  'Send on Email',
  'Copy Link',
];

const ITEM_HEIGHT = 48;

export default function Dropdpown({icon}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
      <img src={icon} alt="dots" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorOrigin={{
          vertical: 'bottom', // Aligns menu to the bottom
          horizontal: 'right', // Aligns menu to the right
        }}
        transformOrigin={{
          vertical: 'top', // Aligns menu to the top
          horizontal: 'right', // Aligns menu to the right
        }}
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        style={{ marginTop: '-15px' }} // Add margin from top
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: '175px',
            borderRadius : '8px',
           
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose} className='text-[14px] font-medium leading-5 py-[9px]'>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}