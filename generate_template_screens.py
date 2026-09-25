import os

# TemplatesDashboard.jsx
dashboard = """import React from "react";
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
            onClick={() => navigate("/chat/whatsapp/templates/browse")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            📚 Browse Library
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/chat/whatsapp/templates/create")}
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
            onClick={() => navigate("/chat/whatsapp/templates/browse")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            📚 Browse Template Library
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/chat/whatsapp/templates/create")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#1f2937", borderColor: "#1f2937", color: "white" }}
          >
            + Create Your First Template
          </button>
        </div>
      </div>
    </div>
  );
}
"""
with open('src/components/TemplatesDashboard.jsx', 'w') as f:
    f.write(dashboard)


# CreateTemplate.jsx
create = """import React, { useState } from "react";
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
              <button onClick={() => navigate("/chat/whatsapp/templates")} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "var(--text-secondary)" }}>✕</button>
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
                onClick={() => navigate("/chat/whatsapp/templates")}
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
"""
with open('src/components/CreateTemplate.jsx', 'w') as f:
    f.write(create)

# BrowseTemplates.jsx
browse = """import React from "react";
import { useNavigate } from "react-router-dom";

export default function BrowseTemplates() {
  const navigate = useNavigate();

  return (
    <div className="settings-area" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background container mimicking the dashboard */}
      <div style={{ opacity: 0.3, pointerEvents: "none" }}>
         <h2 style={{ margin: "0 0 2rem 0", fontSize: "1.5rem" }}>Templates</h2>
      </div>

      {/* Side Drawer Overlay */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.2)", zIndex: 10, display: "flex", justifyContent: "flex-end" }}>
        
        <div style={{ width: "500px", height: "100%", background: "white", boxShadow: "-5px 0 25px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
          
          {/* Header */}
          <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                ✨
              </div>
              <div>
                <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>Template Library</h2>
                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Browse pre-built, ready-to-use WhatsApp message templates</p>
              </div>
            </div>
            <button onClick={() => navigate("/chat/whatsapp/templates")} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "var(--text-secondary)" }}>✕</button>
          </div>

          {/* Search & Filters */}
          <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }}>🔍</span>
              <input type="text" className="form-control" placeholder="Search templates by name, keyword, or body content..." style={{ paddingLeft: "2.5rem", borderRadius: "999px" }} />
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
              <button style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "none", background: "#3b82f6", color: "white", fontSize: "0.75rem", fontWeight: "bold" }}>All Categories</button>
              <button style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid var(--border-color)", background: "white", color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: "bold" }}>UTILITY</button>
              <button style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid var(--border-color)", background: "white", color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: "bold" }}>MARKETING</button>
              <button style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid var(--border-color)", background: "white", color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: "bold" }}>AUTHENTICATION</button>
            </div>
          </div>

          {/* Template List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Template Card 1 */}
            <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Appointment Reminder</h3>
                <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "0.1rem 0.5rem", borderRadius: "999px", fontSize: "0.6rem", fontWeight: "bold", border: "1px solid #bfdbfe" }}>UTILITY</span>
              </div>
              <p style={{ margin: "0 0 1rem 0", color: "var(--text-secondary)", fontSize: "0.85rem" }}>Send an automated reminder 24 hours before a scheduled visit with quick confirm/reschedule options.</p>
              
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Upcoming Appointment Reminder 📅</div>
                <div style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "#166534" }}>
                  Hi <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{contact_name}}"}</span>, this is a friendly reminder for your upcoming appointment with <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{practitioner_name}}"}</span> on <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{appointment_date}}"}</span> at <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{appointment_time}}"}</span>.
                  <br/><br/>
                  Please confirm if you can make it or reschedule if needed.
                  <br/><br/>
                  <span style={{ color: "#86efac" }}>Reply STOP to unsubscribe</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button style={{ background: "white", border: "1px solid #86efac", color: "#166534", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "500" }}>Confirm Attendance</button>
                  <button style={{ background: "white", border: "1px solid #86efac", color: "#166534", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "500" }}>Reschedule Visit</button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ background: "#1f2937", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "500", cursor: "pointer" }}>+ Use This Template</button>
              </div>
            </div>

            {/* Template Card 2 */}
            <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Booking Confirmation</h3>
                <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "0.1rem 0.5rem", borderRadius: "999px", fontSize: "0.6rem", fontWeight: "bold", border: "1px solid #bfdbfe" }}>UTILITY</span>
              </div>
              <p style={{ margin: "0 0 1rem 0", color: "var(--text-secondary)", fontSize: "0.85rem" }}>Instant confirmation message sent immediately after an appointment booking is completed.</p>
              
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "#166534" }}>
                  Thank you <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{contact_name}}"}</span>! Your appointment for <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{service_name}}"}</span> on <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{appointment_date}}"}</span> has been successfully booked.
                  <br/><br/>
                  Location: <span style={{ color: "#2563eb", fontWeight: "bold" }}>{"{{clinic_address}}"}</span>.
                  <br/><br/>
                  We look forward to seeing you!
                  <br/><br/>
                  <span style={{ color: "#86efac" }}>Thank you for choosing us</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button style={{ background: "white", border: "1px solid #86efac", color: "#166534", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "500" }}>View Location</button>
                  <button style={{ background: "white", border: "1px solid #86efac", color: "#166534", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "500" }}>Call Clinic</button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ background: "#1f2937", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "500", cursor: "pointer" }}>+ Use This Template</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
"""
with open('src/components/BrowseTemplates.jsx', 'w') as f:
    f.write(browse)

