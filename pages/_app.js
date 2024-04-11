import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Layout />
    </>
  );
}
