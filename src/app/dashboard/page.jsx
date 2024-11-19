import Image from "next/image";
import Chat from "../../component/Chat";
import styles from "./page.module.css";
import Prediction from "./Prediction";
import ChatManual from "@/component/ChatManual";
import { getChartData } from "@/actions/chart";
import Link from "next/link";

export default async function () {
  const data = await getChartData("마늘");
  const newsList = [
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202356",
      text: "“볏포대 내던지고 서울로”…번지는 농민시위에 ‘무색한’ 농업인의날",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202355",
      text: "‘꼭지 달린 사과’…농가 생산비 절감에 큰 효과",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202354",
      text: "돼지 소장 조직과 비슷한 ‘미니장기’ 개발",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202353",
      text: "늦게 심은 밀·보리, 파종량·밑거름 늘려야",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202352",
      text: "‘구운 버섯’ 콜레스테롤 감소 효과 있어",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202351",
      text: "간척지 풋거름작물 혼합재배, 땅심 개선 효과",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202350",
      text: "식용곤충 ‘꽃벵이 추출물’ 면역력 증진에 효과",
    },
    {
      link: "https://slv.nongupin.co.kr/news/articleView.html?idxno=202349",
      text: "‘감귤부산물’, 펫푸드와 화장품 등으로 재탄생",
    },
  ];

  return (
    <body className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/logo2.webp"
          alt="농뷰 로고"
          width={150}
          height={63.75}
          quality={100}
          unoptimized
          priority
        />
        <section className={styles.headLine}>
          <h1 className={styles.headLineTitle}>오늘의 뉴스📢</h1>
          <article className={styles.headLineContent}>
            <div className={styles.tickerWrapper}>
              {newsList.map(({ link, text }, index) => (
                <Link
                  key={`news-${index}`}
                  href={link}
                  className={styles.tickerItem}
                  target="_blank"
                >
                  {text}
                </Link>
              ))}
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
            <span>
              농산물 가격 데이터에 대해 궁금한 게 있으면 질문하세유~!​
            </span>
          </p>
          <div className={styles.chatPlaceholder}>
            <Chat />
          </div>
        </section>
      </main>
      <footer className={styles.footer}></footer>
    </body>
  );
}
