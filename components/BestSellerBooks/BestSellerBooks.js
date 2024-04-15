import Link from "next/link";

export default function BestSellerBooks({ bestSellerBooks }) {
  if (!bestSellerBooks || bestSellerBooks.length === 0) {
    return <p>Books not available</p>;
  }

  return (
    <>
      {bestSellerBooks.map((book) => (
        <div key={book.primary_isbn13}>
          <p>{book.rank}</p>
          <Link href={`/books/${book.primary_isbn13}`}>
            <img src={book.book_image}></img>
          </Link>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </div>
      ))}
    </>
  );
}
