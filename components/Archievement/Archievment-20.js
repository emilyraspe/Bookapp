import { PiBookOpenThin } from "react-icons/pi";

export default function Archievment20({ booksReadNumber }) {
  return (
    <>
      <div className="archievments-container">
        <div className="shape">
          <a href="/markedasread">
            <PiBookOpenThin fontSize={24} color="white" />
          </a>
        </div>
        <h4>Bookworm</h4>
        <p className="small-text">You read {booksReadNumber} Books so far</p>
      </div>
    </>
  );
}
