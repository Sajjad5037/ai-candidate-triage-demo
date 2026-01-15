import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Later: send this to API
    console.log("Issue submitted:", form);

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={styles.container}>
        <h2>Issue Submitted</h2>
        <p>
          Thank you. Your issue has been received and I will get back to you
          shortly.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Report an Issue</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="title"
          placeholder="Short issue title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Describe the issue"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Submit Issue
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "520px",
    margin: "60px auto",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    height: "120px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default App;
