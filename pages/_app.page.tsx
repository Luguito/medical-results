import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
