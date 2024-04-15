import { useRouter } from "next/router";
import BookDetails from "../../components/BookDetails/BookDetails";
import useSWR from "swr";
import Link from "next/link";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function BookDetailsPage({ books }) {
  const router = useRouter();
  const { id } = router.query;

  const bookURL = `https://www.googleapis.com/books/v1/volumes/${id}`;
  const { data, error } = useSWR(bookURL, fetcher);
  console.log(data);

  if (data) {
    return (
      <>
        <Link href="/search">
          <button>Back</button>
        </Link>
        <BookDetails
          name={data.volumeInfo.title}
          authors={data.volumeInfo.authors}
          categories={data.volumeInfo.categories}
          image={data.volumeInfo.imageLinks.thumbnail}
          published={data.volumeInfo.publishedDate}
          description={data.volumeInfo.description}
          publisher={data.volumeInfo.publisher}
        />
      </>
    );
  }
}
