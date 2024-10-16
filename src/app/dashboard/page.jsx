import Image from "next/image";
import Chat from "../../component/Chat";
import styles from "./page.module.css";
import Prediction from "./Prediction";
import ChatManual from "@/component/ChatManual";
import { getChartData } from "@/actions/chart";

export default async function () {
  const data = await getChartData("배추");

  return (
    <body className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo2.png" alt="농뷰 로고" width={120} height={51} quality={100} unoptimized />
      </header>
      <hr className={styles.divider} />
      <main className={styles.main}>
        <section className={styles["chart-section"]}>
          <Prediction data={data} />
        </section>
        <section className={styles["chat-section"]}>
          <div className={styles.chatHeader}>
            <h1 className={styles.chatTitle}>AI 채팅</h1>
            <ChatManual />
          </div>
          <p className={styles["chat-info"]}>
            <span>농산물 가격 데이터를 기반으로 답변해드립니다</span>
            <br />
            <br />
          </p>
          <div className={styles["chat-placeholder"]}>
            <Chat />
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
      </footer>
    </body>
  );
}
