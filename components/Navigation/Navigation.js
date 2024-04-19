import Link from "next/link";

export default function Navigation() {
  const path = "search";
  //useState for url
  //useEffect to get path
  //
  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav--element">
          Homepage
        </Link>
        <Link
          href="/search"
          className={`nav--element ${path == "search" ? "underlined" : ""}`}
        >
          Search
        </Link>
        <Link href="/profile" className="nav--element">
          Profile
        </Link>
      </nav>
    </>
  );
}
