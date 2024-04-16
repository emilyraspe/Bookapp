import useSWR from "swr";
export default function AddToBookshelfForm() {
  const { data } = useSWR(`/api/bookshelves/`);
  return (
    <form>
      <label>Add to readinglist</label>
      <select>
        {data?.map((shelf, id) => (
          <option> {shelf.name}</option>
        ))}
      </select>
    </form>
  );
}
