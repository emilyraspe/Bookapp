import AddToBookshelfForm from "../AddToBookshelfForm/AddToBookshelfForm";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

export default function BookDetails({
  name,
  authors,
  categories,
  image,
  published,
  description,
  publisher,
  bookdata,
}) {
  const { data: session } = useSession();
  const {
    data: readBooks,
    error: readBooksError,
    mutate,
  } = useSWR(`/api/readBooks/`);

  const now = new Date();
  const dateTime = now.toLocaleString();

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

  console.log("readbooks from database", readBooks);
  const currentUSER = readBooks?.find(
    (obj) => obj.userId === session?.user.userId
  );

  const bookForDate = currentUSER?.books.find(
    (book) => book.id === bookdata.items[0].id
  );

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} height={350} alt={name} />
      <h4>Author: {authors}</h4>
      <p>Published: {published}</p>
      <p>Publisher: {publisher}</p>
      <p>{description}</p>
      {categories.map((category, index) => (
        <div key={index}>{category}</div>
      ))}

      {session ? (
        <>
          <button onClick={addToReadBooks} disabled={isBookFound()}>
            {isBookFound() ? "Already Read" : "Mark as read"}
          </button>
          <p>
            {isBookFound() ? `"Was marked as read on ${bookForDate?.date}` : ""}
          </p>
        </>
      ) : (
        ""
      )}

      <AddToBookshelfForm bookdata={bookdata} />
    </div>
  );
}
