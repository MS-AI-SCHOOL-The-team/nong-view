"use client";

import { useRef } from "react";
import styles from "./chat.module.css";

export default function () {
    const dialogRef = useRef();

    const handleOpenManual = () => {
        dialogRef.current.showModal();
    }

    const handleCloseManual = () => {
        dialogRef.current.close();
    }

    return <>
        <dialog className={styles.manual} ref={dialogRef} aria-labelledby="manualTitle">
            <h3 id="manualTitle">AI 채팅 가이드 </h3>
            <h4>질문은 구체적으로!</h4>
            <ul>
                <li>질문이 구체적일수록 AI가 더 좋은 답을 줄 수 있어요.</li>
                <ul>
                    <li>예시1: "겨울 배추 가격은 어떻게 될까?"</li>
                    <li>예시2: "10월 말 감자 값이 떨어질까?"</li>
                </ul>
            </ul>
            <h4>하나씩 차근차근!</h4>
            <ul>
                <li>복잡한 질문은 나눠서 물어보면 더 정확해요.</li>
                <ul>
                    <li>예시1: "유가가 농산물 가격에 미치는 영향은?"</li>
                    <li>예시2: "그 영향이 얼마나 오래 갈까?"</li>
                </ul>
            </ul>



            <button type="button" onClick={handleCloseManual}>닫기</button>
        </dialog >
        <button className={styles.manualButton} type="button" title="도움말" aria-label="도움말 열기" onClick={handleOpenManual}>?</button>
    </>
}