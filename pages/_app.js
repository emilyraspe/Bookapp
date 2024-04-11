import Layout from "../components/Layout/Layout";
import useSWR from "swr";
import { useState } from "react";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [input, setInput] = useState();

  function handleInputChange(query) {
    setInput(query);
  }

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=5&key=${API_KEY}`;

  const { data } = useSWR(googleBooksURL, fetcher);

  if (!data) {
    return;
  }
  const books = data.items;
  console.log("books", data.items);

  return (
    <>
      <Layout>
        <Component
          {...pageProps}
          handleInputChange={handleInputChange}
          books={books}
        />
      </Layout>
    </>
  );
}
