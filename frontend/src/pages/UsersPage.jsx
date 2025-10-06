// UsersPage.jsx
import { useState } from "react";
import ChatHistory from "./ChatHistory";

export default function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  // โหลด users จาก API
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <h3>รายชื่อลูกค้า</h3>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              <button onClick={() => setSelectedUserId(u.id)}>
                {u.display_name || u.username}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: "1rem" }}>
        {selectedUserId ? (
          <ChatHistory userId={selectedUserId} />
        ) : (
          <p>เลือกผู้ใช้เพื่อดูประวัติการสนทนา</p>
        )}
      </div>
    </div>
  );
}
