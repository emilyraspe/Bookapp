import AddToBookshelfForm from "../AddToBookshelfForm/AddToBookshelfForm";
import { useSession } from "next-auth/react";

export default function BookDetails({
  name,
  authors,
  categories,
  image,
  published,
  description,
  publisher,
  bookdata,
}) {
  const { data: session } = useSession();

  async function addToReadBooks(event) {
    event.preventDefault();

    console.log("hi", bookdata.items[0]);
    console.log("SESSOIN", session);

    const response = await fetch(`/api/readBooks/`, {
      method: "PUT",
      body: JSON.stringify({
        book: bookdata.items[0],
        userId: session.user.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} height={350}></img>
      <h4>Author: {authors}</h4>
      <p>Published: {published}</p>
      <p>Publisher: {publisher}</p>
      <p>{description}</p>
      {categories.map((categorie) => (
        <div>{categorie}</div>
      ))}

      <button onClick={addToReadBooks}>Mark as read</button>
      <AddToBookshelfForm bookdata={bookdata} />
    </div>
  );
}
