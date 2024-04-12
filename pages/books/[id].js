import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import BookDetails from "../../components/BookDetails/BookDetails";
import Books from "../../components/Books/Books";

export default function BookDetailsPage({ books }) {
  const router = useRouter();
  const { id } = router.query;
  const [selectedBook, setSelectedBook] = useState();
  console.log("=====", id);
  useEffect(() => {
    setSelectedBook(books?.find((book) => book.id === id));
  }, [books, id]);
  if (!id) {
    return null;
  }
  console.log("BookDetailsPage, selectedBook", selectedBook);

  if (selectedBook) {
    return (
      <BookDetails
        name={selectedBook.volumeInfo.title}
        authors={selectedBook.volumeInfo.authors}
        genre={selectedBook.volumeInfo.categories}
        image={selectedBook.volumeInfo.imageLinks.thumbnail}
        published={selectedBook.volumeInfo.publishedDate}
        description={selectedBook.volumeInfo.description}
      />
    );
  }
}
