import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { PostHogProvider } from 'posthog-js/react';

import App from './App';
import { defaultValue } from './StaticContext';
import StaticContextProvider from './StaticContextProvider';

const staticContext = { ...defaultValue, ...window.STATIC_CONTEXT };

const posthogOptions = {
  cookieless_mode: 'always',
  api_host: staticContext.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
};

const head = createHead();

const container = document.getElementById('root');
const app = (
  <StaticContextProvider value={staticContext}>
    <UnheadProvider head={head}>
      <PostHogProvider apiKey={staticContext.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostHogProvider>
    </UnheadProvider>
  </StaticContextProvider>
);
if (import.meta.env.NODE_ENV === 'production') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(<React.StrictMode>{app}</React.StrictMode>);
}
