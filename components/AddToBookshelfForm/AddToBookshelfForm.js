import useSWR from "swr";
import { useState } from "react";

export default function AddToBookshelfForm({ bookdata }) {
  const { data, mutate } = useSWR(`/api/bookshelves/`);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleAddToBookshelf(event) {
    event.preventDefault();

    if (!data) return;

    try {
      const shelf = data?.find((shelf) => shelf.name === selectedShelf);
      console.log("Selected Shelf:", selectedShelf);
      console.log("========", data);

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
      setIsSuccess(true);
    } catch (error) {
      console.error("Error adding book to bookshelf:", error);
    }
  }

  function handleSelectChange(event) {
    setSelectedShelf(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleAddToBookshelf}>
        <label>Add book to</label>
        <select value={selectedShelf} onChange={handleSelectChange}>
          <option value="" disabled>
            Select a shelf
          </option>
          {data?.map((shelf, _id) => (
            <option key={_id}>{shelf.name}</option>
          ))}
        </select>
        <button type="submit">Add to Bookshelf</button>
      </form>
      {isSuccess && <p>Book added successfully!</p>}
    </>
  );
}
