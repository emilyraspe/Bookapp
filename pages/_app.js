import Layout from "../components/Layout/Layout";
import useSWR from "swr";
import { useState } from "react";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [input, setInput] = useState();

  function handleInputChange(query) {
    setInput(query);
  }
  console.log(input);
  const yourAPIKey = process.env.yourAPIKey;

  const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?${input}=${yourAPIKey}`;

  const { data } = useSWR(googleBooksURL, fetcher);
  console.log(data);
  return (
    <>
      <Layout>
        <Component {...pageProps} handleInputChange={handleInputChange} />
      </Layout>
    </>
  );
}
