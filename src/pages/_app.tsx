import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../contexts/AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tarefas</title>
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
