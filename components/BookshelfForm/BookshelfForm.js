import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function BookshelfForm() {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/bookshelves/`);

  const [bookshelves, setBookshelves] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const now = new Date();
    const dateTime = now.toLocaleString();
    /*   const { value } = event.target.elements.bookshelf;
    const newBookshelf = {
      name: value,
      created: dateTime,
    }; */
    /*     setBookshelves([...bookshelves, newBookshelf]); */

    const formData = new FormData(event.target);
    const bookshelfData = Object.fromEntries(formData);
    console.log("BOOKSHELF DATAAAAAA", bookshelfData);
    const response = await fetch(`/api/bookshelves/`, {
      method: "POST",
      body: JSON.stringify({ ...bookshelfData, created: dateTime }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate();
      event.target.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name of bookshelf</label>
        <input type="text" name="name"></input>{" "}
        <button type="submit">Create bookshelf</button>
      </form>
      <div>
        <h2>Bookshelves</h2>
        <ul>
          {bookshelves.map((shelf, id) => (
            <a href="#">
              <li key={id}>
                {shelf.name} - Created: {shelf.created}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
}
