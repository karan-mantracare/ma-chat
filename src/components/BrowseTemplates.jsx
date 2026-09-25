import React from "react";
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
            <button onClick={() => navigate("/chat-settings/whatsapp/templates")} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "var(--text-secondary)" }}>✕</button>
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
