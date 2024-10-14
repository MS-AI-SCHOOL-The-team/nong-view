"use client"

import ApexCharts from 'apexcharts'
import { useEffect, useRef } from 'react'

export default function ({ selectedItem }) {
    const chartRef = useRef(null);

    const selectedItems = {
        "배추": [1.4, 2, 2.5, 1.5, 0, 0, 0],
        "무": [3.8, 2.8, 2.5, 1.5, 0, 0, 0]
    }

    useEffect(() => {
        // 추가 항목들을 위한 별도의 데이터 배열
        var additionalData = [
            { name: '특', data: [5, 10, 15, 20, 25, 30, 35] },
            { name: '상', data: [2, 4, 6, 8, 10, 12, 14] },
            { name: '중', data: [2, 4, 6, 8, 10, 12, 14] },
            { name: '하', data: [2, 4, 6, 8, 10, 12, 14] },
            { name: '6등급', data: [2, 4, 6, 8, 10, 12, 14] }
        ];

        var options = {
            series: [{
                name: '현재가격',
                type: 'line',
                data: selectedItems[selectedItem] || []
            }, {
                name: '예측가격',
                type: 'line',
                data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5]
            }, {
                name: '거래량',
                type: 'column',
                data: [20, 29, 37, 36, 0, 0, 0]
            }],
            chart: {
                height: '100%',
                type: 'line',
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },
            title: {
                text: `${selectedItem} 가격, 거래량(9월 중순 - 11월 중순)`,
                align: 'left',
                offsetX: 110
            },
            xaxis: {
                categories: ['9월 중순', '9월 하순', '10월 상순', '10월 중순', '10월 하순', '11월 상순', '11월 중순'],
            },
            yaxis: [
                {
                    seriesName: 'Income',
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "가격 (원/kg)",
                        style: {
                            color: '#008FFB',
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'Revenue',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019'
                    },
                    labels: {
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: "거래량 (kg)",
                        style: {
                            color: '#FEB019',
                        }
                    }
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft',
                    offsetY: 30,
                    offsetX: 60
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    let tooltip = '<div class="arrow_box" style="padding:10px;">';

                    function addTooltipRow(name, value, color) {
                        return `<div style="display:flex;align-items:center;margin:5px 0;">
                            <span style="width:10px;height:10px;border-radius:50%;background-color:${color};display:inline-block;margin-right:5px;"></span>
                            <span style="flex:1;">${name}: </span>
                            <span style="font-weight:bold;">${value}</span>
                        </div>`;
                    }

                    w.config.series.forEach((ser, i) => {
                        tooltip += addTooltipRow(ser.name, series[i][dataPointIndex], w.globals.colors[i]);
                    });

                    // 추가 항목들을 툴팁에 포함
                    additionalData.forEach((item, i) => {
                        tooltip += addTooltipRow(item.name, item.data[dataPointIndex], w.globals.colors[w.config.series.length + i]);
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
    }, [selectedItem]);

    return <div id="chart" />
}
