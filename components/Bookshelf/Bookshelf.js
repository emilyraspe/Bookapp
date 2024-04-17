import Books from "../Books/Books";
import Link from "next/link";

export default function Bookshelf({ selectedBookshelf }) {
  console.log("selectedBookshelf", selectedBookshelf);

  const books = selectedBookshelf?.books;

  return (
    <>
      <h1>{selectedBookshelf?.name}</h1>
      <p>Created: {selectedBookshelf?.created}</p>
      {books?.map((book) =>
        book.items.map((obj) => (
          <div>
            <button>Delete from Bookshelf</button>
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
