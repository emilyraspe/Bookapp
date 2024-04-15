export default function BookDetails({
  name,
  authors,
  categories,
  image,
  published,
  description,
  publisher,
}) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} height={350}></img>
      <h4>Author: {authors}</h4>
      <p>Published: {published}</p>
      <p>Publisher: {publisher}</p>
      <p>{description}</p>
      {categories.map((categorie) => (
        <div>{categorie}</div>
      ))}
      <button>Mark as read</button>
      <form>
        <label>Add to readinglist</label>
        <select>
          <option>List 1</option>
          <option>List 2</option>
        </select>
      </form>
    </div>
  );
}
