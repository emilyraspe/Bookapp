import Link from "next/link";

export default function BookshelfBooks({ books, handleDelete }) {
  return (
    <div className="books-container">
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
              <p className="author">{obj.volumeInfo.authors}</p>
              <p key={obj.id} className="title">
                {obj.volumeInfo.title}
              </p>

              <p className="textSnippet">
                {obj.searchInfo?.textSnippet}{" "}
                <a
                  href={`/books/${obj.volumeInfo.industryIdentifiers[0].identifier}`}
                  className="readMore"
                >
                  [read more]
                </a>
              </p>
              <button
                onClick={() => handleDelete(obj.id)}
                className="button-bookdelete"
              >
                Remove from shelf
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
