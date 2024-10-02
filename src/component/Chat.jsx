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

const TextBox = ({ value, onChange }) => {
    const { pending } = useFormStatus();
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
        ></textarea>
    );
};

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatWrapperRef = useRef(null);

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

    return (
        <>
            <section className={styles["chat-wrapper"]} ref={chatWrapperRef}>
                {messages.map((message, index) => (
                    <article key={index}>
                        <h3>{message.role}</h3>
                        <p>{message.content}</p>
                    </article>
                ))}
            </section>
            <form className={styles.form} action={handleSubmit}>
                <TextBox
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <ChatButton />
            </form>
        </>
    );
}