import Link from "next/link";

export default function BestSellerBooks({ bestSellerBooks }) {
  if (!bestSellerBooks || bestSellerBooks.length === 0) {
    return (
      <div className="info-message">
        <p>Books not available. Please try again in two minutes</p>
      </div>
    );
  }

  return (
    <>
      <p className="tagline" id="bestseller">
        Bestseller in the category{" "}
      </p>
      <p>Non-Fiction</p>
      <div className="bestseller-container">
        {bestSellerBooks.map((book) => (
          <div key={book.primary_isbn13} className="bestseller-group">
            <p className="bestseller-rank">{book.rank}</p>{" "}
            <Link href={`/books/${book.primary_isbn13}`}>
              <img src={book.book_image} className="bookimage-small"></img>
            </Link>
            <p className="title">{book.title}</p>
            <p className="author">{book.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}
