import Image from "next/image";
import Chat from "../../component/Chat";
import styles from "./page.module.css";
import Prediction from "./Prediction";

export default function () {
  return (
    <body className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo2.png" alt="농뷰 로고" width={120} height={51} quality={100} unoptimized></Image>
      </header>
      <hr className={styles.divider} />
      <main className={styles.main}>
        <section className={styles["chart-section"]}>
          <Prediction />
        </section>
        <section className={styles["chat-section"]}>
          <h1>AI 채팅</h1>
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
