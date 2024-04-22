import Link from "next/link";
import BookshelfForm from "../BookshelfForm/BookshelfForm";
import Archievment from "../Archievement/Archievement";
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
      <div className="profile-container">
        <div className="profile-img">
          <img src={session.user.image} className="profile-img" />
        </div>
        <div className="profile-overview">
          <p className="profile-name">{session.user.name}</p>
          <Link href="/markedasread">
            <p className="tagline">You read {booksReadNumber} Books 𐃘</p>
          </Link>
        </div>
      </div>
      <Archievment booksReadNumber={booksReadNumber} />
      <BookshelfForm />
    </>
  );
}
