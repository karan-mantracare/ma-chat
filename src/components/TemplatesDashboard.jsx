import React from "react";
import { useNavigate } from "react-router-dom";

export default function TemplatesDashboard() {
  const navigate = useNavigate();

  return (
    <div className="settings-area" style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "2rem", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "var(--text-primary)" }}>Templates</h2>
          <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: "600" }}>0 templates</span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            className="btn btn-outline"
            onClick={() => navigate("/chat-settings/whatsapp/templates/browse")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            📚 Browse Library
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/chat-settings/whatsapp/templates/create")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#1f2937", borderColor: "#1f2937", color: "white" }}
          >
            + Create Template
          </button>
        </div>
      </div>

      <div style={{ background: "#1f2937", color: "white", padding: "1rem", borderRadius: "8px 8px 0 0", display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr", fontSize: "0.75rem", fontWeight: "bold", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        <div>Name</div>
        <div>Identifier</div>
        <div>Category</div>
        <div>Status</div>
        <div>Language</div>
        <div style={{ textAlign: "right" }}>Actions</div>
      </div>
      
      <div style={{ flex: 1, border: "1px solid var(--border-color)", borderTop: "none", borderRadius: "0 0 8px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem" }}>
        <div style={{ fontSize: "3rem", color: "#93c5fd", marginBottom: "1rem" }}>📄</div>
        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>No templates yet</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", textAlign: "center", maxWidth: "400px" }}>
          Build a pre-approved WhatsApp message template to reuse in campaigns and chatbot flows.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            className="btn btn-outline"
            onClick={() => navigate("/chat-settings/whatsapp/templates/browse")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            📚 Browse Template Library
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/chat-settings/whatsapp/templates/create")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#1f2937", borderColor: "#1f2937", color: "white" }}
          >
            + Create Your First Template
          </button>
        </div>
      </div>
    </div>
  );
}
