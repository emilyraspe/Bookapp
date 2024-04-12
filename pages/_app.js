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
  const searchQuery = input ? `q=${input}` : "";
  const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?${searchQuery}&maxResults=5&key=${API_KEY}`;

  const { data, error } = useSWR(googleBooksURL, fetcher);
  console.log("data===========", data);

  if (error) {
    return <p>Error loading books. Please try again later.</p>;
  }

  if (!data) {
    return <p>Search for a book</p>;
  }
  const books = data.items;
  console.log(books);

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
