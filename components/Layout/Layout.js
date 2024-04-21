import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Navigation />
    </>
  );
}
