export default function Searchbar({ handleInputChange }) {
  function handleSubmit(event) {
    event.preventDefault();
    const searchInput = event.target.search.value;
    handleInputChange(searchInput);
    event.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container">
          <input type="text" name="search" className="search-input"></input>
          <button type="submit">Submit</button>
        </div>
        <label htmlFor="search">Enter booktitle or author</label>
      </form>
    </>
  );
}
