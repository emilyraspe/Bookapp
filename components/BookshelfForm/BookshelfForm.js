import { useState } from "react";

export default function BookshelfForm() {
  const [bookshelves, setBookshelves] = useState([]);
  const now = new Date();
  const dateTime = now.toLocaleString();

  function handleSubmit(event) {
    event.preventDefault();
    const { value } = event.target.elements.bookshelf; // Get the value from the input field
    const newBookshelf = {
      name: value,
      created: dateTime,
    };
    setBookshelves([...bookshelves, newBookshelf]);
    event.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name of bookshelf</label>
        <input type="text" name="bookshelf"></input>{" "}
        <button type="submit">Create bookshelf</button>
      </form>
      <div>
        <h2>Bookshelves</h2>
        <ul>
          {bookshelves.map((shelf, index) => (
            <a href="#">
              <li key={index}>
                {shelf.name} - Created: {shelf.created}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
}
