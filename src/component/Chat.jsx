"use client";

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import postChat from "../actions/chat";
import styles from "./chat.module.css";
import Image from 'next/image';
import { MDXContent } from "./MDXContent"

const ChatButton = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={styles.button}>
            <Image src="/arrow.webp" width={18} height={20} alt="전송" quality={100} unoptimized />
        </button>
    );
};

const TextBox = ({ value, onChange, onCtrlEnter }) => {
    const { pending } = useFormStatus();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            onCtrlEnter();
        }
    };

    return (
        <textarea
            className={styles.textbox}
            name="question"
            id="question"
            placeholder={pending ? "처리중입니다..." : "질문을 입력하세요..."}
            rows="3"
            disabled={pending}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
        ></textarea>
    );
};

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
    const messageListRef = useRef(null);
    const formRef = useRef(null);
    const [randomThreeItems, setRandomThreeItems] = useState([]);

    function getRandomItems(arr, count) {
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    const suggestionMessages = [
        "다음 달 양파의 평균 가격은 어떻게 될까?",
        "겨울철 배추의 가격 전망은 어떻게 돼?",
        "최근에 비가 왔는데, 사과 가격에 영향을 줄까?",
        "월별 무 가격 변동 패턴을 알려줘.",
        "다음 주 감자의 가격은 어떻게 될까?",
        "상추 가격은 언제부터 오를까?",
        "이번 달 무의 가격 변동은 어떨까?",
        "이번 해 감자 가격 트렌드를 알려줘.",
        "코로나19가 대파 가격에 미친 영향은 뭐야?",
        "수출 증가가 건고추 가격에 영향을 줄까?",
        "10월에 배추의 평균 가격은 어떻게 될까?",
        "추석 이후 사과 가격은 어떤 변화가 있을까?",
        "최근 태풍이 무 가격에 영향을 줬을까?",
        "이번 주 대파 가격은 얼마나 오를까?",
        "김장철을 앞두고 배추 가격은 언제부터 안정될까?",
        "10월 말에 감자 가격이 하락할 가능성이 있을까?",
        "최근 유가 상승이 감자 가격에 어떤 영향을 줄까?",
    ];

    useEffect(() => {
        setRandomThreeItems(getRandomItems(suggestionMessages, 3));
    }, []);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (formData) => {
        const question = formData.get("question");
        if (!question.trim()) return;

        setMessages(prev => [...prev, { role: 'You', content: question }]);
        setInputValue('');

        try {
            const newMessages = [...messages.slice(-8).map(({ role, content }) => ({
                role: role === "You" ? "user" : "assistant",
                content
            })), { role: 'user', content: question }];

            const response = await postChat(newMessages);
            setMessages(prev => [...prev, {
                role: '농뷰 AI',
                content: response.choices[0].message.content
            }]);
        } catch (error) {
            console.error('Error posting chat:', error);
            setMessages(prev => [...prev, {
                role: '농뷰 AI',
                content: '죄송합니다. 오류가 발생했습니다.'
            }]);
        }
    };

    const handleCtrlEnter = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const handleClickSuggestion = (suggestion) => {
        setInputValue(suggestion);
        setIsSuggestionSelected(true);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        }, 0);
    }

    return (
        <div className={styles.chatArea}>
            <div className={styles.messageList} ref={messageListRef}>
                {messages.length === 0 ? (
                    <article className={styles.suggestions}>
                        {randomThreeItems.map((message, index) => (
                            <button
                                key={index}
                                className={styles.suggestionButton}
                                onClick={() => handleClickSuggestion(message)}
                                disabled={isSuggestionSelected}
                            >
                                {message}
                            </button>
                        ))}
                    </article>
                ) : (
                    messages.map((message, index) => (
                        <article key={index}>
                            <h3>{message.role}</h3>
                            <MDXContent content={message.content} />
                        </article>
                    ))
                )}
            </div>
            <form className={styles.form} action={handleSubmit} ref={formRef}>
                <TextBox
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onCtrlEnter={handleCtrlEnter}
                />
                <ChatButton />
            </form>
        </div>
    );
}