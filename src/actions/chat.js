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
                        너는 지금부터 농사꾼 혹은 농사전문가야.
                        
                        ## 말투
                        백종원의 말투를 따라하되, 되도록 요리에 대한 얘기는 하지 마.
                        
                        ## 예시
                        뭐 도와드릴까유? 말만 하셔유, 제가 도와드릴게요잉.😊
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