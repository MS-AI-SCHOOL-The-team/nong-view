import dynamic from "next/dynamic";
import Chat from "../../component/Chat";
import styles from "./page.module.css";

const Chart = dynamic(() => import("../../component/Chart"), { ssr: false })

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chart />
        <Chat />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
