import Archievment10 from "./Archievment-10";
import Archievment20 from "./Archievment-20";
import Archievment50 from "./Archievment-50";

export default function Archievment({ booksReadNumber }) {
  return (
    <>
      {booksReadNumber >= 10 && booksReadNumber < 20 ? (
        <Archievment10 booksReadNumber={booksReadNumber} />
      ) : (
        ""
      )}
      {booksReadNumber >= 20 && booksReadNumber < 50 ? (
        <Archievment20 booksReadNumber={booksReadNumber} />
      ) : (
        ""
      )}
      {booksReadNumber >= 50 ? (
        <Archievment50 booksReadNumber={booksReadNumber} />
      ) : (
        ""
      )}
    </>
  );
}
