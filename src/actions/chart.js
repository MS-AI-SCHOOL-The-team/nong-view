"use server";

import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse"
import { promisify } from 'util';

const parseCSV = promisify(parse);

function getDateRange(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const allPatterns = [
        '0101', '0111', '0121', '0201', '0211', '0221', '0301', '0311', '0321',
        '0401', '0411', '0421', '0501', '0511', '0521', '0601', '0611', '0621',
        '0701', '0711', '0721', '0801', '0811', '0821', '0901', '0911', '0921',
        '1001', '1011', '1021', '1101', '1111', '1121', '1201', '1211', '1221'
    ];

    let currentPattern = `${String(month).padStart(2, '0')}${day <= 10 ? '01' : day <= 20 ? '11' : '21'}`;
    let currentIndex = allPatterns.indexOf(currentPattern);

    let result = [];

    for (let i = -3; i <= 3; i++) {
        let index = (currentIndex + i + allPatterns.length) % allPatterns.length;
        let pattern = allPatterns[index];

        let patternMonth = parseInt(pattern.slice(0, 2));
        let yearStr = year.toString();

        if (i < 0 && patternMonth > month) {
            yearStr = (year - 1).toString();
        } else if (i > 0 && patternMonth < month) {
            yearStr = (year + 1).toString();
        }

        result.push(`${yearStr}${pattern}`);
    }

    return result;
}

export async function getChartData() {
    try {
        // 실제 데이터 CSV 파일 읽기
        const filePath = path.join(process.cwd(), 'src/output', 'processed_대파.csv');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const records = await parseCSV(fileContent, { columns: true, skip_empty_lines: true });

        // 예측값 CSV 파일 읽기
        const predictionFilePath = path.join(process.cwd(), 'src/output', '예측값.csv');
        const predictionFileContent = await fs.readFile(predictionFilePath, 'utf-8');
        const predictionRecords = await parseCSV(predictionFileContent, { columns: true, skip_empty_lines: true });

        const currentDate = new Date();
        const periods = getDateRange(currentDate);

        const processedData = periods.reduce((acc, period) => {
            acc[period] = {
                특: 0,
                상: 0,
                중: 0,
                하: 0,
                총거래물량: 0,
                평균가격: 0,
                예측가격: 0
            };
            return acc;
        }, {});

        records.forEach(record => {
            const recordDate = record.시점;
            if (periods.includes(recordDate)) {
                processedData[recordDate] = {
                    특: parseFloat(record.특) || 0,
                    상: parseFloat(record.상) || 0,
                    중: parseFloat(record.중) || 0,
                    하: parseFloat(record.하) || 0,
                    총거래물량: parseFloat(record.총거래물량) || 0,
                    평균가격: parseFloat(record.평균가격) || 0,
                    예측가격: 0  // 초기값 설정
                };
            }
        });

        // 대파 예측값 찾기 및 처리
        const 대파예측 = predictionRecords.find(record => record.품목 === '대파');
        if (대파예측) {
            const predictionColumns = Object.keys(대파예측).filter(key => key !== '품목');
            const currentIndex = predictionColumns.indexOf('T');

            if (currentIndex !== -1) {
                const relevantPredictions = predictionColumns.slice(currentIndex - 3, currentIndex + 4);
                relevantPredictions.forEach((predCol, index) => {
                    const period = periods[index];
                    if (processedData[period]) {
                        processedData[period].예측가격 = parseFloat(대파예측[predCol]) || 0;
                    }
                });
            }
        }

        const chartData = {
            categories: periods,
            특: [],
            상: [],
            중: [],
            하: [],
            총거래물량: [],
            평균가격: [],
            예측가격: []
        };

        periods.forEach(period => {
            const data = processedData[period];
            chartData.특.push(data.특);
            chartData.상.push(data.상);
            chartData.중.push(data.중);
            chartData.하.push(data.하);
            chartData.총거래물량.push(data.총거래물량);
            chartData.평균가격.push(data.평균가격);
            chartData.예측가격.push(data.예측가격);
        });

        return JSON.parse(JSON.stringify(chartData));
    } catch (error) {
        console.error('Error in getChartData:', error);
        return null;
    }
}