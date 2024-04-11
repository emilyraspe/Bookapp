import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Homepage</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
