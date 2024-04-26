import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <nav className="nav">
        <Link
          href="/"
          className={`nav--element nav--button nav--element-left ${
            currentPath === "/" ? "active" : ""
          }`}
        >
          Start
        </Link>

        <Link
          href="/search"
          className={`nav--element nav--button ${
            currentPath === "/search" ? "active" : ""
          }`}
        >
          Search
        </Link>

        <Link
          href="/profile"
          className={`nav--element nav--button  ${
            currentPath === "/profile" ? "active" : ""
          }`}
        >
          Profile
        </Link>
      </nav>
    </>
  );
}
