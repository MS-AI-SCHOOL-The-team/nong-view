"use client"

import ApexCharts from 'apexcharts'
import { useEffect, useRef } from 'react'

export default function ({ chartData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartData) return;

        // 데이터 전처리 및 y축 범위 계산
        const currentPrices = chartData.평균가격?.map(price => parseFloat(price)) || [];
        const predictionPrices = chartData.예측가격?.map(price => parseFloat(price)) || [];
        const allPrices = [...currentPrices, ...predictionPrices].filter(price => !isNaN(price));
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);
        const priceRange = maxPrice - minPrice;

        var options = {
            series: [
                { name: '현재가격', type: 'line', data: currentPrices },
                { name: '예측가격', type: 'line', data: predictionPrices },
                { name: '거래량', type: 'column', data: chartData.총거래물량 || [] },
            ],
            chart: {
                height: '100%',
                type: 'line',
                stacked: false,
                toolbar: { show: false }
            },
            dataLabels: { enabled: false },
            stroke: {
                width: [2, 2, 4],
                curve: 'smooth',
            },
            colors: ['#008FFB', '#00E396', '#FEB019'],
            xaxis: {
                categories: chartData.categories.map((date) => `${date.slice(-4, -2)}월 ${date.slice(-2) === '01' ? "상순" : date.slice(-2) === '11' ? "중순" : "하순"}`),
            },
            yaxis: [
                {
                    title: { text: "가격 (원/kg)", style: { color: '#008FFB' } },
                    labels: { style: { colors: '#008FFB' } },
                    min: Math.max(0, minPrice - priceRange * 0.1),
                    max: maxPrice + priceRange * 0.1,
                },
                {
                    title: { text: "가격 (원/kg)", style: { color: '#00E396' } },
                    labels: { style: { colors: '#00E396' } },
                    min: Math.max(0, minPrice - priceRange * 0.1),
                    max: maxPrice + priceRange * 0.1,
                    opposite: true,
                    show: false,
                },
                {
                    title: { text: "거래량 (kg)", style: { color: '#FEB019', } },
                    labels: { style: { colors: '#FEB019', } },
                    opposite: true,
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    let tooltip = '<div class="arrow_box" style="padding:10px;">';

                    function addTooltipRow(name, value, color) {
                        return `<div style="display:flex;align-items:center;margin:5px 0;">
                            <span style="width:10px;height:10px;border-radius:50%;background-color:${color};display:inline-block;margin-right:5px;"></span>
                            <span style="flex:1;">${name}: </span>
                            <span style="font-weight:bold;">${value}</span>
                        </div>`;
                    }

                    // 현재가격, 예측가격, 거래량 데이터 추가
                    tooltip += addTooltipRow('현재가격', `${series[0][dataPointIndex].toFixed(0)} 원/kg`, w.globals.colors[0]);
                    tooltip += addTooltipRow('예측가격', `${series[1][dataPointIndex].toFixed(0)} 원/kg`, w.globals.colors[1]);
                    tooltip += addTooltipRow('거래량', `${series[2][dataPointIndex].toFixed(0)} kg`, w.globals.colors[2]);

                    // 특, 상, 중, 하 데이터 추가 (없는 경우 0으로 표시)
                    const additionalData = ['특', '상', '중', '하'];
                    const additionalColors = ['#FF4560', '#775DD0', '#4CAF50', '#FF9800'];
                    additionalData.forEach((item, index) => {
                        const value = chartData[item] && chartData[item][dataPointIndex]
                            ? chartData[item][dataPointIndex].toFixed(0)
                            : '0';
                        tooltip += addTooltipRow(item, `${value} 원/kg`, additionalColors[index]);
                    });

                    tooltip += '</div>';
                    return tooltip;
                }
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        };

        if (!chartRef.current) {
            chartRef.current = new ApexCharts(document.querySelector("#chart"), options);
            if (document.querySelector("#chart").children.length === 0)
                chartRef.current.render();
        } else {
            chartRef.current.updateOptions(options);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null
            }
        }
    }, [chartData]);

    return <div id="chart" />
}