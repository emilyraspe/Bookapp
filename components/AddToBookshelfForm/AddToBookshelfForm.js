import useSWR from "swr";
import { useState } from "react";

export default function AddToBookshelfForm({ bookdata }) {
  const { data, mutate } = useSWR(`/api/bookshelves/`);
  const [selectedShelf, setSelectedShelf] = useState("");

  async function handleAddToBookshelf(event) {
    event.preventDefault();
    console.log("Bookdata in AddToBooksheelfForm", bookdata);
    console.log("DATA in AddToBooksheelfForm", data);

    //
    if (!data) return;

    try {
      const shelf = data.find((shelf) => shelf.name === selectedShelf);

      // Push the bookdata into the selected shelf's booksarray
      shelf.books.push(bookdata);

      // update bookshelf data
      await fetch(`/api/bookshelves/${shelf._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shelf),
      });

      mutate();
    } catch (error) {
      console.error("Error adding book to bookshelf:", error);
    }
  }
  //
  function handleSelectChange(event) {
    setSelectedShelf(event.target.value);
  }

  return (
    <form onSubmit={handleAddToBookshelf}>
      <label>Add book to</label>
      <select value={selectedShelf} onChange={handleSelectChange}>
        {data?.map((shelf, id) => (
          <option> {shelf.name}</option>
        ))}
      </select>
      <button type="submit">Add to Bookshelf</button>
    </form>
  );
}
