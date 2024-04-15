export default function Profile({ session }) {
  console.log("IMG", session.user.image);
  console.log("NAME", session.user.name);

  console.log(session);
  return (
    <>
      <h1>{session.user.name}</h1>
      <img src={session.user.image} />
    </>
  );
}
