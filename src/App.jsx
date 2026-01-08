import { useState } from "react";
import "./App.css";

export default function App() {
  const [candidateMessage, setCandidateMessage] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [jobMatchResult, setJobMatchResult] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [aiLogic, setAiLogic] = useState(
`The AI evaluates incoming candidate messages using the following steps:

1. Identify role-relevant skills mentioned in the message.
2. Estimate experience level based on years, keywords, and role history.
3. Detect intent (actively applying, passive inquiry, follow-up).
4. Check availability or urgency indicators.
5. Assign a relevance level (High / Medium / Low).
6. Generate short, human-readable reasoning.
7. Suggest response options for the recruiter to review.

The final decision is advisory only. Recruiters always make the final call.`
  );

  const handleAnalyzeMessage = () => {
    if (!candidateMessage.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const extracted = {
        skills: ["React", "JavaScript"],
        experience: "3 years",
        intent: "Actively seeking a frontend role"
      };

      setAnalysisResult({
        relevance: "High",
        reason:
          "The message mentions relevant frontend skills and indicates immediate availability.",
        extracted,
        replies: [
          "Thank you for reaching out. Could you please share your CV for review?",
          "Thanks for your message. Would you be available for a short introductory call this week?",
          "We appreciate your interest. Our team will review your profile and get back to you shortly."
        ]
      });

      setJobMatchResult({
        role: selectedRole,
        score: 78,
        fitReasons: [
          "Mentions React and JavaScript explicitly",
          "Experience aligns with junior to mid-level expectations",
          "Indicates active job search intent"
        ],
        gaps: [
          "No mention of production-scale React projects",
          "Limited backend experience mentioned"
        ],
        recommendation: "Invite for screening call"
      });

      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="page">
      <header className="header full">
        <h1>AI-Assisted Candidate Message Triage</h1>
        <p className="subtitle">
          AI reviews candidate messages and job fit to support faster,
          more consistent recruiting decisions.
        </p>
      </header>

      <main className="workspace">
        {/* LEFT COLUMN */}
        <section className="column">
          <div className="panel">
            <label className="label">Candidate Message</label>
            <textarea
              placeholder="Paste a candidate message here..."
              value={candidateMessage}
              onChange={(e) => setCandidateMessage(e.target.value)}
            />
            <button onClick={handleAnalyzeMessage} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Analyze Message"}
            </button>
          </div>

          <div className="panel secondary">
            <label className="label">AI Decision Logic (Editable)</label>
            <textarea
              value={aiLogic}
              onChange={(e) => setAiLogic(e.target.value)}
            />
            <p className="hint">
              This logic explains how the AI evaluates messages and can be
              customized per role or client.
            </p>
          </div>

          {analysisResult && (
            <div className="results">
              <div className="result-card">
                <h3>Relevance Assessment</h3>
                <span className="badge high">{analysisResult.relevance}</span>
                <p>{analysisResult.reason}</p>
              </div>

              <div className="result-card">
                <h3>Extracted Signals</h3>
                <ul>
                  <li><strong>Skills:</strong> {analysisResult.extracted.skills.join(", ")}</li>
                  <li><strong>Experience:</strong> {analysisResult.extracted.experience}</li>
                  <li><strong>Intent:</strong> {analysisResult.extracted.intent}</li>
                </ul>
              </div>

              <div className="result-card">
                <h3>Suggested Replies</h3>
                <ol>
                  {analysisResult.replies.map((reply, i) => (
                    <li key={i}>{reply}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN */}
        <section className="column">
          <div className="panel">
            <label className="label">AI Job Matching</label>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Engineer</option>
            </select>

            {jobMatchResult && (
              <>
                <div className="match-score">
                  Match Score: <strong>{jobMatchResult.score}%</strong>
                </div>

                <div className="result-card">
                  <h3>Why This Candidate Fits</h3>
                  <ul>
                    {jobMatchResult.fitReasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-card warning">
                  <h3>Potential Gaps</h3>
                  <ul>
                    {jobMatchResult.gaps.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>

                <div className="recommendation">
                  Recommended Action:{" "}
                  <strong>{jobMatchResult.recommendation}</strong>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        Demo only — illustrates AI-assisted decision support, not automated hiring.
      </footer>
    </div>
  );
}
