export default function Archievment50() {
  return (
    <>
      <div className="archievments-container">
        <div className="shape">
          <a href="/markedasread">
            <PiBookOpenThin fontSize={24} color="white" />
          </a>
        </div>
        <h4>Big reader</h4>
        <p className="small-text">You read {booksReadNumber} Books so far</p>
      </div>
    </>
  );
}
