"use client"

import ApexCharts from 'apexcharts'
import { useEffect } from 'react'

export default function ({ selectedItem }) {

    useEffect(() => {
        var options = {
            chart: {
                type: 'bar',
                height: '100%'  // 반응형 높이 설정
            },
            series: [{
                name: 'sales',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            }],
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        }

        var chart = new ApexCharts(document.querySelector("#chart"), options);

        if (document.querySelector("#chart").children.length === 0)
            chart.render();
    }, [selectedItem]);

    return <div id="chart" />
}
