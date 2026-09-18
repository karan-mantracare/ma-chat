import React, { useState } from "react";

const PROCESSES = [
  {
    id: "p1",
    name: "Sales",
    stages: ["New Lead", "Contacted", "Qualified", "Lost"],
  },
  {
    id: "p2",
    name: "Support",
    stages: ["Open", "In Progress", "Escalated", "Resolved"],
  },
  {
    id: "p3",
    name: "General Inquiry",
    stages: ["Unassigned", "Assigned", "Archived"],
  },
];

export default function AutoCreateClient() {
  const [enabled, setEnabled] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState("");
  const [selectedStage, setSelectedStage] = useState("");

  const selectedProcess = PROCESSES.find((p) => p.id === selectedProcessId);
  const stages = selectedProcess ? selectedProcess.stages : [];

  const handleProcessChange = (e) => {
    setSelectedProcessId(e.target.value);
    setSelectedStage(""); // reset stage when process changes
  };

  return (
    <div className="form-group" style={{ marginTop: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: enabled ? "1rem" : "0" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#94a3b8",
            fontWeight: "500",
            margin: 0,
          }}
        >
          Auto Create the client
          <span
            style={{
              cursor: "help",
              fontSize: "0.7rem",
              background: "#cbd5e1",
              color: "white",
              borderRadius: "50%",
              width: "14px",
              height: "14px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            ?
          </span>
        </label>
        
        {/* Toggle Switch */}
        <div 
          onClick={() => setEnabled(!enabled)}
          style={{
            width: "44px",
            height: "24px",
            background: enabled ? "#0ea5e9" : "#cbd5e1",
            borderRadius: "12px",
            position: "relative",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          <div 
            style={{
              width: "20px",
              height: "20px",
              background: "white",
              borderRadius: "50%",
              position: "absolute",
              top: "2px",
              left: enabled ? "22px" : "2px",
              transition: "left 0.3s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
            }}
          />
        </div>
      </div>

      {enabled && (
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Process Dropdown - 50% */}
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.25rem", display: "block" }}>Process</label>
            <select
              className="form-control"
              value={selectedProcessId}
              onChange={handleProcessChange}
              style={{
                color: "var(--text-primary)",
                cursor: "pointer",
                border: "1px solid #7dd3fc",
                borderRadius: "4px",
                width: "100%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <option value="" disabled>Select Process...</option>
              {PROCESSES.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Stage Dropdown - 50% */}
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.25rem", display: "block" }}>Stage</label>
            <select
              className="form-control"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              disabled={!selectedProcessId}
              style={{
                color: "var(--text-primary)",
                cursor: selectedProcessId ? "pointer" : "not-allowed",
                border: "1px solid #7dd3fc",
                borderRadius: "4px",
                width: "100%",
                background: selectedProcessId ? "white" : "#f1f5f9",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <option value="" disabled>Select Stage...</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
