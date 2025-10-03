import ReactDOMServer from 'react-dom/server';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { StaticRouter } from 'react-router';
import { createHead, UnheadProvider, renderSSRHead } from '@unhead/react/server';
import { PostHogProvider } from 'posthog-js/react';

import { defaultValue } from './StaticContext';
import StaticContextProvider from './StaticContextProvider';
import { handleRedirects } from './AppRedirectsConfig';
import App from './App';

import translation from '../../locales/en/translation.json';

export async function render (request, reply, staticContext) {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation
        }
      }
    });

  const { url: location } = request;
  const path = request.urlData('path');
  const isRedirected = handleRedirects(request, location, path, (to, state) => {
    if (state) {
      reply.redirect(`${to}?${new URLSearchParams({ from: location }).toString()}`);
    } else {
      reply.redirect(to);
    }
    return true;
  });
  if (isRedirected) return undefined;
  staticContext.context = {
    ...defaultValue,
    ...staticContext.context,
    env: { ...defaultValue.env, ...staticContext.context.env },
    authContext: { user: request.user?.toJSON() ?? null },
  };

  const posthogOptions = {
    cookieless_mode: 'always',
    api_host: staticContext.context.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-05-24',
  };

  const head = createHead();
  const html = ReactDOMServer.renderToString(
    <StaticContextProvider value={staticContext.context}>
      <UnheadProvider value={head}>
        <PostHogProvider apiKey={staticContext.context.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
          <StaticRouter location={location}>
            <App />
          </StaticRouter>
        </PostHogProvider>
      </UnheadProvider>
    </StaticContextProvider>
  );
  return { head: await renderSSRHead(head), html };
}
