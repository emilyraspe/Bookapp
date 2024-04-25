export default function Rec() {
  async function handleClick(event) {
    event.preventDefault();
    const inputValue = event.target.elements.fav.value;

    const searchInput = inputValue.trim();

    if (!searchInput) {
      console.error("Input value is empty");
      return;
    }

    try {
      const response = await fetch(`/api/ai/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ searchInput }),
      });
      const responseData = await response.json();
      console.log("Response Data:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("SearchInput", searchInput);
  }

  return (
    <div>
      <h1>Get a book recommendation</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="fav"></input>
        <label>Whats your favourite Book or Author?</label>
        <button type="submit">Submit</button>
      </form>

      <p>{responseData}</p>
    </div>
  );
}
