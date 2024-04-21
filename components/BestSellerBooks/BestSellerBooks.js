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
      <h3>
        Bestseller in the category <strong>Non-Fiction</strong>
      </h3>
      <div className="bestseller-container">
        {bestSellerBooks.map((book) => (
          <div key={book.primary_isbn13} className="bestseller-group">
            <Link href={`/books/${book.primary_isbn13}`}>
              <img src={book.book_image} className="bookimage-small"></img>
            </Link>
            <p className="bestseller-rank">{book.rank}</p>
            <p className="title">{book.title}</p>
            <p className="author">{book.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}
