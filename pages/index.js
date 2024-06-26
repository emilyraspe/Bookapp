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
  const genres = ["hardcover-nonfiction", "hardcover-fiction"];
  const genre = "hardcover-nonfiction";

  const bestsellerAPI1 = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${API_KEY_bestseller}`;

  const { data, error } = useSWR(bestsellerAPI1, fetcher);

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
        <title>PageTurner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className="pageturner">PageTurner</h1>
      <p>
        Are you tired of losing track of the books you've read, forgetting
        titles you want to explore, or struggling to discover your next literary
        adventure? Look no further! <br />
        PageTurner is designed to streamline your reading experience, whether
        you're a seasoned bookworm or just dipping your toes into the vast world
        of literature. Explore personalized recommendations based on your
        interests and discover your next favourite Book.{" "}
      </p>
      <div className="content">
        <BestSellerBooks bestSellerBooks={bestSellerBooks} />
      </div>
      <div className="cta-recommentations">
        <h2>Don't know what to read next?</h2>

        <a href="/recommendations">
          <button className="cta-recommentations-button">
            Book recommendation
          </button>
        </a>
      </div>
    </>
  );
}
