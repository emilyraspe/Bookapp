export default function BookshelfList({ data, session }) {
  return (
    <>
      <h2>My Bookshelves</h2>
      {data
        .filter((shelf) => shelf.userId === session.user.userId)
        .map((shelf, id) => (
          <div className="bookshelflist-item">
            <div>
              <p className="small-text">–0{id + 1}</p>
              <p>{shelf.name}</p>
            </div>
            <a
              href={`bookshelves/${shelf._id}`}
              key={shelf._id}
              className="bookshelflist-link"
            >
              <p>𐃘</p>
            </a>
          </div>
        ))}
    </>
  );
}
