import { SessionProvider } from 'next-auth/react'; // Correct import
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>  {/* Replaced Provider with SessionProvider */}
      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nextProvider>
    </SessionProvider>
  );
}
