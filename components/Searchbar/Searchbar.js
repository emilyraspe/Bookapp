export default function Searchbar({ handleInputChange }) {
  function handleSubmit(event) {
    event.preventDefault();
    const searchInput = event.target.search.value;
    handleInputChange(searchInput);
    event.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">search your next favorite book</label>
        <input type="text" name="search"></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
