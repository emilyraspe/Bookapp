import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function RemoveFromRead({ bookdata }) {
  const {
    data: readBooks,
    error: readBooksError,
    mutate,
  } = useSWR(`/api/readBooks/`);
  const { data: session } = useSession();

  async function handeRemoveFromRead() {
    const currentUser = readBooks?.find(
      (obj) => obj.userId === session?.user.userId
    );

    const currentBook = currentUser.books.find(
      (book) => book.id === bookdata.items[0].id
    );

    console.log(currentBook.id);

    const response = await fetch(`/api/readBooks/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.userId,
        currentBook: currentBook.id,
      }),
    });

    if (response.ok) {
      mutate();
    }
  }

  return <button onClick={handeRemoveFromRead}>Remove from Read</button>;
}
