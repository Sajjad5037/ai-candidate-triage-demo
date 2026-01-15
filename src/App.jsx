import { useEffect, useState } from "react";

const API_BASE = "https://web-production-e5ae.up.railway.app";

function App() {
  const [issues, setIssues] = useState([]);
  const [activeIssue, setActiveIssue] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  // 1️⃣ Load all issues
  useEffect(() => {
    fetch(`${API_BASE}/issues`)
      .then(res => res.json())
      .then(data => {
        setIssues(data);
        setActiveIssue(data[0] || null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 2️⃣ Load messages for selected issue
  function selectIssue(issueId) {
    fetch(`${API_BASE}/issues/${issueId}`)
      .then(res => res.json())
      .then(data => setActiveIssue(data));
  }

  // 3️⃣ Send reply for active issue
  function sendReply() {
    if (!reply.trim() || !activeIssue) return;

    fetch(`${API_BASE}/issues/${activeIssue.id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: "admin",
        text: reply,
      }),
    })
      .then(res => res.json())
      .then(newMessage => {
        setActiveIssue(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));
        setReply("");
      });
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Loading issues…</div>;
  }

  return (
    <div style={styles.app}>
      {/* LEFT — Issues */}
      <div style={styles.sidebar}>
        <h3>Issues</h3>

        {issues.map(issue => (
          <div
            key={issue.id}
            onClick={() => selectIssue(issue.id)}
            style={{
              ...styles.issueItem,
              background:
                activeIssue?.id === issue.id ? "#eee" : "transparent",
            }}
          >
            <strong>{issue.title}</strong>
            <div style={styles.status}>{issue.status}</div>
          </div>
        ))}
      </div>

      {/* RIGHT — Conversation */}
      <div style={styles.chat}>
        {activeIssue ? (
          <>
            <h3>{activeIssue.title}</h3>

            <div style={styles.messages}>
              {activeIssue.messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.message,
                    alignSelf:
                      m.sender === "admin" ? "flex-end" : "flex-start",
                    background:
                      m.sender === "admin" ? "#d1e7ff" : "#f1f1f1",
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div style={styles.replyBox}>
              <input
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Reply to this issue…"
                style={styles.input}
              />
              <button onClick={sendReply} style={styles.button}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select an issue</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  app: { display: "flex", height: "100vh", fontFamily: "Arial" },
  sidebar: { width: 280, borderRight: "1px solid #ddd", padding: 16 },
  issueItem: {
    padding: 10,
    cursor: "pointer",
    borderRadius: 4,
    marginBottom: 6,
  },
  status: { fontSize: 12, color: "#666" },
  chat: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflowY: "auto",
  },
  message: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
  },
  replyBox: { display: "flex", gap: 8, marginTop: 12 },
  input: { flex: 1, padding: 10 },
  button: {
    padding: "10px 16px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
