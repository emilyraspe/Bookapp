import { useState } from "react";
import useSWR from "swr";
import SearchBooks from "../../components/SearchBooks/SearchBooks";
import Link from "next/link";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Rec() {
  const [aiData, SetAiData] = useState("");
  //get data from claude ai
  async function handleClick(event) {
    event.preventDefault();
    const inputValue = event.target.elements.fav.value;

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

        body: JSON.stringify({ searchInput }),
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

  const { data, error } = useSWR(googleBooksURL, fetcher);

  const book = data?.items[0];

  return (
    <div>
      <h1>Get a book recommendation</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="fav"></input>
        <label>Whats your favourite Book or Author?</label>
        <button type="submit">Submit</button>
      </form>
      {book && (
        <div key={book.id} className="book-container">
          <Link
            href={`/books/${
              book.volumeInfo.industryIdentifiers &&
              book.volumeInfo.industryIdentifiers.length > 0
                ? book.volumeInfo.industryIdentifiers[0]?.identifier
                : "#"
            }`}
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              className="bookimage-small"
            ></img>
          </Link>
          <div>
            <p className="author">{book.volumeInfo.authors}</p>
            <p className="title">{book.volumeInfo.title}</p>

            <p className="textSnippet">
              {book.searchInfo?.textSnippet}{" "}
              <a
                href={`/books/${
                  book.volumeInfo.industryIdentifiers?.[0]?.identifier || "#"
                }`}
                className="readMore"
              >
                [read more]
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
