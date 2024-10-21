import Image from "next/image";
import Chat from "../../component/Chat";
import styles from "./page.module.css";
import Prediction from "./Prediction";
import ChatManual from "@/component/ChatManual";
import { getChartData } from "@/actions/chart";
import Link from "next/link";

export default async function () {
  const data = await getChartData("배추");
  const newsList = [{
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202104",
    text: "한능평 ‘사육기간 단축부문’ 내년에도 열린다"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202103",
    text: "제발 20만원 약속이라도 지켜달라…넋 놓고 또 빚진다"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202102",
    text: "윤 대통령, 9월 집중호우 14개 읍면동 특별재난지역 선포"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202100",
    text: "한국형 2세대 스마트팜 조기 상용화 준비 ‘착착’"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202099",
    text: "데임·터짐 피해 ‘배’, 수확 후 선별·저장 주의해야"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202098",
    text: "저온성 필름으로 재배한 ‘천궁’"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202096",
    text: "젖뗀 돼지 설사 ‘박테리오파지’ 활용 기술로 줄여"
  }, {
    link: "https://www.nongupin.co.kr/news/articleView.html?idxno=202104",
    text: "한능평 ‘사육기간 단축부문’ 내년에도 열린다"
  }]

  return (
    <body className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo2.png" alt="농뷰 로고" width={150} height={63.75} quality={100} unoptimized />
        <section className={styles.headLine}>
          <h1 className={styles.headLineTitle}>오늘의 뉴스📢</h1>
          <article className={styles.headLineContent}>
            <div className={styles.tickerWrapper}>
              {newsList.map(({ link, text }, index) => <Link key={`news-${index}`} href={link} className={styles.tickerItem} target="_blank">{text}</Link>)}
            </div>
          </article>
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
