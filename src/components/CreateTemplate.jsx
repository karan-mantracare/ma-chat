import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTemplate() {
  const navigate = useNavigate();
  const [bodyText, setBodyText] = useState("Hello {{contact_name}}, your appointment is confirmed for {{appointment_date}}.");

  return (
    <div className="settings-area" style={{ position: "relative" }}>
      {/* Background container mimicking the dashboard */}
      <div style={{ opacity: 0.3, pointerEvents: "none" }}>
         <h2 style={{ margin: "0 0 2rem 0", fontSize: "1.5rem" }}>Templates</h2>
      </div>

      {/* Overlay Form */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.8)", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "2rem", zIndex: 10 }}>
        
        <div style={{ display: "flex", gap: "2rem", width: "100%", maxWidth: "1000px" }}>
          
          {/* Form Side */}
          <div style={{ flex: "2", background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "2rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>New WhatsApp Template</h2>
              <button onClick={() => navigate("/chat-settings/whatsapp/templates")} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "var(--text-secondary)" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div className="form-group">
                <label>Template Name *</label>
                <input type="text" className="form-control" placeholder="e.g. Appointment Reminder" />
              </div>
              <div className="form-group">
                <label>Template Identifier *</label>
                <input type="text" className="form-control" value="appointment_reminder" readOnly style={{ background: "#f8fafc", color: "var(--text-secondary)" }} />
              </div>
              
              <div className="form-group">
                <label>Category *</label>
                <select className="form-control">
                  <option>Marketing</option>
                  <option>Utility</option>
                  <option>Authentication</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language *</label>
                <select className="form-control">
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={{ margin: 0 }}>Header <span style={{ color: "var(--text-secondary)", fontWeight: "normal" }}>(Optional)</span></label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={{ background: "#3b82f6", color: "white", border: "none", borderRadius: "4px", padding: "0.25rem 0.75rem", fontSize: "0.8rem", cursor: "pointer" }}>None</button>
                  <button style={{ background: "#f1f5f9", color: "var(--text-primary)", border: "none", borderRadius: "4px", padding: "0.25rem 0.75rem", fontSize: "0.8rem", cursor: "pointer" }}>Text</button>
                  <button style={{ background: "#f1f5f9", color: "var(--text-primary)", border: "none", borderRadius: "4px", padding: "0.25rem 0.75rem", fontSize: "0.8rem", cursor: "pointer" }}>Image</button>
                  <button style={{ background: "#f1f5f9", color: "var(--text-primary)", border: "none", borderRadius: "4px", padding: "0.25rem 0.75rem", fontSize: "0.8rem", cursor: "pointer" }}>Video</button>
                  <button style={{ background: "#f1f5f9", color: "var(--text-primary)", border: "none", borderRadius: "4px", padding: "0.25rem 0.75rem", fontSize: "0.8rem", cursor: "pointer" }}>Document</button>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={{ margin: 0 }}>Body Text *</label>
                <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.85rem", cursor: "pointer", fontWeight: "500" }}>[ ] Insert Variable</button>
              </div>
              <textarea 
                className="form-control" 
                rows="4"
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label>Footer Text <span style={{ color: "var(--text-secondary)", fontWeight: "normal" }}>(Optional)</span></label>
              <input type="text" className="form-control" placeholder="e.g. Reply STOP to opt out" />
            </div>

            <div className="form-group" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={{ margin: 0 }}>Buttons <span style={{ color: "var(--text-secondary)", fontWeight: "normal" }}>(Optional)</span></label>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>0/3</span>
              </div>
              <button style={{ width: "100%", background: "none", border: "1px dashed var(--border-color)", color: "#3b82f6", padding: "0.75rem", borderRadius: "8px", cursor: "pointer", fontWeight: "500" }}>
                + Add Button
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button 
                className="btn btn-outline"
                onClick={() => navigate("/chat-settings/whatsapp/templates")}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                style={{ background: "#1f2937", borderColor: "#1f2937", color: "white" }}
              >
                Save Template
              </button>
            </div>

          </div>

          {/* Preview Side */}
          <div style={{ flex: "1" }}>
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "1rem" }}>Live Preview</h3>
            
            <div style={{ width: "320px", height: "640px", background: "black", borderRadius: "40px", padding: "12px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              <div style={{ background: "#efeae2", width: "100%", height: "100%", borderRadius: "32px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                
                {/* WA Header */}
                <div style={{ background: "#005c4b", color: "white", padding: "1.5rem 1rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "black", fontWeight: "bold" }}>WA</div>
                  <span style={{ fontWeight: "500" }}>Mantra Health</span>
                </div>

                {/* WA Body */}
                <div style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ background: "white", padding: "0.75rem", borderRadius: "0 8px 8px 8px", boxShadow: "0 1px 0.5px rgba(11,20,26,.13)", fontSize: "0.9rem", color: "#111b21", alignSelf: "flex-start", maxWidth: "90%", lineHeight: "1.4", position: "relative" }}>
                    {bodyText}
                  </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
