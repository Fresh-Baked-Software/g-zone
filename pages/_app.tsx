import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { Open_Sans} from "next/font/google";
import styled from "styled-components";

import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import {
  getNavigationItem,
  getNavigationIds,
} from "../contentful/queries/navigation";
import { NavigationItem } from "../types/contentful";
import Head from "next/head";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const Main = styled.main`
  position: relative;
`;

export default function App({ Component, pageProps }: AppProps) {
  const [header, setHeader] = useState<NavigationItem>();
  const [footer, setFooter] = useState<NavigationItem>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const ids = await getNavigationIds();
        const headerId = ids.find((item) => item.slug === "header")?.sys.id;
        const footerId = ids.find((item) => item.slug === "footer")?.sys.id;

        const headerData = await getNavigationItem(headerId);
        const footerData = await getNavigationItem(footerId);

        setHeader(headerData);
        setFooter(footerData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <React.Fragment>
    <Head>
        <title>My Portfolio</title>
        <meta property="og:title" content="My portfolio" />
        <meta property="og:description" content="My portfolio" />
        <meta property="og:image" content="https://images.ctfassets.net/31t07jhehg9u/2TYjX4wJiaeyj61oShxtnH/2512c4fe3dead31f660b80f7af12486b/g-03_edited.png" />
        <meta property="og:url" content="https://giannavella.com/" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Portfolio" />
        <meta name="twitter:description" content="My portfolio!" />
        <meta name="twitter:image" content="https://images.ctfassets.net/31t07jhehg9u/2TYjX4wJiaeyj61oShxtnH/2512c4fe3dead31f660b80f7af12486b/g-03_edited.png" />
    </Head>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`${openSans.variable}`}>
        {header && <Header header={header} />}
        <Main>
          <Component {...pageProps} />
        </Main>
        {footer && <Footer footer={footer} />}
      </div>
    </ThemeProvider>
    </React.Fragment>
  );
}
