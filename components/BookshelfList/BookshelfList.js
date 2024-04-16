export default function BookshelfList({ data, session }) {
  return (
    <ul>
      {data
        .filter((shelf) => shelf.userId === session.user.userId)
        .map((shelf, id) => (
          <a href={`bookshelves/${shelf._id}`} key={shelf._id}>
            <li>{shelf.name}</li>
          </a>
        ))}
    </ul>
  );
}
