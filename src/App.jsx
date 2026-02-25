import { useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // ---- API CALL PLACEHOLDER ----
    // Replace this with your real API endpoint later
    const reply = await fakeAIResponse(input);

    setMessages([...newMessages, { sender: "assistant", text: reply }]);
    setLoading(false);
  }

  // Temporary mock API while we build your backend
  async function fakeAIResponse(prompt) {
    return new Promise((resolve) => {
      setTimeout(() => resolve("This is a mock AI reply to: " + prompt), 600);
    });
  }

  return (
    <div className="chat-container">
      <header className="header">AI Agent Nerd 🤖</header>

      <div className="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === "user" ? "user" : "assistant"}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="message assistant">Thinking…</div>}
      </div>

      <form className="input-bar" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your agent something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}