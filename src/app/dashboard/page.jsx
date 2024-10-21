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
        <Image src="/logo2.png" alt="농뷰 로고" width={150} height={63.75} quality={100} unoptimized />
        <section className={styles.headLine}>
          <h1 className={styles.headLineTitle}>오늘의 뉴스📢</h1>
          <p className={styles.headLineContent}>정부, 온라인 판매 쌀, 상추, 사과 등 다소비 농산물 안전성 검사</p>
        </section>
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
            <span>안녕하세유 반가워유~🧑‍🌾</span>
            <br />
            <span>농산물 가격 데이터에 대해 궁금한 게 있으면 질문하세유~!​</span>
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
