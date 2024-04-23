import Archievment10 from "./Archievment-10";
import Archievment20 from "./Archievment-20";
import Archievment50 from "./Archievment-50";

export default function Archievment({ booksReadNumber }) {
  return (
    <>
      <p className="tagline small-text link-underline">
        Archievments for reading {booksReadNumber} books
      </p>
      <div className="archievments-container">
        {booksReadNumber >= 10 ? <Archievment10 /> : "No archievments yet"}
        {booksReadNumber >= 20 ? <Archievment20 /> : ""}
        {booksReadNumber >= 50 ? <Archievment50 /> : ""}
      </div>
    </>
  );
}
