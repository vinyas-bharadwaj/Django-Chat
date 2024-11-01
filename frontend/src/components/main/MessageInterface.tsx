import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = 'ws://127.0.0.1:8000/ws/test';

const MessageInterface = () => {
    const [newMessage, setNewMessage] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("connected");
        },
        onClose: () => {
            console.log("closed!");
        },
        onError: () => {
            console.log("error");
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data);
            setNewMessage(prev_msg => [...prev_msg, data.new_message]);
        },   
    });


    return (<div>
        {newMessage.map((msg, index) => {
            return (
                <div key={index}>
                    <p>{msg}</p>
                </div>
            )
        })}
        <form>
            <label>
                Enter Message:
            </label>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />  
        </form>
        <button onClick={() => {sendJsonMessage({type: "message", message})}}>Send Message</button>
    </div>)
};

export default MessageInterface;