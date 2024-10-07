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
            <h3 id="manualTitle">AI 채팅 사용 방법</h3>
            <p>채팅 사용 방법에 대한 가이드 채팅 사용 방법에 대한 가이드 채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드</p>
            <button type="button" onClick={handleCloseManual}>닫기</button>
        </dialog >
        <button className={styles.manualButton} type="button" title="도움말" aria-label="도움말 열기" onClick={handleOpenManual}>?</button>
    </>
}