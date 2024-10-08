"use client"

import ApexCharts from 'apexcharts'
import { useEffect } from 'react'

export default function ({ selectedItem }) {

    useEffect(() => {
        // 추가 항목들을 위한 별도의 데이터 배열
        var additionalData = [
            { name: 'New Item 1', data: [5, 10, 15, 20, 25, 30, 35] },
            { name: 'New Item 2', data: [2, 4, 6, 8, 10, 12, 14] }
        ];

        var options = {
            series: [{
                name: 'Income',
                type: 'column',
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8]
            }, {
                name: 'Cashflow',
                type: 'column',
                data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5]
            }, {
                name: 'Revenue',
                type: 'line',
                data: [20, 29, 37, 36, 44, 45, 50]
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
                text: 'XYZ - Stock Analysis (2009 - 2016)',
                align: 'left',
                offsetX: 110
            },
            xaxis: {
                categories: ['9월 상순', '9월 중순', '9월 하순', '10월 상순', '10월 중순', '10월 하순', '11월 상순'],
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
                        text: "Income (thousand crores)",
                        style: {
                            color: '#008FFB',
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'Cashflow',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        }
                    },
                    title: {
                        text: "Operating Cashflow (thousand crores)",
                        style: {
                            color: '#00E396',
                        }
                    },
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
                        text: "Revenue (thousand crores)",
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

        var chart = new ApexCharts(document.querySelector("#chart"), options);

        if (document.querySelector("#chart").children.length === 0)
            chart.render();
    }, [selectedItem]);

    return <div id="chart" />
}
