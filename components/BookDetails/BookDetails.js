export default function BookDetails({
  name,
  authors,
  genre,
  image,
  published,
  description,
}) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image}></img>
      <h4>Author: {authors}</h4>
      <p>Published: {published}</p>
      <p>Description: {description}</p>
    </div>
  );
}
