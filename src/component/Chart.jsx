"use client"

import ApexCharts from 'apexcharts'
import { useEffect, useRef } from 'react'

export default function ({ chartData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            series: chartData ? [
                { name: '현재가격(원/kg)', type: 'line', data: chartData.평균가격?.map(price => parseFloat(price)).slice(0, 4) || [] },
                { name: '예측가격(원/kg)', type: 'line', data: chartData.예측가격?.map(price => parseFloat(price)) || [] },
                { name: '거래량(kg)', type: 'column', data: chartData.총거래물량?.slice(0, 4) || [] },
            ] : [],
            chart: {
                width: '100%',
                height: '100%',
                type: 'line',
                stacked: false,
                toolbar: { show: true },
            },
            noData: {
                text: '정보를 불러오는 중이에유~⏳',
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    fontSize: '1.5em',
                    color: '#000'
                }
            },
            grid: {
                padding: {
                    left: -10,
                    right: -15
                }
            },
            dataLabels: { enabled: false },
            stroke: {
                width: [2, 2, 4],
                curve: 'smooth',
            },
            colors: ['#008FFB', '#00E396', '#FEB019'],
            xaxis: {
                categories: chartData?.categories?.map((date) =>
                    `${date.slice(-4, -2)}${date.slice(-2) === '01' ? "상순" : date.slice(-2) === '11' ? "중순" : "하순"}`) || [],
            },
            yaxis: chartData ? [
                {
                    labels: {
                        style: { colors: '#008FFB' },
                        formatter: function (val) {
                            return val?.toFixed(0);
                        },
                        offsetX: -15,
                    },
                    min: Math.max(0, Math.min(...chartData.평균가격) - (Math.max(...chartData.평균가격) - Math.min(...chartData.평균가격)) * 0.1),
                    max: Math.max(...chartData.평균가격, ...chartData.예측가격) + (Math.max(...chartData.평균가격, ...chartData.예측가격) - Math.min(...chartData.평균가격, ...chartData.예측가격)) * 0.1,
                },
                {
                    title: { text: "가격 (원/kg)", style: { color: '#00E396' } },
                    labels: { style: { colors: '#00E396' } },
                    min: Math.max(0, Math.min(...chartData.평균가격) - (Math.max(...chartData.평균가격) - Math.min(...chartData.평균가격)) * 0.1),
                    max: Math.max(...chartData.평균가격, ...chartData.예측가격) + (Math.max(...chartData.평균가격, ...chartData.예측가격) - Math.min(...chartData.평균가격, ...chartData.예측가격)) * 0.1,
                    opposite: true,
                    show: false,
                },
                {
                    labels: {
                        style: { colors: '#FEB019', },
                        formatter: function (val) {
                            if (val >= 100000000) {
                                return (val / 100000000).toFixed(0) + '억';
                            } else if (val >= 10000) {
                                return (val / 10000).toFixed(0) + '만';
                            } else if (val >= 1000) {
                                return (val / 1000).toFixed(0) + '천';
                            } else {
                                return val?.toFixed(0);
                            }
                        },
                        offsetX: -20
                    },
                    opposite: true,
                },
            ] : [],
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

                    tooltip += addTooltipRow('현재가격', `${series[0][dataPointIndex]?.toFixed(0) ?? 0} 원/kg`, w.globals.colors[0]);
                    tooltip += addTooltipRow('예측가격', `${series[1][dataPointIndex]?.toFixed(0) ?? 0} 원/kg`, w.globals.colors[1]);
                    tooltip += addTooltipRow('거래량', `${series[2][dataPointIndex]?.toFixed(0) ?? 0} kg`, w.globals.colors[2]);

                    const additionalData = ['특', '상', '중', '하'];
                    const additionalColors = ['#FF4560', '#775DD0', '#4CAF50', '#FF9800'];
                    additionalData.forEach((item, index) => {
                        const value = chartData?.[item] && chartData[item][dataPointIndex]
                            ? chartData[item][dataPointIndex]?.toFixed(0)
                            : '0';
                        tooltip += addTooltipRow(item, `${value} 원/kg`, additionalColors[index]);
                    });

                    tooltip += '</div>';
                    return tooltip;
                }
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: -15
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