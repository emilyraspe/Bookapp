import { useState } from "react";

export default function Rec() {
  const [data, SetDate] = useState("");
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
      SetDate(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("SearchInput", searchInput);
    event.target.reset();
  }
  console.log("===", data);

  return (
    <div>
      <h1>Get a book recommendation</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="fav"></input>
        <label>Whats your favourite Book or Author?</label>
        <button type="submit">Submit</button>
      </form>
      {data && <p>{data[0].text}</p>}
    </div>
  );
}
