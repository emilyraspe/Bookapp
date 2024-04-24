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
      <h2 id="bestseller">Bestseller in the category </h2>
      <p>Non-Fiction</p>
      <div className="bestseller-container">
        {bestSellerBooks.map((book) => (
          <div key={book.primary_isbn13} className="bestseller-group">
            <p className="bestseller-rank">{book.rank}</p>{" "}
            <Link href={`/books/${book.primary_isbn13}`}>
              <img
                src={book.book_image}
                className="bookimage-small-bestseller"
              ></img>
            </Link>
            <p className="bestseller-author">{book.author}</p>
            <p className="bestseller-title">{book.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
