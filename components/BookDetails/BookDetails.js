import AddToBookshelfForm from "../AddToBookshelfForm/AddToBookshelfForm";

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
      <AddToBookshelfForm />
    </div>
  );
}
