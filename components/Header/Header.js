import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  if (session) {
    return (
      <header className="header">
        <button className="login-out-button" onClick={() => signOut()}>
          Sign out
        </button>
      </header>
    );
  }
  return (
    <header className="header">
      <button className="login-out-button" onClick={() => signIn()}>
        Sign in
      </button>
    </header>
  );
}
