"use client"

import { getChartData } from "@/actions/chart";
import DataReference from "@/component/DataReference";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const Chart = dynamic(() => import("../../component/Chart"), { ssr: false });

const items = [
    "마늘", "배추", "무", "양파", "사과", "배", "건고추", "감자", "대파", "상추"
];

export default function ({ data }) {
    const [selectedItem, setSelectedItem] = useState("마늘");
    const [chartData, setChartData] = useState({
        "마늘": data
    });

    useEffect(() => {
        async function fetchData() {
            const data = await getChartData(selectedItem);

            setChartData({
                [selectedItem]: data,
                ...chartData
            });
        }

        if (!chartData[selectedItem])
            fetchData();
    }, [selectedItem]);

    const handleItemChange = (event) => {
        setSelectedItem(event.target.id);
    };

    return (
        <>
            <div className={styles.chartHeader}>
                <h2>농산물 가격 AI 예측</h2>
                <DataReference />
            </div>
            <p className={styles.note}>※ 중복 선택 불가</p>
            <div className={styles.checkboxContainer}>
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
            <article className={styles.chartBox}>
                <Chart chartData={chartData[selectedItem]} />
            </article>
        </>
    );
}