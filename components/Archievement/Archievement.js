import Archievment10 from "./Archivment-10";
import Archievment50 from "./Archivment-50";

export default function Archievment({ booksReadNumber }) {
  if (booksReadNumber > 10) {
  }
  if (booksReadNumber > 50) {
  }
  return (
    <>
      <p className="tagline small-text">
        Archievments for reading {booksReadNumber} books
      </p>
      <div className="archievments-container">
        {booksReadNumber >= 20 ? <Archievment10 /> : "No archievments yet"}
        {booksReadNumber >= 50 ? <Archievment50 /> : ""}
      </div>
    </>
  );
}
