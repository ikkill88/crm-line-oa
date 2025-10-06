// ChatHistory.jsx
import { useEffect, useState } from "react";

export default function ChatHistory({ userId }) {
  const [data, setData] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/${userId}/messages`)
      .then(res => res.json())
      .then(setData);
  }, [userId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userIds: [userId],
        text: newMessage
      })
    });

    // refresh messages
    const updated = await fetch(`/api/users/${userId}/messages`).then(res => res.json());
    setData(updated);
    setNewMessage("");
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", maxWidth: "600px" }}>
      <h3>ประวัติการสนทนา: {data.user.display_name}</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto", background: "#f9f9f9", padding: "1rem" }}>
        {data.messages.map(msg => (
          <div
            key={msg.id}
            style={{
              margin: "0.5rem 0",
              textAlign: msg.direction === "outbound" ? "right" : "left"
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                background: msg.direction === "outbound" ? "#d1f0ff" : "#e6e6e6"
              }}
            >
              <p style={{ margin: 0 }}>{msg.content}</p>
              <small style={{ fontSize: "0.7rem", color: "#666" }}>
                {new Date(msg.created_at).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* ฟอร์มส่งข้อความ */}
      <form onSubmit={handleSend} style={{ marginTop: "1rem", display: "flex" }}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>ส่ง</button>
      </form>
    </div>
  );
}
