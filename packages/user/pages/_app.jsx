import {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App({Component, pageProps}) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}