import Image from "next/image";

export default function Books({ books }) {
  if (!books) {
    return console.log("not working");
  }

  return (
    <>
      {books.map((book) => (
        <div key={book.id}>
          <img src={book.volumeInfo.imageLinks.smallThumbnail}></img>
          <h4>{book.volumeInfo.title}</h4>
          <p>{book.volumeInfo.authors}</p>
        </div>
      ))}
    </>
  );
}
