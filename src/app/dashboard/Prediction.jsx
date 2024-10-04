"use client"

import { useState } from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../../component/Chart"), { ssr: false });

const items = [
    "배추", "무", "양파", "사과", "배", "건고추", "깐마늘", "감자", "대파", "상추"
];


export default function () {
    const [selectedItem, setSelectedItem] = useState("배추");

    const handleItemChange = (event) => {
        setSelectedItem(event.target.id);
    };

    return (
        <>
            <h1>농산물 가격 AI 예측</h1>
            <p className={styles.note}>※ 중복 선택 불가</p>
            <div className={styles["checkbox-container"]}>
                {items.map((item) => (
                    <label key={item} className={styles.label} htmlFor={item}>
                        <input
                            className={styles.checkbox}
                            type="radio"
                            name="item"
                            id={item}
                            checked={selectedItem === item}
                            onChange={handleItemChange}
                        />
                        {item}
                    </label>
                ))}
            </div>
            <article className={styles["chart-box"]}>
                <Chart selectedItem={selectedItem} />
            </article>
        </>
    );
}