import Image from "next/image";
import styles from "./page.module.css"
import Link from "next/link";

export default function () {
    return <body className={styles.body}>
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>머신러닝, AI 기술을 활용한</h2>
                <h1>“농산물 가격 예측 정보” 제공 시스템</h1>
            </header>

            <div className={styles.logo}>
                <Image src="/logo.png" alt="농뷰 로고" width={380} height={163.125} quality={100} unoptimized />
            </div>

            <div className={styles["user-guide"]}>
                <h3>USER GUIDE</h3>
                <p>가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다. 가이드입니다.</p>
            </div>

            <Link href="/dashboard">
                <button className={styles["start-button"]}>START</button>
            </Link>

            <footer className={styles.footer}>
                <p>By. MS AI School 4기 그팀</p>
            </footer>
        </div>
    </body>
}