import Link from "next/link";

export default function Navigation() {
  const path = "search";

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav--element nav--button nav--element-left">
          Start
        </Link>

        <Link href="/search" className="nav--element nav--button">
          Search
        </Link>

        <Link href="/profile" className="nav--element nav--button">
          Profile
        </Link>
      </nav>
    </>
  );
}
