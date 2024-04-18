import Link from "next/link";
import { useRouter } from "next/router.js";

import useSWR from "swr";

export default function Bookshelf({ selectedBookshelf }) {
  const { mutate } = useSWR(`/api/bookshelves/`);
  const router = useRouter();
  const books = selectedBookshelf?.books;

  async function deleteBookshelf() {
    console.log("selectedBookshelf?", selectedBookshelf?._id);
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
          header: {
            "Content-Type": "application/json",
          },
          body: bookId,
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
      <h1>{selectedBookshelf?.name}</h1>
      <p>Created: {selectedBookshelf?.created}</p>
      <button onClick={deleteBookshelf}>Delete Bookshelf</button>
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
