import {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/Header';

export default function App({Component, pageProps}) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  );
}
