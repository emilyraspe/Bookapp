import Link from "next/link";
import { useRouter } from "next/router.js";

import useSWR from "swr";
import BookshelfBooks from "../BookshelfBooks/BookshelfBooks";

export default function Bookshelf({ selectedBookshelf }) {
  const { mutate } = useSWR(`/api/bookshelves/`);
  const router = useRouter();
  const books = selectedBookshelf?.books;
  console.log(books);

  async function deleteBookshelf() {
    const response = await fetch(`/api/bookshelves/`, {
      method: "DELETE",
      body: selectedBookshelf._id,
    });
    if (response.ok) {
      router.push("/profile");
      mutate();
    }
  }

  //delete book out of bookshelf
  async function handleDelete(bookId) {
    try {
      const response = await fetch(
        `/api/bookshelves/${selectedBookshelf?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookId),
        }
      );

      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <>
      <div className="bookshelf-header">
        <h1>{selectedBookshelf?.name}</h1>
        <p className="tagline small-text">
          Created: {selectedBookshelf?.created}
        </p>
        <div className="bookshelf-button-container">
          <Link href="/profile">
            <button>Back</button>
          </Link>
          <button onClick={deleteBookshelf}>Delete Bookshelf</button>
        </div>
      </div>
      <BookshelfBooks books={books} handleDelete={handleDelete} />
      {/* <div className="books-container">
        {books?.map((book) =>
          book.items.map((obj) => (
            <div className="book-container">
              <Link
                href={`/books/${obj.volumeInfo.industryIdentifiers[0].identifier}`}
              >
                <img
                  src={obj.volumeInfo.imageLinks?.thumbnail}
                  className="bookimage-small"
                ></img>
              </Link>
              <div>
                <p key={obj.id} className="title">
                  {obj.volumeInfo.title}
                </p>
                <p className="author">{obj.volumeInfo.authors}</p>
                <p className="small-text">
                  {obj.searchInfo.textSnippet}{" "}
                  <a
                    href={`/books/${obj.volumeInfo.industryIdentifiers[0].identifier}`}
                    className="small-text"
                  >
                    [read more]
                  </a>
                </p>
                <button
                  onClick={() => handleDelete(obj.id)}
                  className="button-bookdelete"
                >
                  X
                </button>
              </div>
            </div>
          ))
        )}
      </div> */}
    </>
  );
}
