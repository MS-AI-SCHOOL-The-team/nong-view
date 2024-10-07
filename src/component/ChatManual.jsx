"use client";

import { useRef } from "react";
import style from "./chat.module.css";

export default function () {
    const dialogRef = useRef();

    const handleOpenManual = () => {
        dialogRef.current.showModal();
    }

    const handleCloseManual = () => {
        dialogRef.current.close();
    }

    return <>
        <dialog ref={dialogRef} className={style.manual}>
            <h3>AI 채팅 사용 방법</h3>
            <p>채팅 사용 방법에 대한 가이드 채팅 사용 방법에 대한 가이드 채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드채팅 사용 방법에 대한 가이드</p>
            <button type="button" onClick={handleCloseManual}>닫기</button>
        </dialog>
        <button type="button" onClick={handleOpenManual}>도움말</button>
    </>
}