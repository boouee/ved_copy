import styles from "./index.module.css";
import Head from "next/head";
import Scene from "~/components/three/Scene";

export default function Home() {
  console.log("hello");
  return (
    <>
      <Head>
        <title>visual_editor</title>
        <meta name="description" content="visual_editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Scene />
        </div>
      </main>
    </>
  );
}
