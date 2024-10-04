import dynamic from "next/dynamic";
import Chat from "../../component/Chat";
import styles from "./page.module.css";
import Image from "next/image";

const Chart = dynamic(() => import("../../component/Chart"), { ssr: false })

export default function Home() {
  return (
    <body className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo2.png" alt="농뷰 로고" width={120} height={51} quality={100} unoptimized></Image>
      </header>
      <hr className={styles.divider} />
      <main className={styles.main}>
        <section className={styles["chart-section"]}>
          <h1>농산물 가격 AI 예측</h1>
          <p className={styles.note}>※ 중복 선택 불가</p>
          <div className={styles["checkbox-container"]}>
            <label className={styles.label} htmlFor="배추">
              <input className={styles.checkbox} type="radio" name="item" id="배추" defaultChecked={true} />
              배추
            </label>
            <label className={styles.label} htmlFor="무">
              <input className={styles.checkbox} type="radio" name="item" id="무" />
              무
            </label>
            <label className={styles.label} htmlFor="양파">
              <input className={styles.checkbox} type="radio" name="item" id="양파" />
              양파
            </label>
            <label className={styles.label} htmlFor="사과">
              <input className={styles.checkbox} type="radio" name="item" id="사과" />
              사과
            </label>
            <label className={styles.label} htmlFor="배">
              <input className={styles.checkbox} type="radio" name="item" id="배" />
              배
            </label>
            <label className={styles.label} htmlFor="건고추">
              <input className={styles.checkbox} type="radio" name="item" id="건고추" />
              건고추
            </label>
            <label className={styles.label} htmlFor="깐마늘">
              <input className={styles.checkbox} type="radio" name="item" id="깐마늘" />
              깐마늘
            </label>
            <label className={styles.label} htmlFor="감자">
              <input className={styles.checkbox} type="radio" name="item" id="감자" />
              감자
            </label>
            <label className={styles.label} htmlFor="대파">
              <input className={styles.checkbox} type="radio" name="item" id="대파" />
              대파
            </label>
            <label className={styles.label} htmlFor="상추">
              <input className={styles.checkbox} type="radio" name="item" id="상추" />
              상추
            </label>
          </div>
          <article className={styles["chart-box"]}>
            <div className={styles["chart-placeholder"]}>
              <Chart />
            </div>
          </article>
        </section>
        <section className={styles["chat-section"]}>
          <h1>AI 채팅</h1>
          <p className={styles["chat-info"]}>
            <span className={styles["chat-info"]}>농산물 가격 데이터를 기반으로 답변해드립니다</span>
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
