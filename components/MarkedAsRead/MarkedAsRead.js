import useSWR from "swr";
import { useSession } from "next-auth/react";
import Books from "../Books/Books";

export default function MarkedAsRead() {
  const { data: session } = useSession();
  const currentUser = session?.user.userId;
  const { data, error } = useSWR(`/api/readBooks/`);

  if (!session) {
    return <p>Please sign in</p>;
  }
  if (error) {
    return <p>Error fetching data</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const userBooks = data.filter((item) => item.userId === currentUser);

  if (userBooks.length === 0) {
    return <p>No books found for the current user.</p>;
  }
  const BooksReadNumber = userBooks[0].books.length;

  return (
    <>
      <div className="bookshelf-header">
        <h1>List of read books</h1>
        <p>{BooksReadNumber} Books</p>
      </div>
      <div className="books-container">
        <Books books={userBooks[0].books} />
      </div>
    </>
  );
}
