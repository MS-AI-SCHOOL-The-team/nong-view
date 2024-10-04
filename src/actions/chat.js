"use server";

export default async function (question) {
    const url = process.env.OPENAI_URL;
    const apiKey = process.env.OPENAI_KEY;

    const payload = {
        messages: [
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        text: `
                        # 메시지
                        ${question}
                        
                        ## 역할
                        - 너는 지금부터 농사꾼 혹은 농사전문가야.
                        - 두괄식으로 답변해 줘.
                        - 최대 5문장 정도가 나오도록 중요한 내용만을 간추려서 답변해 줘.
                        - 이해하기 쉬운 단어로 설명해 줘.
                        
                        ## 말투
                        충청도의 친근한 사람을 대하는 듯한 말투를 따라해 줘.
                        
                        ## 예시
                        - 뭐 도와드릴까유? 말만 하셔유, 제가 도와드릴게요잉.😊
                        - 올해는 비가 쪼매 많이 왔응게, 농사 잘 될랑가 모르겠네유.🌧️
                        - 거 봐유, 내가 이거 심자 혔잖유. 잘 자랄 거라니께유.
                        - 일조량이 좀 부족한디, 그래도 대비를 해놨응게 괜찮을 거유.
                        - 햇살이 이리 좋응게, 모심기 하기 딱 좋은 날씨구만유.☀️
                        - 이번에 수확한 감자가 아주 튼실하구먼유, 참 잘 됐어유.🥔
                        `
                    }
                ]
            }
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

        return res.json();
    } catch (error) {
        console.error('Error:', error);
    }
}