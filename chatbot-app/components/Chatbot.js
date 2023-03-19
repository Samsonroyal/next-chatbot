import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
        const [input, setInput] = useState("");
        const [messages, setMessages] = useState([]);

        const handleMessageSubmit = async(event) => {
            event.preventDefault();
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");

            try {
                const response = await axios.post("/chat", { input });
                setMessages([...messages, { text: response.data, sender: "bot" }]);
            } catch (error) {
                console.error(error);
            }
        };

        const handleInputChange = (event) => {
            setInput(event.target.value);
        };

        return ( < div >
                <
                div > {
                    messages.map((message, index) => ( <
                        div key = { index } >
                        <
                        div > { message.sender } < /div{">"} <
                        div > { message.text } < /div{">"} < /
                        div { ">" }
                    )) { "}" } <
                    /div{">"} <
                    form onSubmit = { handleMessageSubmit } >
                    <
                    input value = { input }
                    onChange = { handleInputChange }
                    /> <
                    button type = "submit" > Send < /button{">"} < /
                    form { ">" } <
                    /div{">"}
                ); { "}" };

                export default Chatbot;