import useSWR from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddToBookshelfForm({ bookdata }) {
  const { data, mutate } = useSWR(`/api/bookshelves/`);
  const { data: session } = useSession();
  const [selectedShelf, setSelectedShelf] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleAddToBookshelf(event) {
    event.preventDefault();

    if (!data) return;

    try {
      const shelf = data?.find((shelf) => shelf.name === selectedShelf);

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
      {isSuccess ? (
        <p className="addToBookshelfSuccess">Book added successfully!</p>
      ) : null}
      {!session ? (
        <p>Please Login for more</p>
      ) : (
        <form onSubmit={handleAddToBookshelf} className="details-form">
          <label>Add book to</label>
          <select
            value={selectedShelf}
            onChange={handleSelectChange}
            className="details-select"
          >
            <option value="" disabled>
              Select a shelf
            </option>
            {data
              ?.filter((shelf) => shelf.userId === session.user.userId)
              .map((shelf, _id) => (
                <option key={_id}>{shelf.name}</option>
              ))}
          </select>
          <button type="submit" className="details-form-button">
            Add
          </button>
        </form>
      )}
    </>
  );
}
