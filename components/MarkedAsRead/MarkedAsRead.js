import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";
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

  return (
    <>
      <Books books={userBooks[0].books} />
    </>
  );
}
