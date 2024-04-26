import { MdOutlineArrowOutward } from "react-icons/md";

export default function BookshelfList({ data, session }) {
  return (
    <>
      <div className="header-bookshelfList">
        <h3>Bookshelves</h3>
      </div>
      {data
        .filter((shelf) => shelf.userId === session.user.userId)
        .map((shelf, id) => (
          <a
            href={`bookshelves/${shelf._id}`}
            key={shelf._id}
            className="bookshelflist-link"
          >
            <div className="bookshelflist-item">
              <div>
                <h4>{shelf.name}</h4>
                <p className="small-text">
                  {shelf.books.length} Books in this shelf
                </p>
              </div>

              <MdOutlineArrowOutward fontSize={22} />
            </div>
          </a>
        ))}
    </>
  );
}
