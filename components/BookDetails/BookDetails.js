import AddToBookshelfForm from "../AddToBookshelfForm/AddToBookshelfForm";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import RemoveFromRead from "../RemoveFromRead/RemoveFromRead";

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
  const {
    data: readBooks,
    error: readBooksError,
    mutate,
  } = useSWR(`/api/readBooks/`);

  const now = new Date();
  const dateTime = now.toLocaleDateString();

  const bookWithDate = {
    ...bookdata.items[0],
    date: dateTime,
  };

  async function addToReadBooks(event) {
    event.preventDefault();

    if (readBooksError) {
      console.error("Error fetching read books data");
      return;
    }

    if (session) {
      //find bookarray of current user
      const readBooksOfUser = readBooks.find(
        (obj) => obj.userId === session.user.userId
      );

      if (readBooksOfUser) {
        //find current book in array
        //bookdata coming from google api
        const currentBook = readBooksOfUser.books.find(
          (book) => book.id === bookdata.items[0].id
        );

        if (!currentBook) {
          const response = await fetch(`/api/readBooks/`, {
            method: "PUT",
            body: JSON.stringify({
              book: bookWithDate,
              userId: session.user.userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();

          mutate();
        }
      }
    }
  }

  //diable button if books is already in array - returns true or false

  const isBookFound = () => {
    if (!session || !readBooks) {
      return false;
    }

    return readBooks.some(
      (obj) =>
        obj.userId === session.user.userId &&
        obj.books.some((book) => book.id === bookdata.items[0].id)
    );
  };

  //stuff for date that book was added
  const currentUSER = readBooks?.find(
    (obj) => obj.userId === session?.user.userId
  );

  const bookForDate = currentUSER?.books.find(
    (book) => book.id === bookdata.items[0].id
  );

  return (
    <div className="details-container">
      <h1 className="details-title">{name}</h1>
      <img src={image} height={250} alt={name} className="details-img" />

      <div className="details-info">
        <p>Author:{authors}</p>
        <p>Published:{published}</p>
        <p>Publisher:{publisher}</p>
      </div>
      {categories?.map((category, index) => (
        <span key={index} className="details-genre">
          {category}
        </span>
      ))}
      <p className="details-description">{description}</p>

      {session ? (
        <div className="details-read">
          <p>
            {isBookFound() ? (
              <p>
                {" "}
                <strong>{name}</strong> was marked read on {bookForDate?.date}
              </p>
            ) : (
              ""
            )}
          </p>
          {isBookFound() ? (
            <RemoveFromRead bookdata={bookdata} />
          ) : (
            <button onClick={addToReadBooks} /* disabled={isBookFound()} */>
              {" "}
              Mark as read
            </button>
          )}
        </div>
      ) : (
        ""
      )}

      <AddToBookshelfForm bookdata={bookdata} />
    </div>
  );
}
