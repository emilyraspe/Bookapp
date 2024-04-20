import Archievment10 from "./Archivment-10";

export default function Archievment({ booksReadNumber }) {
  if (booksReadNumber > 10) {
  }
  if (booksReadNumber > 50) {
  }
  return (
    <div className="archievments-container">
      <h2>Your archievments</h2>
      {booksReadNumber > 50 ? <Archievment10 /> : "No archievments yet"}
    </div>
  );
}
