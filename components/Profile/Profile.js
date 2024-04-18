import Link from "next/link";
import BookshelfForm from "../BookshelfForm/BookshelfForm";

export default function Profile({ session }) {
  return (
    <>
      <h1>{session.user.name}</h1>
      <img src={session.user.image} />
      <Link href="/markedasread">Books that I read</Link>
      <BookshelfForm />
    </>
  );
}
