'use client'

import CustomProvider from '@/redux/CustomProvider'
import store from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StyledEngineProvider, ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from '@/theme';
import { useState } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <CustomProvider store={store}>
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
              {/* <CssBaseline /> */}
              <AuthProvider>
              {children}
              </AuthProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </CustomProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}