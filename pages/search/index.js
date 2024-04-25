import Searchbar from "../../components/Searchbar/Searchbar";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import SearchBooks from "../../components/SearchBooks/SearchBooks";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Search() {
  const [input, setInput] = useState();
  console.log(input);

  function handleInputChange(query) {
    setInput(query);
  }

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const searchQuery = input ? `q=${input}` : "";
  const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?${searchQuery}&maxResults=5&key=${API_KEY}`;

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
      <h1>Search</h1>
      <Searchbar handleInputChange={handleInputChange} />
      <div className="books-container">
        <SearchBooks books={books} />
      </div>
    </>
  );
}
