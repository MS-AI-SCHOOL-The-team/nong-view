"use client";

import { useState, useRef, useEffect } from 'react';
import styles from "./chat.module.css";
import postChat from "../actions/chat";
import { useFormStatus } from 'react-dom';

const ChatButton = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={styles.button}></button>
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
    const chatWrapperRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (chatWrapperRef.current) {
            chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (formData) => {
        const question = formData.get("question");
        if (!question.trim()) return;

        setMessages(prev => [...prev, { role: 'You', content: question }]);
        setInputValue('');

        try {
            const response = await postChat(question);

            setMessages(prev => [...prev, { role: '농뷰 AI', content: response.choices[0].message.content }]);
        } catch (error) {
            console.error('Error posting chat:', error);
            setMessages(prev => [...prev, { role: '농뷰 AI', content: '죄송합니다. 오류가 발생했습니다.' }]);
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
        <>
            <section className={styles.chatArea} ref={chatWrapperRef}>
                {messages.length === 0 ? <article className={styles.suggestions}>
                    <button className={styles.suggestionButton} onClick={() => handleClickSuggestion("겨울철 양파의 가격 전망을 알려주세요")} disabled={isSuggestionSelected}>
                        겨울철 양파의 가격 전망을 알려주세요
                    </button>
                    <button className={styles.suggestionButton} onClick={() => handleClickSuggestion("이번 주 사과 가격 변동이 클까요?")} disabled={isSuggestionSelected}>
                        이번 주 사과 가격 변동이 클까요?
                    </button>
                    <button className={styles.suggestionButton} onClick={() => handleClickSuggestion("최근에 비가 왔는데, 건고추의 가격에 영향을 줄까요?")} disabled={isSuggestionSelected}>
                        최근에 비가 왔는데, 건고추의 가격에 영향을 줄까요?
                    </button>
                </article> : messages.map((message, index) => (
                    <article key={index}>
                        <h3>{message.role}</h3>
                        <p>{message.content}</p>
                    </article>
                ))}
            </section>
            <form className={styles.form} action={handleSubmit} ref={formRef}>
                <TextBox
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onCtrlEnter={handleCtrlEnter}
                />
                <ChatButton />
            </form>
        </>
    );
}