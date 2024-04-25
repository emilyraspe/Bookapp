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

  if (error) {
    return <div>Error loading book details</div>;
  }

  if (!data || data.totalItems === 0) {
    return <div>No data found</div>;
  }

  let bookInfo;
  if (data.items && data.items.length > 0) {
    // If 'data.items' exists and is not empty
    const itemsWithThumbnail = data.items.filter(
      (item) =>
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
    );
    if (itemsWithThumbnail.length > 0) {
      bookInfo = itemsWithThumbnail[0].volumeInfo;
    } else {
      return <div>No data found</div>;
    }
  } else {
    // If 'data.items' doesn't exist or is empty
    if (data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail) {
      bookInfo = data.volumeInfo;
    } else {
      return <div>No data found with thumbnail</div>;
    }
  }
  console.log("HIIIIII", data);

  if (data) {
    return (
      <>
        <BookDetails
          name={bookInfo.title}
          authors={bookInfo.authors}
          categories={bookInfo.categories}
          image={bookInfo.imageLinks.thumbnail}
          published={bookInfo.publishedDate}
          description={bookInfo.description}
          publisher={bookInfo.publisher}
          bookdata={data}
          pageCount={bookInfo.pageCount}
        />
      </>
    );
  }
}
