import Link from "next/link";

export default function Books({ books }) {
  if (!books || books.length === 0) {
    return;
  }
  console.log(books);

  const booksWithImages = books.filter(
    (book) => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
  );
  if (booksWithImages.length === 0) {
    return null;
  }

  return (
    <>
      {booksWithImages?.map((book) => (
        <div key={book.id} className="moreFromAuthor-container">
          <Link
            href={`/books/${
              book.volumeInfo.industryIdentifiers &&
              book.volumeInfo.industryIdentifiers.length > 0
                ? book.volumeInfo.industryIdentifiers[0].identifier
                : "#"
            }`}
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              className="bookimage-small"
            ></img>
          </Link>
          <div>
            <p className="title">{book.volumeInfo.title}</p>
            <p className="author">{book.volumeInfo.authors}</p>
          </div>
        </div>
      ))}
    </>
  );
}
