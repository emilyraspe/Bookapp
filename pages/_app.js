import Layout from "../components/Layout/Layout";
import useSWR from "swr";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header/Header";
import { SWRConfig } from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps, session }) {
  const [input, setInput] = useState();

  function handleInputChange(query) {
    setInput(query);
  }

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const searchQuery = input ? `q=${input}` : "";
  const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?${searchQuery}&maxResults=15&key=${API_KEY}`;

  const { data, error } = useSWR(googleBooksURL, fetcher);

  if (error) {
    return <p>Error loading books. Please try again later.</p>;
  }

  if (!data) {
    return <p>Search for a book</p>;
  }
  const books = data.items;

  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <SessionProvider session={session}>
          <Header />
          <Layout>
            <Component
              {...pageProps}
              handleInputChange={handleInputChange}
              books={books}
            />
          </Layout>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
