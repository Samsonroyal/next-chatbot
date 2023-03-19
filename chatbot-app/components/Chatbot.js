import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
        const [messages, setMessages] = useState([]);
        const [inputValue, setInputValue] = useState('');
        const [isTyping, setIsTyping] = useState(false); // Added state for typing indicator

        const handleMessageSend = async() => {
            if (inputValue) {
                setMessages([...messages, { text: inputValue, isUserMessage: true }]);
                setInputValue('');
                setIsTyping(true); // Show typing indicator when user sends message

                try {
                    const response = await axios.post('/chat', {
                        message: inputValue,
                    });

                    const botMessage = response.data.message;
                    setMessages([...messages, { text: botMessage, isUserMessage: false }]);
                } catch (error) {
                    console.error(error);
                }

                setIsTyping(false); // Hide typing indicator after bot responds
            }
        };

        const handleInputChange = (event) => {
            setInputValue(event.target.value);
        };

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleMessageSend();
            }
        };

        return ( <
            div className = "chatbot-container" >
            <
            div className = "chatbot-message-container" > {
                messages.map((message, index) => ( <
                    div key = { index }
                    className = { `chatbot-message ${message.isUserMessage ? 'user' : 'bot'}` } >
                    { message.text } <
                    /div>
                ))
            } {
                isTyping && < div className = "chatbot-typing-indicator" > Typing... < /div>} {/ * Typing indicator * /} <
                    /div> <
                    div className = "chatbot-input-container" >
                    <
                    input
                className = "chatbot-input"
                type = "text"
                placeholder = "Type your message here..."
                value = { inputValue }
                onChange = { handleInputChange }
                onKeyPress = { handleKeyPress }
                /> <
                button className = "chatbot-send-button"
                onClick = { handleMessageSend } >
                    Send <
                    /button> <
                    /div> <
                    /div>
            );
        };

        export default Chatbot;