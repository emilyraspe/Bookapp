import BookshelfForm from "../BookshelfForm/BookshelfForm";

export default function Profile({ session }) {
  return (
    <>
      <h1>{session.user.name}</h1>
      <img src={session.user.image} />
      <BookshelfForm />
    </>
  );
}
