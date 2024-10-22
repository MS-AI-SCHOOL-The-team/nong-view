import Image from "next/image";
import styles from "./page.module.css"
import Link from "next/link";

export default function () {
    return <body className={styles.body}>
        <Image className={styles.backgroud} src="/home_bg.webp" fill={true} alt="배경 이미지" quality={100} unoptimized />
        <section className={styles.container}>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>“농산물 가격 예측 정보” 제공 시스템</h1>
                    <h2 className={styles.subTitle}>머신러닝, AI 기술을 활용한</h2>
                    <div className={styles.logo}>
                        <Image src="/logo.webp" alt="농뷰 로고" width={356} height={152} quality={100} unoptimized />
                    </div>
                </header>
                <main className={styles.main}>
                    <div className={styles.userGuide}>
                        <p className={styles.guideCaption}>농산물 가격 변동을 한눈에! AI가 예측한 가격 정보를 챗봇과의 대화로 알아보세요. 지금 농뷰에서 경험하세요😄</p>
                        <Link href="/dashboard" className={styles.startButton}>START</Link>
                    </div>
                </main>
                <Image className={styles.farmer} src="/home_farmer.webp" width={300} height={400} alt="농부 이미지"></Image>
                <Image className={styles.grass} src="/home_grass.webp" width={400} height={375} alt="풀 이미지"></Image>
            </article>
        </section >
    </body >
}