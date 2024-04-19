import Bookshelf from "../../components/Bookshelf/Bookshelf";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function BookshelvesPage() {
  const { data, mutate } = useSWR(`/api/bookshelves/`);
  const router = useRouter();
  const { id } = router.query;
  const selectedBookshelf = data?.find((shelf) => shelf._id === id);
  return <Bookshelf selectedBookshelf={selectedBookshelf} />;
}
