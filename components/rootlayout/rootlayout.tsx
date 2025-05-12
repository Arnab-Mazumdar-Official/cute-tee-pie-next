'use client';

import React from 'react';
import { useTheme, } from '../../src/context/ThemeContext';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import createAppTheme from '../../src/theme';


export default function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme(); // or `mode` depending on your theme setup

  return (
    <MuiThemeProvider theme={createAppTheme(mode)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
