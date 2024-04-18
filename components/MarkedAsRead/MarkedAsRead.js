import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MarkedAsRead() {
  const { data: session } = useSession();
  const currentUser = session?.user.userId;
  const { data, error } = useSWR(`/api/readBooks/`);

  if (!session) {
    return <p>Please sign in</p>;
  }
  console.log(data);

  const userBooks = data.filter((item) => item.userId === currentUser);

  console.log("userBooks", userBooks);

  return (
    <>
      {userBooks[0].books.map((book) => (
        <div key={book.id}>
          <Link
            href={`/books/${book.volumeInfo.industryIdentifiers[0].identifier}`}
          >
            <img src={book.volumeInfo.imageLinks?.thumbnail}></img>
          </Link>
          <h4>{book.volumeInfo.title}</h4>
          <p>{book.volumeInfo.authors}</p>
        </div>
      ))}
    </>
  );
}
