import { useSession, signIn, signOut } from "next-auth/react";
import Profile from "../../components/Profile/Profile";
import Archievment from "../../components/Achievement/Achievement";

export default function ProfilePage() {
  const { data: session } = useSession();
  if (session) {
    return <Profile session={session} />;
  }
  return (
    <>
      This page is only available when signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
