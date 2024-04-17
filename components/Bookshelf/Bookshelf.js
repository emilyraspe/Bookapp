import Link from "next/link";
import { useRouter } from "next/router.js";

import useSWR from "swr";

export default function Bookshelf({ selectedBookshelf }) {
  const { mutate } = useSWR(`/api/bookshelves/`);
  const books = selectedBookshelf?.books;

  async function handleDelete(bookId) {
    try {
      const response = await fetch(
        `/api/bookshelves/${selectedBookshelf?._id}`,
        {
          method: "DELETE",
          header: {
            "Content-Type": "application/json",
          },
          body: bookId,
        }
      );

      if (response.ok) {
        mutate();
        console.log("Component re-rendered");
        console.log("Selected Bookshelf after deletion:", selectedBookshelf);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <>
      <h1>{selectedBookshelf?.name}</h1>
      <p>Created: {selectedBookshelf?.created}</p>
      {books?.map((book) =>
        book.items.map((obj) => (
          <div>
            <button onClick={() => handleDelete(obj.id)}>
              Delete from Bookshelf
            </button>
            <Link
              href={`/books/${obj.volumeInfo.industryIdentifiers[0].identifier}`}
            >
              <img src={obj.volumeInfo.imageLinks?.thumbnail}></img>
            </Link>
            <h2 key={obj.id}>{obj.volumeInfo.title}</h2>
            <p>{obj.volumeInfo.authors}</p>
          </div>
        ))
      )}
    </>
  );
}
