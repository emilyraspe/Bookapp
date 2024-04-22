import AddToBookshelfForm from "../AddToBookshelfForm/AddToBookshelfForm";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import RemoveFromRead from "../RemoveFromRead/RemoveFromRead";
import Books from "../Books/Books";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function BookDetails({
  name,
  authors,
  categories,
  image,
  published,
  description,
  publisher,
  bookdata,
  textSnippet,
  pageCount,
}) {
  const { data: session } = useSession();
  const {
    data: readBooks,
    error: readBooksError,
    mutate,
  } = useSWR(`/api/readBooks/`);

  const now = new Date();
  const dateTime = now.toLocaleDateString();

  const bookWithDate = {
    ...bookdata.items[0],
    date: dateTime,
  };

  async function addToReadBooks(event) {
    event.preventDefault();

    if (readBooksError) {
      console.error("Error fetching read books data");
      return;
    }

    if (session) {
      //find bookarray of current user
      const readBooksOfUser = readBooks.find(
        (obj) => obj.userId === session.user.userId
      );

      if (readBooksOfUser) {
        //find current book in array
        //bookdata coming from google api
        const currentBook = readBooksOfUser.books.find(
          (book) => book.id === bookdata.items[0].id
        );

        if (!currentBook) {
          const response = await fetch(`/api/readBooks/`, {
            method: "PUT",
            body: JSON.stringify({
              book: bookWithDate,
              userId: session.user.userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();

          mutate();
        }
      }
    }
  }

  //diable button if books is already in array - returns true or false

  const isBookFound = () => {
    if (!session || !readBooks) {
      return false;
    }

    return readBooks.some(
      (obj) =>
        obj.userId === session.user.userId &&
        obj.books.some((book) => book.id === bookdata.items[0].id)
    );
  };

  //stuff for date that book was added
  const currentUSER = readBooks?.find(
    (obj) => obj.userId === session?.user.userId
  );

  const bookForDate = currentUSER?.books.find(
    (book) => book.id === bookdata.items[0].id
  );

  //author fetch
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const authorURL = `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${authors}"&maxResults=4&key=${API_KEY}`;
  const { data: authorData, error } = useSWR(authorURL, fetcher);
  console.log("authorData", authorData);

  return (
    <div className="details-container">
      <h1 className="details-title">{name}</h1>

      <div className="details-info">
        <img src={image} height={200} alt={name} className="details-img" />

        <div>
          <p className="tagline">Author: {authors}</p>
          <p className="tagline">Publisher: {publisher}</p>
          <p className="tagline">Pages: {pageCount}</p>
          {categories?.map((category, index) => (
            <span key={index} className="details-genre">
              {category}
            </span>
          ))}
        </div>
      </div>

      <h3>Description</h3>
      <p className="details-description">{description}</p>

      {/* <div className="quote-container">
        <p className="quote">"{textSnippet}"</p>
      </div> */}

      {session ? (
        <div className="details-read">
          <p>
            {isBookFound() ? (
              <p>
                {" "}
                <strong>{name}</strong> was marked read on {bookForDate?.date}
              </p>
            ) : (
              ""
            )}
          </p>
          {isBookFound() ? (
            <RemoveFromRead bookdata={bookdata} />
          ) : (
            <button onClick={addToReadBooks} /* disabled={isBookFound()} */>
              {" "}
              Mark as read
            </button>
          )}
        </div>
      ) : (
        ""
      )}

      <AddToBookshelfForm bookdata={bookdata} />
      <div className="moreFromAuthor">
        <h3>Books from {authors}</h3>
        <div className="details-more-containter">
          <Books books={authorData?.items} />
        </div>
      </div>
    </div>
  );
}
