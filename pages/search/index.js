import Searchbar from "../../components/Searchbar/Searchbar";
import Books from "../../components/Books/Books";
import SearchFetch from "../../components/SearchFetch/SearchFetch";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Search() {
  const [input, setInput] = useState();
  console.log(input);

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
      <h1>search</h1>
      <Searchbar handleInputChange={handleInputChange} />
      <Books books={books} />
    </>
  );
}
