import main from "./test";
import { useState } from "react";
import { useEffect } from "react";

function Rec() {
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await main();
      setResponseData(response);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Response Data:</h1>
      <p>{responseData}</p>
    </div>
  );
}

export default Rec;
