import Books from "../Books/Books";
export default function Bookshelf({ selectedBookshelf }) {
  return (
    <>
      <h1>{selectedBookshelf?.name}</h1>
      <p>Created: {selectedBookshelf?.created}</p>
      <Books />
    </>
  );
}
