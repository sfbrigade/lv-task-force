import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import '@mantine/core/styles.css';
import { AppShell, Container, Loader, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHead } from '@unhead/react';

import './App.css';

import AuthContextProvider from './AuthContextProvider';
import { useStaticContext } from './StaticContext';
import AppRedirects from './AppRedirects';
import { AppTheme, AppCSSVariablesResolver } from './AppTheme';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import InvitesRoutes from './Invites/InvitesRoutes';
import PasswordsRoutes from './Passwords/PasswordsRoutes';
import Register from './Register';
import Search from './Search';
import UsersRoutes from './Users/UsersRoutes';
import Footer from './Footer';
import Privacy from './Privacy';
import Disclaimer from './Disclaimer';

const AdminRoutes = lazy(() => import('./Admin/AdminRoutes'));

const queryClient = new QueryClient();

function App () {
  const [opened, { close, toggle }] = useDisclosure();
  const staticContext = useStaticContext();
  useHead({
    titleTemplate: `%s - ${staticContext?.env?.VITE_SITE_TITLE ?? ''}`
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={AppTheme} cssVariablesResolver={AppCSSVariablesResolver}>
        <ModalsProvider>
          <AuthContextProvider>
            <AppShell
              header={{ height: 60 }}
              navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
              padding='md'
            >
              <AppShell.Header>
                <Header opened={opened} close={close} toggle={toggle} />
              </AppShell.Header>
              <AppShell.Navbar />
              <AppShell.Main p='3.75rem 0 2.25rem' mih='calc(100dvh - 12.875rem)'>
                <Routes>
                  <Route
                    path='*'
                    element={
                      <AppRedirects>
                        <Routes>
                          <Route path='/' element={<Home />} />
                          <Route path='/search' element={<Search />} />
                          <Route path='/privacy' element={<Privacy />} />
                          <Route path='/disclaimer' element={<Disclaimer />} />
                          <Route path='/login' element={<Login />} />
                          <Route path='/passwords/*' element={<PasswordsRoutes />} />
                          <Route path='/invites/*' element={<InvitesRoutes />} />
                          {staticContext?.env?.VITE_FEATURE_REGISTRATION === 'true' && <Route path='/register' element={<Register />} />}
                          <Route path='/account/*' element={<UsersRoutes />} />
                          <Route
                            path='/admin/*' element={
                              <Suspense fallback={<Container ta='center'><Loader /></Container>}>
                                <AdminRoutes />
                              </Suspense>
                            }
                          />
                        </Routes>
                      </AppRedirects>
                    }
                  />
                </Routes>
              </AppShell.Main>
              <AppShell.Footer pos='relative' h='12.875rem' bd='none' bg='var(--mantine-color-light-background)'>
                <Footer />
              </AppShell.Footer>
            </AppShell>
          </AuthContextProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
