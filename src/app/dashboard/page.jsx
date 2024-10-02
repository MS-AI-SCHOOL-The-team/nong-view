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
            <form action="">
              <input className={styles.checkbox} type="checkbox" name="배추" id="배추" /> <label htmlFor="배추">배추</label>
              <input className={styles.checkbox} type="checkbox" name="무" id="무" /> <label htmlFor="무">무</label>
              <input className={styles.checkbox} type="checkbox" name="양파" id="양파" /> <label htmlFor="양파">양파</label>
              <input className={styles.checkbox} type="checkbox" name="사과" id="사과" /> <label htmlFor="사과">사과</label>
              <input className={styles.checkbox} type="checkbox" name="배" id="배" /> <label htmlFor="배">배</label>
              <input className={styles.checkbox} type="checkbox" name="건고추" id="건고추" /> <label htmlFor="건고추">건고추</label>
              <input className={styles.checkbox} type="checkbox" name="깐마늘" id="깐마늘" /> <label htmlFor="깐마늘">깐마늘</label>
              <input className={styles.checkbox} type="checkbox" name="감자" id="감자" /> <label htmlFor="감자">감자</label>
              <input className={styles.checkbox} type="checkbox" name="대파" id="대파" /> <label htmlFor="대파">대파</label>
              <input className={styles.checkbox} type="checkbox" name="상추" id="상추" /> <label htmlFor="상추">상추</label>
            </form>
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
