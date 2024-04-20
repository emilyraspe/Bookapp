import Head from "next/head";
import useSWR from "swr";
import BestSellerBooks from "../components/BestSellerBooks/BestSellerBooks";
import Header from "../components/Header/Header";

async function fetcher(...args) {
  try {
    const res = await fetch(...args);
    if (res.status === 200) {
      return res.json();
    }
    const error = new Error(`Request rejected with status ${res.status}`);
    error.response = res;
    throw error;
  } catch (error) {
    const { response } = error;
    return response ? response.status : 400;
  }
}

export default function Home() {
  const API_KEY_bestseller = process.env.NEXT_PUBLIC_API_KEY_bestseller;

  const bestsellerAPI = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY_bestseller}`;
  const { data, error } = useSWR(bestsellerAPI, fetcher);

  if (!data && !error) {
    // loading
    return <div>Loading...</div>;
  }

  if (error && error === 429) {
    setErrorMessage("Please wait two minutes and refresh the page");
    return <div>{errorMessage}</div>;
  }

  const bestSellerBooks = data?.results?.books;

  return (
    <>
      <Head>
        <title>Bookapp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Discover your next favorite book</h1>
        <BestSellerBooks bestSellerBooks={bestSellerBooks} />
      </main>
    </>
  );
}
