import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import "../components/Navigation/Navigation.css";
import "../components/Header/Header.css";
import "./index.css";
import "../components/BestSellerBooks/BestSellerBooks.css";
import "../components/Searchbar/Searchbar.css";
import "./search/search.css";
import "../components/Books/Books.css";

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
