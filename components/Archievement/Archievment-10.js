import { PiBookThin } from "react-icons/pi";
export default function Archievment10({ booksReadNumber }) {
  return (
    <>
      <div className="archievments-container">
        <div className="shape">
          <a href="/markedasread">
            <PiBookThin fontSize={24} color="white" />
          </a>
        </div>
        <h4>Beginner</h4>
        <p className="small-text">You read {booksReadNumber} Books so far</p>
      </div>
    </>
  );
}
