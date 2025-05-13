'use client';

import { useTheme } from '../../src/context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/NightsStay';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: mode === 'light' ? 'white' : 'white',
      }}
    >
      <Typography variant="body2">
        {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
      </Typography>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'light' ?<LightModeIcon />:<DarkModeIcon />}
      </IconButton>
    </Box>
  );
}
