import React, { useState } from "react";

export default function Campaigns() {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Initial mock state matching the screenshots
  const [nodes, setNodes] = useState([
    { id: 1, type: "message", title: "Message 1", subtitle: "—" },
    { id: 2, type: "message", title: "New Message", subtitle: "—" },
    { id: 3, type: "delay", title: "Wait", subtitle: "Wait 1 days" },
    { id: 4, type: "condition", title: "Check Condition", subtitle: 'If name equals ""' },
  ]);

  const handleNodeClick = (id) => {
    setSelectedNodeId(id);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Calculate summary
  const messagesCount = nodes.filter(n => n.type === 'message').length;
  const delaysCount = nodes.filter(n => n.type === 'delay').length;
  const totalSteps = nodes.length + 1; // +1 for End Flow

  return (
    <div className="settings-area" style={{ display: "flex", gap: "2rem", alignItems: "flex-start", background: "#f8fafc", padding: "0" }}>
      
      {/* Left Area - Flow Editor */}
      <div style={{ flex: "1", background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "2rem" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem" }}>
          <div>
            <input type="text" placeholder="Campaign name..." style={{ border: "none", fontSize: "1.5rem", fontWeight: "bold", width: "100%", marginBottom: "0.25rem", color: "var(--text-primary)", outline: "none" }} />
            <input type="text" placeholder="Target audience (e.g. All new leads)" style={{ border: "none", fontSize: "0.85rem", color: "var(--text-secondary)", width: "100%", outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn btn-outline" style={{ borderRadius: "999px", padding: "0.5rem 1.5rem", fontWeight: "bold" }}>Cancel</button>
            <button className="btn btn-primary" style={{ background: "#1f2937", borderColor: "#1f2937", color: "white", borderRadius: "999px", padding: "0.5rem 1.5rem", fontWeight: "bold" }}>Save Campaign</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem 0" }}>
          
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            
            let icon = "💬";
            let iconColor = "#3b82f6";
            let iconBg = "#eff6ff";
            
            if (node.type === "delay") {
              icon = "⏱";
              iconColor = "#eab308";
              iconBg = "#fefce8";
            } else if (node.type === "condition") {
              icon = "🔀"; // Filter/Condition
              iconColor = "#a855f7";
              iconBg = "#faf5ff";
            }

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div 
                  onClick={() => handleNodeClick(node.id)}
                  style={{ 
                    width: "100%", 
                    border: `1.5px solid ${isSelected ? "#3b82f6" : "var(--border-color)"}`, 
                    borderRadius: "24px", 
                    padding: "1rem 1.5rem", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    cursor: "pointer",
                    background: "white",
                    boxShadow: isSelected ? "0 4px 6px -1px rgba(59, 130, 246, 0.1)" : "none",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: iconBg, color: iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", border: `1px solid ${iconColor}40` }}>
                      {icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--text-primary)" }}>{node.title}</h4>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: node.type === 'delay' ? '#eab308' : "var(--text-secondary)", fontWeight: node.type === 'delay' ? '500' : 'normal' }}>{node.subtitle}</p>
                    </div>
                  </div>
                  <button style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.1rem" }}>🗑</button>
                </div>

                {/* Arrow */}
                <div style={{ height: "2rem", width: "1px", background: "var(--border-color)", margin: "0.5rem 0", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: "-4px", left: "-3px", width: "7px", height: "7px", borderRight: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", transform: "rotate(45deg)" }}></div>
                </div>
              </React.Fragment>
            );
          })}

          {/* End Flow Node */}
          <div 
            style={{ 
              width: "100%", 
              border: "1px dashed var(--border-color)", 
              borderRadius: "24px", 
              padding: "1rem 1.5rem", 
              display: "flex", 
              alignItems: "center", 
              gap: "1rem",
              background: "#f8fafc"
            }}
          >
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "white", border: "1px solid var(--border-color)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>
              ✓
            </div>
            <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--text-secondary)", fontWeight: "500" }}>End Flow</h4>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "white", border: "1px solid #bfdbfe", color: "#3b82f6", borderRadius: "999px", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" }}>
              + Add Message
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "white", border: "1px solid #fef08a", color: "#ca8a04", borderRadius: "999px", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" }}>
              + Add Delay
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "white", border: "1px solid #e9d5ff", color: "#9333ea", borderRadius: "999px", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" }}>
              + Add Condition
            </button>
          </div>

        </div>
      </div>

      {/* Right Area - Config Panel / Summary */}
      <div style={{ width: "350px", display: "flex", flexDirection: "column", gap: "1.5rem", flexShrink: 0 }}>
        
        {/* Conditional Config Panel */}
        {selectedNode && (
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", 
                  background: selectedNode.type === 'condition' ? '#faf5ff' : selectedNode.type === 'delay' ? '#fefce8' : '#eff6ff', 
                  color: selectedNode.type === 'condition' ? '#a855f7' : selectedNode.type === 'delay' ? '#eab308' : '#3b82f6', 
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", 
                  border: `1px solid ${selectedNode.type === 'condition' ? '#a855f7' : selectedNode.type === 'delay' ? '#eab308' : '#3b82f6'}40` 
                }}>
                  {selectedNode.type === 'condition' ? '🔀' : selectedNode.type === 'delay' ? '⏱' : '💬'}
                </div>
                <h3 style={{ margin: 0, fontSize: "1rem" }}>Configure Step</h3>
              </div>
              <button onClick={() => setSelectedNodeId(null)} style={{ background: "none", border: "none", fontSize: "1.2rem", color: "var(--text-secondary)", cursor: "pointer" }}>✕</button>
            </div>

            {selectedNode.type === "condition" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="form-group">
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Variable</label>
                  <select className="form-control" style={{ borderRadius: "8px" }}>
                    <option>Client Name</option>
                    <option>Email</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Operator</label>
                  <select className="form-control" style={{ borderRadius: "8px" }}>
                    <option>Equals</option>
                    <option>Contains</option>
                  </select>
                </div>
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Value</label>
                    <span style={{ fontSize: "0.75rem", color: "#3b82f6", cursor: "pointer", fontWeight: "500" }}>{'{ }'} Insert Variable</span>
                  </div>
                  <input type="text" className="form-control" placeholder="Match value..." style={{ borderRadius: "8px" }} />
                </div>
              </div>
            )}

            {selectedNode.type === "delay" && (
              <div style={{ display: "flex", gap: "1rem" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Duration</label>
                  <input type="number" className="form-control" defaultValue="1" style={{ borderRadius: "8px" }} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Unit</label>
                  <select className="form-control" style={{ borderRadius: "8px" }}>
                    <option>Days</option>
                    <option>Hours</option>
                    <option>Minutes</option>
                  </select>
                </div>
              </div>
            )}

            {selectedNode.type === "message" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Select a template to send.</p>
                <div className="form-group">
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Template</label>
                  <select className="form-control" style={{ borderRadius: "8px" }}>
                    <option>Select...</option>
                    <option>Appointment Reminder</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Flow Summary */}
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>Flow Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-primary)" }}>
              <span>Messages</span>
              <span style={{ fontWeight: "600", color: "#3b82f6" }}>{messagesCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-primary)" }}>
              <span>Delays</span>
              <span style={{ fontWeight: "600", color: "#ca8a04" }}>{delaysCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-primary)", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
              <span>Total Steps</span>
              <span style={{ fontWeight: "600" }}>{totalSteps}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
