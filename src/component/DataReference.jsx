"use client";

import { useRef } from "react";
import styles from "./chat.module.css";
import Image from "next/image";
import Link from "next/link";

export default function () {
    const dialogRef = useRef();

    const handleOpenManual = () => {
        dialogRef.current.showModal();
    }

    const handleCloseManual = () => {
        dialogRef.current.close();
    }

    return <>
        <dialog className={styles.reference} ref={dialogRef} aria-labelledby="referenceTitle">
            <h3 id="referenceTitle">데이터 출처</h3>
            <p> 예측 모델 학습 및 실제 가격 정보는 아래 사이트 정보를 참고하였습니다.​</p>
            <ul>
                <li>농넷 (<Link className={styles.referenceLink} href="https://www.nongnet.or.kr/" target="_blank">바로가기</Link>)</li>
                <li>기상청 API 허브 (<Link className={styles.referenceLink} href="https://apihub.kma.go.kr/ " target="_blank">바로가기</Link>)</li>
                <li>한국은행 경제 통계 시스템 (<Link className={styles.referenceLink} href="https://ecos.bok.or.kr/" target="_blank">바로가기</Link>)</li>
                <li>기상청 자료 개발 포털 (<Link className={styles.referenceLink} href="https://data.kma.go.kr/stcs/grnd/grndTaList.do" target="_blank">바로가기</Link>)</li>
            </ul>
            <div className={styles.closeManualButtonArea}>
                <button className={styles.closeManualButton} type="button" onClick={handleCloseManual}>닫기</button>
            </div>
        </dialog >
        <button className={styles.infoButton} type="button" title="정보" aria-label="정보 열기" onClick={handleOpenManual}>
            <Image src="/info_resize.png" width={40} height={40} quality={75} alt="정보 이미지"></Image>
        </button>
    </>
}