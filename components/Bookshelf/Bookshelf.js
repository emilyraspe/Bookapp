import Books from "../Books/Books";
import Link from "next/link";

export default function Bookshelf({ selectedBookshelf }) {
  const books = selectedBookshelf?.books;
  console.log("link", selectedBookshelf?._id);

  async function handleDelete(bookId) {
    console.log("TEEEEST", bookId);
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
            {console.log("BOOK üüüüüüID", obj.id)}
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
