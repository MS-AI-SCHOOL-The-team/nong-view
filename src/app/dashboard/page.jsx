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
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202167",
    text: "정부, 김장철 앞두고 배추·무 계약재배 공급 확대"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202165",
    text: "도매법인은 모기업‘현금인출기’ 인가… 독과점에 수수료도 과해"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202131",
    text: "농업소득 감소세 가팔라…저비용 농업으로 전환 등 시급"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202129",
    text: "럼피스킨 다시 확산하는 이유는?"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202128",
    text: "양돈 생산성 향상 위해 후보돈 입식·관리 중요"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202111",
    text: "김제 스마트팜 피해 책임 통감…보수·보상 최선 노력"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202107",
    text: "올해 김장 직접 담그는 비중 늘어날 듯"
  }, {
    link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202167",
    text: "정부, 김장철 앞두고 배추·무 계약재배 공급 확대"
  }]

  return (
    <body className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo2.webp" alt="농뷰 로고" width={150} height={63.75} quality={100} unoptimized priority />
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
        <section className={styles.chartSection}>
          <Prediction data={data} />
        </section>
        <section className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h2 className={styles.chatTitle}>AI 채팅</h2>
            <ChatManual />
          </div>
          <p className={styles.chatInfo}>
            <span>안녕하세유 반가워유~🧑‍🌾</span>
            <br />
            <span>농산물 가격 데이터에 대해 궁금한 게 있으면 질문하세유~!​</span>
          </p>
          <div className={styles.chatPlaceholder}>
            <Chat />
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
      </footer>
    </body>
  );
}
