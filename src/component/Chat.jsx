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

export default function Chat({ suggestionMessages }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
    const messageListRef = useRef(null);
    const formRef = useRef(null);

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
        <div className={styles.chatArea}>
            <div className={styles.messageList} ref={messageListRef}>
                {messages.length === 0 ? (
                    <article className={styles.suggestions}>
                        {suggestionMessages.map((message) => <button className={styles.suggestionButton} onClick={() => handleClickSuggestion(message)} disabled={isSuggestionSelected}>
                            {message}
                        </button>)}
                    </article>
                ) : (
                    messages.map((message, index) => (
                        <article key={index}>
                            <h3>{message.role}</h3>
                            <p>{message.content}</p>
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