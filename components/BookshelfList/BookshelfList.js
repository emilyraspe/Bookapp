export default function BookshelfList({ data, session }) {
  return (
    <ul>
      {data
        .filter((shelf) => shelf.userId === session.user.userId)
        .map((shelf, id) => (
          <a href={`bookshelves/${id}`} key={id}>
            <li>
              {shelf.name} - Created: {shelf.created}
            </li>
          </a>
        ))}
    </ul>
  );
}
