import { useState } from "react";
import useSWR from "swr";
import Recommendations from "../../components/Recommendations/Recommendations";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Rec() {
  const [aiData, SetAiData] = useState("");
  // data from claude ai
  async function handleClick(event) {
    event.preventDefault();
    const inputValue = event.target.elements.fav.value;
    const selectedGenre = event.target.elements.genre.value;

    const searchInput = inputValue.trim();

    if (!searchInput) {
      console.error("Input value is empty");
      return;
    }

    try {
      const response = await fetch(`/api/ai/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ searchInput, genre: selectedGenre }),
      });
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      SetAiData(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("SearchInput", searchInput);
    event.target.reset();
  }
  console.log("===", aiData[0]?.text);
  const bookFromAI = aiData[0]?.text;

  //fetch book from googlebooks api

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?q=${bookFromAI}&maxResults=1&key=${API_KEY}`;

  const { data, error, isLoading } = useSWR(googleBooksURL, fetcher);

  const book = data?.items[0];

  return (
    <div>
      <h1>Get a book recommendation</h1>
      <form onSubmit={handleClick} className="recommendation-form">
        <label>
          Describe the type of book you enjoy reading. This could include
          mentioning your favorite author or book, or discussing the topics that
          capture your interest.
        </label>
        <textarea type="text" name="fav" rows="4" cols="50"></textarea>

        <fieldset>
          <legend>Select a genre</legend>

          <div>
            <input
              type="radio"
              id="fiction"
              name="genre"
              value="fiction"
              className="genre"
            />

            <label htmlFor="fiction">Fiction</label>
          </div>
          <div>
            <input
              type="radio"
              id="non-fiction"
              name="genre"
              value="non-fiction"
            />
            <label htmlFor="non-fiction">Non-Fiction</label>
          </div>
          <div>
            <input
              type="radio"
              id="science-fiction"
              name="genre"
              value="science-fiction"
            />
            <label htmlFor="science-fiction">Science-Fiction</label>
          </div>
          <div>
            <input type="radio" id="horror" name="genre" value="horror" />
            <label htmlFor="horror">Horror</label>
          </div>
          <div>
            <input type="radio" id="fantasy" name="genre" value="fantasy" />
            <label htmlFor="fantasy">Fantasy</label>
          </div>
          <div>
            <input type="radio" id="romance" name="genre" value="romance" />
            <label htmlFor="romance">Romance</label>
          </div>
          <div>
            <input type="radio" id="thriller" name="genre" value="thriller" />
            <label htmlFor="thriller">Thriller</label>
          </div>
          <div>
            <input type="radio" id="classics" name="genre" value="classics" />
            <label htmlFor="classics">Classics</label>
          </div>
          <div>
            <input type="radio" id="noGenre" name="genre" value="noGenre" />
            <label htmlFor="noGenre">No genre</label>
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        bookFromAI && <Recommendations book={book} />
      )}
    </div>
  );
}
