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
import "../components/BookDetails/BookDetails.css";
import "../components/AddToBookshelfForm/AddToBookshelfForm.css";
import "../components/BookshelfForm/BookshelfForm.css";
import "../components/BookshelfList/BookshelfList.css";
import "../components/Profile/Profile.css";
import "../components/Archievement/Archievments.css";
import "../components/Bookshelf/Bookshelf.css";
import "../components/BookshelfBooks/BookshelfBooks.css";
import "../components/MoreFromAuthor/MoreFromAuthor.css";
import "../components/Recommendations/Recommendations.css";

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
