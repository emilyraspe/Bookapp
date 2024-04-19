import Link from "next/link";
import BookshelfForm from "../BookshelfForm/BookshelfForm";
import Archievment from "../Achievement/Achievement";
import useSWR from "swr";

export default function Profile({ session }) {
  //ReadBooks Data
  const { data: readBooksData, error: readBooksError } =
    useSWR("/api/readBooks/");

  const userBooks = readBooksData?.filter(
    (item) => item.userId === session.user.userId
  );

  let booksReadNumber = 0;
  if (userBooks) {
    booksReadNumber = userBooks[0].books.length;
  }
  console.log("BooksReadNumber", booksReadNumber);

  return (
    <>
      <img src={session.user.image} />
      <h1>{session.user.name}</h1>
      <Link href="/markedasread">
        You read {booksReadNumber} Books. See all
      </Link>
      <Archievment booksReadNumber={booksReadNumber} />
      <BookshelfForm />
    </>
  );
}
