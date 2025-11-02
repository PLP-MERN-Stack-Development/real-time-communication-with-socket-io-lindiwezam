import React, { useEffect,useState } from "react";
import socket from "./socket";

const ChatRoom = () => {
    const [room, setRoom] = useState("general");
    const [message, setMessage] = useState("");
    const [message, setMessage] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
//Prompt username
const name = prompt("Enter your name:");
setUsername(name);

socket.emit("joinRoom", room);

socket.on("message", (msg) => {
    setMessages((prev) => [...prev, msg]);
});

return () => socket.off("message");
    }, [room]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") return;

        socket.emit("chatMessage", { room, sender: username, text: message });
        setMessage("");
    };

    return (
        <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
            <h2>Room: {room}</h2>
            <div 
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                height: "300px",
                overflowY: "auto",
            }}
        >
    {message.map((msg, i) => (
        <p key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
            </p>
    ))}
        </div>

        <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
            <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message.."
            style={{ width: "75%", padding: "8px" }}
            />
            <button type="submit" style={{ width: "20%, padding: "8px" }}>
            Send
           </button>
         </form>
       </div>
    );
};

export default ChatRoom;