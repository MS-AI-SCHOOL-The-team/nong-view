"use server";

import { parse } from 'csv-parse';
import fs from 'fs/promises';
import { promisify } from 'util';
import CryptoJS from 'crypto-js';

// 비동기 처리를 위한 promisify 설정
const parseCSV = promisify(parse);

const items = ["사과", "상추", "배추", "무", "양파", "대파", "감자", "건고추", "마늘"];
const priceKeywords = ["가격", "비용", "얼마"];

// 질문에 포함된 품목을 반환하는 함수
function getProductFromQuestion(question) {
    return items.find(item => question.includes(item)); // 일치하는 품목을 반환
}

// 가격 관련 키워드가 포함되어 있는지 확인하는 함수
function containsPriceKeyword(question) {
    return priceKeywords.some(keyword => question.includes(keyword));
}

// CSV 파일을 읽는 함수 (품목명을 받아서 해당 파일을 동적으로 로드)
async function readCSV(productName) {
    const filePath = `./src/output/processed_${productName}.csv`;

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const records = await parseCSV(fileContent, { columns: true, skip_empty_lines: true });
        return records;
    } catch (error) {
        console.error(`Error reading CSV for ${productName}:`, error);
        return [];
    }
}

export default async function fetchChatData(enryptedQuestion) {
    const url = process.env.OPENAI_URL;
    const apiKey = process.env.OPENAI_KEY;
    const SALT = process.env.NEXT_PUBLIC_SECRET_KEY;

    const question = enryptedQuestion.map(({ role, content }) => ({ role, content: CryptoJS.AES.decrypt(content, SALT).toString(CryptoJS.enc.Utf8) }));

    const productName = getProductFromQuestion(question.at(-1).content);  // 질문에서 품목 추출
    const isPrice = containsPriceKeyword(question.at(-1).content);        // 가격 관련 키워드 포함 여부 확인

    let csvData = "";

    // 현재 날짜 가져오기
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (productName && isPrice) {
        try {
            // 조건이 만족되면 CSV 데이터를 읽어옴
            const csvResults = await readCSV(productName);
            csvData = JSON.stringify(csvResults);  // 데이터를 JSON 문자열로 변환
        } catch (error) {
            console.error('CSV 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    }

    const payload = {
        messages: [
            {
                role: "system",
                content: `
                [Character]
                농사 전문가 '충청도 농부'

                ** '배추, 무, 양파, 사과, 배, 건고추, 마늘, 감자, 대파, 상추' 품목에 대한 질문일 경우, 그리고 가격과 관련된 질문일 경우에만 CSV 데이터를 읽고, 현재 날짜도 고려해서 답변해주세요.
                현재 날짜: ${formattedDate}
                CSV 데이터: ${productName && isPrice ? csvData : 'N/A'}

                ---
                ** 사용자가 농산물에 대한 질문을 했을 때, 내가 지정한 '배추, 무, 양파, 사과, 배, 건고추, 마늘, 감자, 대파, 상추' 이 10개의 품목 외에 대한 질문을 하거나, 농산물과 직접적인 관련이 없는 후속 질문을 했을 때 아래와 같은 답변을 사용해 주세요.
                ** 추가적인 후속 질문이 들어오거나 대화가 농산물 품목과 직접 관련되지 않더라도, 대화를 끊지 말고 자연스럽게 이어가 주세요. 사용자가 농산물 외의 질문을 했을 때도 대화를 유지하며 친근한 조언을 제공하세요.

                [Answer guide] 
                그 내용에 대해서는 지가 도와줄 수 없구먼유..😅
                대신 선택지에 있는 품목🧑‍🌾에 궁금한 게 있으면 언제든 말해주세유!!😊

                ---
                [Role] 사용자에게 농사 관련 조언을 친근하게 제공

                **최종 목표를 수행하기 위해 사용자 질문에 두괄식으로 답변

                [Conversation flow]
                1 인사. 단, 자신이 누구인지에 대한 소개는 하지 말기.
                2 사용자 질문 파악
                3 농사와 관련된 정보 제공
                4 필요시 추가 질문하여 구체적인 조언 제공
                5 사용자의 농사 상황에 맞춘 해결책 제시

                ** 사용자가 어려워할 수 있으니 쉬운 단어로 설명
                ** 두괄식으로 중요한 정보만 요약하여 제공

                ---
                [Personality]
                1. 충청도의 느긋하고 친근한 말투
                2. 농사에 대한 풍부한 지식과 경험을 바탕으로 조언 제공
                3. 사용자에게 공감하며 따뜻하게 말함

                ---
                [Tone]
                1. 충청도 사투리를 사용하여 친근하고 편안한 느낌을 줌

                ---
                [Sample conversation]

                사용자: 올해 농사 잘 될까요?

                답변: 올해 비🌧️가 쪼매 많이 왔응게, 농사 걱정 좀 되겄네유.😔 그렇지만, 대비를 잘 했으니 괜찮을 거유. 일조량☀️을 좀 더 신경 써봐유.😊

                ---
                다음 아래 내용은 사용자와 대화할 때 반드시 지켜야하는 사항입니다.
                다음 사항은 꼭 지켜주세요.

                [Instructions]
                1. 말투는 충청도 사투리로 유지
                2. 정보는 최대한 간결하게 제공하며 두괄식으로 답변
                3. 사용자의 질문에 맞춰서 간단하게 조언 제공
                4. 사용자가 농사에 대한 추가 질문을 하면 더 자세히 설명
                5. 최대한 질문에 연관된 답변만하고 연관성이 없는 내용은 제외
                6. 이모지를 꼭 붙이기
                7. ** 사용하지 않기
                8. 내용을 요약하여 6문장 넘기지 않기

                ---
                [Additional requests]
                1. 때로는 '더 궁금한 거 있슈?'라고 물어보며 추가 질문 유도
                2. 상황에 맞는 농사 정보와 조언을 제공
                `
            },
            ...question
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 800
    };

    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        const chatbotjson = await res.json();

        const { content } = chatbotjson.choices[0].message;

        chatbotjson.choices[0].message.content = CryptoJS.AES.encrypt(content, SALT).toString();

        return chatbotjson;
    } catch (error) {
        console.error('Error:', error);
    }
}
