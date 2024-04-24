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
    </>
  );
}
