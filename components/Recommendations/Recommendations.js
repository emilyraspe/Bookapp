import useSWR from "swr";
import Books from "../Books/Books";
import { useState } from "react";

export default function Recommendations() {
  //Google Books API
  /* function handleSubmit(event) {
    event.preventDefault();
    const searchInput = event.target.search.value;
    handleInputChange(searchInput);
  }

  function handleInputChange(query) {
    setInput(query);
  }

  const searchQuery = input ? `q=${input}` : "";

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: favouriteBookData, error: error } = useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchQuery
    )}&maxResults=1&key=${API_KEY}`,
    fetcher
  );

  const publisher = favouriteBookData?.items?.[0]?.volumeInfo?.publisher;
  const author = favouriteBookData?.items?.[0]?.volumeInfo?.authors[0];
  const genre = favouriteBookData?.items?.[0]?.volumeInfo?.categories;

  const { data: recommendationsData, error: recommendationsError } = useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      author
    )}&maxResults=6&key=${API_KEY}`,
    fetcher
  );

  const recommendations = recommendationsData?.items;

  return (
    <>
      <h2>Book Recommendations</h2>
      <form  onSubmit={handleSubmit} >
        <div className="search-container">
          <input type="text" name="search" className="search-input"></input>
          <button type="submit">Search</button>
        </div>
        <label>
          Please type in your favourite book or author to get recommendations
          <br />
        </label>

        <input type="radio" id="fiction" name="fav_language" value="HTML" />
        <label for="fiction">Fiction</label>

        <input
          type="radio"
          id="science-fiction"
          name="fav_language"
          value="HTML"
        />
        <label for="science-fiction">Science-Fiction</label>
      </form>
      <Books  books={recommendations}  />
    </>
  );*/
}
