import Searchbar from "../../components/Searchbar/Searchbar";

export default function Search({ handleInputChange }) {
  return (
    <>
      <h1>search</h1>
      <Searchbar handleInputChange={handleInputChange} />
    </>
  );
}
