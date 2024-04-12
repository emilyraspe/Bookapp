import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import BookDetails from "../../components/BookDetails/BookDetails";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function BookDetailsPage({ books }) {
  const router = useRouter();
  const { id } = router.query;

  const bookURL = `https://www.googleapis.com/books/v1/volumes/${id}`;
  const { data, error } = useSWR(bookURL, fetcher);
  console.log(bookURL);
  console.log("==========", data);

  if (data) {
    return (
      <BookDetails
        name={data.volumeInfo.title}
        authors={data.volumeInfo.authors}
        genre={data.volumeInfo.categories}
        image={data.volumeInfo.imageLinks.thumbnail}
        published={data.volumeInfo.publishedDate}
        description={data.volumeInfo.description}
      />
    );
  }
}
