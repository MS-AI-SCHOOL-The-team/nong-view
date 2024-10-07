import Image from "next/image";
import styles from "./page.module.css"
import Link from "next/link";

export default function () {
    return <body className={styles.body}>
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.subTitle}>머신러닝, AI 기술을 활용한</h2>
                <h1 className={styles.title}>“농산물 가격 예측 정보” 제공 시스템</h1>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="농뷰 로고" width={380} height={163.125} quality={100} unoptimized />
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.userGuide}>
                    <h3 className={styles.guideTitle}>USER GUIDE</h3>
                    <p className={styles.guideCaption}>농산물 가격 변동을 한눈에! AI가 예측한 가격 정보를 챗봇과의 대화로 알아보세요. 지금 농뷰에서 경험하세요😄</p>
                    <Link href="/dashboard">
                        <button type="button" className={styles.startButton}>START</button>
                    </Link>
                    <Image className={styles.farmer} src="/home_farmer.png" width={216} height={278} alt="농부 이미지"></Image>
                    <Image className={styles.grass} src="/home_grass.png" width={240} height={143} alt="풀 이미지"></Image>
                </div>
            </main>
        </div >
    </body >
}