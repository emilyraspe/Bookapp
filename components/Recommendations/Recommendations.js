import Link from "next/link";

export default function Recommendations({ book }) {
  if (!book || book === undefined) {
    return;
  }
  return (
    <div key={book.id} className="book-container">
      <Link
        href={`/books/${
          book.volumeInfo.industryIdentifiers &&
          book.volumeInfo.industryIdentifiers.length > 0
            ? book.volumeInfo.industryIdentifiers[0]?.identifier
            : "#"
        }`}
      >
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          className="bookimage-small"
        ></img>
      </Link>
      <div>
        <p className="author">{book.volumeInfo.authors}</p>
        <p className="title">{book.volumeInfo.title}</p>

        <p className="textSnippet">
          {book.searchInfo?.textSnippet}{" "}
          <a
            href={`/books/${
              book.volumeInfo.industryIdentifiers?.[0]?.identifier || "#"
            }`}
            className="readMore"
          >
            [read more]
          </a>
        </p>
      </div>
    </div>
  );
}
