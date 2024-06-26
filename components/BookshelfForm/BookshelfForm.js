import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BookshelfList from "../BookshelfList/BookshelfList";

export default function BookshelfForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/bookshelves/`);

  async function handleSubmit(event) {
    event.preventDefault();
    const now = new Date();
    const dateTime = now.toLocaleString();

    const formData = new FormData(event.target);
    const bookshelfData = Object.fromEntries(formData);
    console.log(session.user.userId);

    const response = await fetch(`/api/bookshelves/`, {
      method: "POST",
      body: JSON.stringify({
        ...bookshelfData,
        created: dateTime,
        userId: session.user.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate();
      event.target.reset();
    }
  }

  console.log("shelf", data);

  return (
    <>
      <div>
        {session?.user.userId && data ? (
          <BookshelfList data={data} session={session} />
        ) : (
          <p></p>
        )}
      </div>
      <div className="bookshelfForm-container">
        <h3>Create a new Bookshelf</h3>
        <form onSubmit={handleSubmit} className="bookshelfForm-form">
          <div className="bookshelfinput-container">
            <input
              type="text"
              name="name"
              className="bookshelfForm-input"
            ></input>{" "}
            <button type="submit">Create</button>
          </div>
          <label>Name of your new bookshelf</label>
        </form>
      </div>
    </>
  );
}
