import Searchbar from "../../components/Searchbar/Searchbar";
import Books from "../../components/Books/Books";

export default function Search({ handleInputChange, books }) {
  return (
    <>
      <h1>search</h1>
      <Searchbar handleInputChange={handleInputChange} />
      <Books books={books} />
    </>
  );
}
