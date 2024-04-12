import Image from "next/image";
import Link from "next/link";

export default function Books({ books }) {
  if (!books || books.length === 0) {
    return <p>No books found. Please serach for book</p>;
  }

  return (
    <>
      {books.map((book) => (
        <div key={book.id}>
          <Link href={`/books/${book.id}`}>
            <img src={book.volumeInfo.imageLinks?.thumbnail}></img>
          </Link>
          <h4>{book.volumeInfo.title}</h4>
          <p>{book.volumeInfo.authors}</p>
        </div>
      ))}
    </>
  );
}
