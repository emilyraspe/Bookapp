import Head from "next/head";
import useSWR from "swr";
import BestSellerBooks from "../components/BestSellerBooks/BestSellerBooks";

export default function Home() {
  const fetcher = async (url) => await fetch(url).then((res) => res.json());
  const API_KEY_bestseller = process.env.NEXT_PUBLIC_API_KEY_bestseller;

  const bestsellerAPI = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY_bestseller}`;
  const { data, error } = useSWR(bestsellerAPI, fetcher);

  const bestSellerBooks = data?.results.books;

  return (
    <>
      <Head>
        <title>Bookapp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Homepage</h1>
        <BestSellerBooks bestSellerBooks={bestSellerBooks} />
      </main>
    </>
  );
}
