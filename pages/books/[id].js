import { useRouter } from "next/router";
import BookDetails from "../../components/BookDetails/BookDetails";
import useSWR from "swr";
import Link from "next/link";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function BookDetailsPage({ books }) {
  const router = useRouter();
  const { id } = router.query; //this is the isbn now

  const bookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`;
  const { data, error } = useSWR(bookURL, fetcher);

  let bookInfo;
  if (!data) {
    return;
  }
  if (data.items && data.items.length > 0) {
    // If 'data.items' exists and is not empty
    bookInfo = data.items[0].volumeInfo;
  } else {
    // If 'data.items' doesn't exist or is empty
    bookInfo = data.volumeInfo;
  }

  if (data) {
    return (
      <>
        <Link href="/search">
          <button>Back</button>
        </Link>
        <BookDetails
          name={bookInfo.title}
          authors={bookInfo.authors}
          categories={bookInfo.categories}
          image={bookInfo.imageLinks.thumbnail}
          published={bookInfo.publishedDate}
          description={bookInfo.description}
          publisher={bookInfo.publisher}
          bookdata={data}
        />
      </>
    );
  }
}
