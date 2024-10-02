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
                        text: question
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