import React, { useState } from "react";

const SYSTEM_AVATARS = [
  "https://ui-avatars.com/api/?name=W1&background=fecdd3&color=be123c",
  "https://ui-avatars.com/api/?name=W2&background=fed7aa&color=c2410c",
  "https://ui-avatars.com/api/?name=W3&background=fde047&color=a16207",
  "https://ui-avatars.com/api/?name=W4&background=d9f99d&color=4d7c0f",
  "https://ui-avatars.com/api/?name=M1&background=bfdbfe&color=1d4ed8",
  "https://ui-avatars.com/api/?name=M2&background=ddd6fe&color=6d28d9",
  "https://ui-avatars.com/api/?name=M3&background=fbcfe8&color=be185d",
  "https://ui-avatars.com/api/?name=M4&background=e2e8f0&color=334155",
];

export default function CustomProfileList({
  selectedIds,
  agentQueueData,
  onRemoveAgent,
}) {
  // Store overrides for each agent id: { u1: { name: '...', position: '...', image: '...' } }
  const [overrides, setOverrides] = useState({});
  const [popoverId, setPopoverId] = useState(null);

  const handleUpdate = (id, field, value) => {
    setOverrides({
      ...overrides,
      [id]: {
        ...(overrides[id] || {}),
        [field]: value,
      },
    });
    if (field === "image") {
      setPopoverId(null);
    }
  };

  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleUpdate(id, "image", url);
    }
  };

  if (selectedIds.length === 0) {
    return (
      <div
        style={{ color: "#94a3b8", fontSize: "0.85rem", fontStyle: "italic" }}
      >
        No agents in queue. Add agents above to configure their custom profiles.
      </div>
    );
  }

  return (
    <div
      id="customProfilesList"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {selectedIds.map((id) => {
        const baseAgent = agentQueueData.find((a) => a.id === id);
        if (!baseAgent) return null;

        const override = overrides[id] || {};
        const displayName =
          override.name !== undefined ? override.name : baseAgent.name;
        const displayPosition = override.position || "";
        const displayImage = override.image || baseAgent.image;

        return (
          <div
            key={id}
            className="custom-profile-card"
            style={{
              background: "#f0f9ff",
              border: "1px solid #e0f2fe",
              borderRadius: "8px",
              padding: "1rem",
              position: "relative",
              zIndex: popoverId === id ? 10 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img
                  src={baseAgent.image}
                  alt="Base"
                  className="mini-avatar"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    opacity: 0.7,
                  }}
                />
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Syncing: {baseAgent.name}
                </span>
              </div>
              <span
                className="remove-profile-btn"
                onClick={() => onRemoveAgent(id)}
                style={{
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontSize: "1rem",
                  lineHeight: "1",
                  transition: "color 0.2s",
                }}
                title="Remove from queue"
              >
                ×
              </span>
            </div>
            <div
              style={{
                height: "1px",
                background: "#e0f2fe",
                marginBottom: "1rem",
                marginLeft: "-1rem",
                marginRight: "-1rem",
              }}
            ></div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={displayImage}
                  alt="Avatar"
                  onClick={() => setPopoverId(popoverId === id ? null : id)}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "2px solid #bae6fd",
                    objectFit: "cover",
                  }}
                />

                {popoverId === id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "55px",
                      left: 0,
                      background: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "0.5rem",
                      zIndex: 50,
                      width: "200px",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        color: "#475569",
                      }}
                    >
                      Select existing
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {SYSTEM_AVATARS.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          onClick={() => handleUpdate(id, "image", url)}
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        height: "1px",
                        background: "#f1f5f9",
                        margin: "0.5rem 0",
                      }}
                    ></div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: "#0ea5e9",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      Upload for this chat
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileUpload(id, e)}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  flex: 1,
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Name (default: ${baseAgent.name})`}
                  value={displayName}
                  onChange={(e) => handleUpdate(id, "name", e.target.value)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    fontSize: "0.85rem",
                    border: "1px solid #bae6fd",
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Position (optional)"
                  value={displayPosition}
                  onChange={(e) => handleUpdate(id, "position", e.target.value)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    fontSize: "0.85rem",
                    border: "1px solid #bae6fd",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
