import React, { useState, useRef, useEffect } from "react";

export const agentQueueData = [
  {
    id: "u1",
    type: "user",
    name: "John Doe",
    image:
      "https://ui-avatars.com/api/?name=John+Doe&background=94a3b8&color=fff",
  },
  {
    id: "u2",
    type: "user",
    name: "Jane Smith",
    image:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=64748b&color=fff",
  },
  {
    id: "u3",
    type: "user",
    name: "Alice Johnson",
    image:
      "https://ui-avatars.com/api/?name=Alice+Johnson&background=475569&color=fff",
  },
  {
    id: "u4",
    type: "user",
    name: "Bob Williams",
    image:
      "https://ui-avatars.com/api/?name=Bob+Williams&background=334155&color=fff",
  },
  {
    id: "u5",
    type: "user",
    name: "Charlie Brown",
    image:
      "https://ui-avatars.com/api/?name=Charlie+Brown&background=1e293b&color=fff",
  },
  {
    id: "u6",
    type: "user",
    name: "Diana Prince",
    image:
      "https://ui-avatars.com/api/?name=Diana+Prince&background=0f172a&color=fff",
  },
  {
    id: "u7",
    type: "user",
    name: "Technical Support",
    image:
      "https://ui-avatars.com/api/?name=Technical+Support&background=0ea5e9&color=fff",
  },
];

export default function AgentQueueSelect({ selectedIds, onChange }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableAgents = agentQueueData.filter(
    (a) =>
      !selectedIds.includes(a.id) &&
      a.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleAgent = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
      setSearch("");
    }
  };

  return (
    <div
      className="custom-multi-select"
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <div
        className="cms-input-box"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          padding: "0.5rem",
          border: "1px solid var(--border-color)",
          borderRadius: "4px",
          minHeight: "42px",
          cursor: "text",
        }}
        onClick={() => setIsOpen(true)}
      >
        {selectedIds.map((id) => {
          const agent = agentQueueData.find((a) => a.id === id);
          if (!agent) return null;
          return (
            <div
              key={id}
              className="cms-pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f1f5f9",
                padding: "0.25rem 0.5rem",
                borderRadius: "16px",
                fontSize: "0.85rem",
              }}
            >
              <img
                src={agent.image}
                alt={agent.name}
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />
              <span>{agent.name}</span>
              <div
                className="cms-pill-remove"
                style={{
                  cursor: "pointer",
                  color: "#94a3b8",
                  marginLeft: "4px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAgent(id);
                }}
              >
                ✕
              </div>
            </div>
          );
        })}
        <input
          type="text"
          className="cms-search-input"
          placeholder={
            selectedIds.length === 0 ? "Enter user name to select" : ""
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            minWidth: "120px",
            background: "transparent",
          }}
        />
      </div>

      {isOpen && (
        <div
          className="cms-dropdown"
          style={{
            display: "block",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid var(--border-color)",
            borderRadius: "4px",
            marginTop: "4px",
            zIndex: 100,
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          }}
        >
          {availableAgents.length === 0 ? (
            <div
              style={{
                padding: "0.75rem 1rem",
                color: "#64748b",
                fontSize: "0.9rem",
              }}
            >
              No agents found
            </div>
          ) : (
            availableAgents.map((agent) => (
              <div
                key={agent.id}
                className="cms-option"
                onClick={() => toggleAgent(agent.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
                <span>{agent.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
