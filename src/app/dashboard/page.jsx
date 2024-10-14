import Image from "next/image";
import Chat from "../../component/Chat";
import styles from "./page.module.css";
import Prediction from "./Prediction";
import ChatManual from "@/component/ChatManual";

export default function () {
  function getRandomItems(arr, count) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  const suggestionMessages = [
    "다음 달 양파의 평균 가격은 어떻게 될까? ",
    "겨울철 배추의 가격 전망은 어떻게 돼? ",
    "최근에 비가 왔는데, 사과 가격에 영향을 줄까? ",
    "월별 농산물 가격 변동 패턴을 알려줘. ",
    "다음 주 감자의 가격은 어떻게 될까? ",
    "상추 가격은 언제부터 오를까? ",
    "이번 달 무의 가격 변동은 어떨까? ",
    "이번 해 농산물 가격 트렌드를 알려줘. ",
    "코로나19가 대파 가격에 미친 영향은 뭐야? ",
    "수출 증가가 고추 가격에 영향을 줄까? ",
    "10월에 배추의 평균 가격은 어떻게 될까? ",
    "추석 이후 사과 가격은 어떤 변화가 있을까? ",
    "최근 태풍이 무 가격에 영향을 줬을까? ",
    "이번 주 대파 가격은 얼마나 오를까? ",
    "김장철을 앞두고 배추 가격은 언제부터 안정될까? ",
    "10월 말에 감자 가격이 하락할 가능성이 있을까? ",
    "최근 유가 상승이 농산물 가격에 어떤 영향을 줄까? ",
  ];

  const randomThreeItems = getRandomItems(suggestionMessages, 3);

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
            <Chat suggestionMessages={randomThreeItems} />
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
      </footer>
    </body>
  );
}
