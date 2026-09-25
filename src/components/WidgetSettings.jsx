import React, { useState } from "react";
import AgentQueueSelect, { agentQueueData } from "../AgentQueueSelect";
import CustomProfileList from "../CustomProfileList";
import AutoCreateClient from "../AutoCreateClient";


export default function WidgetSettings() {

  const [themeMode, setThemeMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#0ea5e9");
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const [showRoutingSettings, setShowRoutingSettings] = useState(false);
  const [firstResponder, setFirstResponder] = useState("ai");
  const [agentInfo, setAgentInfo] = useState("user");
  const [selectedAgentIds, setSelectedAgentIds] = useState(["u7", "u5"]);

  return (
    <div className="settings-area">
      <div className="settings-header">
                <div>
                  <h2>Website Widget Settings</h2>
                  <p>
                    Configure theme, custom requirement labels, intake forms,
                    and embed the chatbot on your site.
                  </p>
                </div>
                <button className="btn btn-primary">Save Configuration</button>
              </div>

              <div className="settings-columns">
                <div className="settings-form">
                  {/* Embed Widget Code */}
                  <div className="card">
                    <div
                      className="card-header-flex"
                      style={{ marginBottom: "1rem" }}
                    >
                      <h3>&lt;&gt; Widget code</h3>
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.8rem",
                        }}
                      >
                        ❔
                      </span>
                    </div>

                    <div
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "1.5rem",
                        color: "#475569",
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        lineHeight: "1.5",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          marginBottom: "1.5rem",
                          overflowX: "auto",
                        }}
                      >
                        &lt;script&gt;
                        <br />
                        &nbsp;&nbsp;(function(w,d,u){"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;var
                        s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;var
                        h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
                        <br />
                        &nbsp;&nbsp;{"}"}
                        )(window,document,'https://cdn.bitrix24.in/b15041547/crm/site_button/loader_98_00u99i.js');
                        <br />
                        &lt;/script&gt;
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{
                          background: "#38bdf8",
                          boxShadow: "none",
                          borderRadius: "4px",
                          padding: "0.5rem 1rem",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        COPY TO CLIPBOARD
                      </button>
                    </div>
                  </div>
                  {/* Section: Widget Settings Wrapper */}
                  <div
                    className="settings-section"
                    style={{ marginBottom: "2rem" }}
                  >
                    <div
                      id="widgetSettingsHeader"
                      onClick={() => setShowWidgetSettings(!showWidgetSettings)}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1.25rem 1.5rem",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "12px",
                        marginBottom: "1.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "#f0f9ff",
                            color: "#0ea5e9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.1rem",
                          }}
                        >
                          ⚙️
                        </div>
                        <h2
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "var(--text-primary)",
                            margin: "0",
                          }}
                        >
                          Website Widget Section
                        </h2>
                      </div>
                      <svg
                        id="widgetSettingsChevron"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        style={{
                          color: "var(--text-secondary)",
                          transition: "transform 0.3s",
                          transform: showWidgetSettings
                            ? "rotate(0deg)"
                            : "rotate(-90deg)",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div
                      id="widgetSettingsContent"
                      style={{ display: showWidgetSettings ? "block" : "none" }}
                    >
                      {/* Theme & Colors */}
                      <div className="card">
                        <h3>Theme & Colors</h3>
                        <div className="form-group">
                          <label>Widget Primary Color</label>
                          <div className="color-picker" id="widgetColorPicker">
                            <div
                              className="color-swatch active"
                              style={{ background: "#0ea5e9" }}
                            ></div>
                            <div
                              className="color-swatch"
                              style={{ background: "#10b981" }}
                            ></div>
                            <div
                              className="color-swatch"
                              style={{ background: "#8b5cf6" }}
                            ></div>
                            <div
                              className="color-swatch"
                              style={{ background: "#f59e0b" }}
                            ></div>
                            <div
                              className="color-swatch"
                              style={{ background: "#ef4444" }}
                            ></div>
                            <div
                              className="color-swatch"
                              style={{ background: "#1f2937" }}
                            ></div>
                            <div
                              className="color-swatch"
                              style={{ background: "#3b82f6" }}
                            ></div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Theme Mode</label>
                          <select className="form-control" id="themeModeSelect">
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                          </select>
                        </div>
                      </div>

                      {/* Branding & Header */}
                      <div className="card">
                        <h3>Branding & Header</h3>
                        <div className="form-group">
                          <label>Bot / Brand Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value="MantraAssist Care Bot"
                          />
                        </div>
                        <div className="form-group">
                          <label>Welcome Greeting Message</label>
                          <textarea className="form-control" rows="3">
                            Hello! Welcome to Mantra Health. How can we assist
                            you today?
                          </textarea>
                        </div>
                        <div
                          className="form-group"
                          style={{
                            marginTop: "1rem",
                            paddingTop: "1rem",
                            borderTop: "1px solid var(--border-color)",
                          }}
                        >
                          <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                            <span
                              className="toggle-label"
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "var(--text-primary)",
                              }}
                            >
                              Remove "Powered by MantraAssist" signature
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Working Time Preferences */}
                      <div className="card">
                        <div
                          className="card-header-flex"
                          style={{ marginBottom: "0" }}
                        >
                          <div>
                            <h3 style={{ marginBottom: "0.25rem" }}>
                              Working Time Preferences
                            </h3>
                            <p
                              className="text-muted"
                              style={{
                                fontSize: "0.85rem",
                                marginBottom: "0",
                                fontWeight: "normal",
                              }}
                            >
                              Show the widget only during specific work hours
                            </p>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" id="workHoursToggle" />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        <div
                          id="workHoursSettings"
                          style={{
                            display: "none",
                            marginTop: "1.5rem",
                            paddingTop: "1.5rem",
                            borderTop: "1px solid var(--border-color)",
                          }}
                        >
                          <div className="form-group">
                            <label>Timezone</label>
                            <select className="form-control">
                              <option>
                                (UTC-05:00) Eastern Time (US & Canada)
                              </option>
                              <option>
                                (UTC-08:00) Pacific Time (US & Canada)
                              </option>
                            </select>
                          </div>
                          <div
                            className="form-group"
                            style={{ display: "flex", gap: "1rem" }}
                          >
                            <div style={{ flex: "1" }}>
                              <label>Work Hours (From)</label>
                              <input
                                type="time"
                                className="form-control"
                                value="09:00"
                              />
                            </div>
                            <div style={{ flex: "1" }}>
                              <label>Work Hours (To)</label>
                              <input
                                type="time"
                                className="form-control"
                                value="17:00"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Select Days</label>
                            <div className="days-pill-group">
                              <label className="day-pill">
                                <input type="checkbox" checked />
                                <span>Mon</span>
                              </label>
                              <label className="day-pill">
                                <input type="checkbox" checked />
                                <span>Tue</span>
                              </label>
                              <label className="day-pill">
                                <input type="checkbox" checked />
                                <span>Wed</span>
                              </label>
                              <label className="day-pill">
                                <input type="checkbox" checked />
                                <span>Thu</span>
                              </label>
                              <label className="day-pill">
                                <input type="checkbox" checked />
                                <span>Fri</span>
                              </label>
                              <label className="day-pill">
                                <input type="checkbox" />
                                <span>Sat</span>
                              </label>
                              <label className="day-pill">
                                <input type="checkbox" />
                                <span>Sun</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Widget Display Settings */}
                      <div className="card">
                        <h3>Widget display settings:</h3>
                        <p
                          className="text-muted"
                          style={{ fontSize: "0.8rem", marginBottom: "1.5rem" }}
                        >
                          <a
                            href="#"
                            id="toggleWidgetDisplaySettings"
                            style={{
                              color: "var(--primary-color)",
                              textDecoration: "none",
                              fontWeight: "500",
                            }}
                          >
                            configure
                          </a>{" "}
                          on all pages by default
                        </p>

                        <div
                          id="widgetDisplaySettingsContent"
                          style={{ display: "none" }}
                        >
                          <div className="form-group">
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.5rem",
                                fontWeight: "500",
                              }}
                            >
                              <input
                                type="radio"
                                name="displayRule"
                                checked
                                style={{ accentColor: "var(--primary-color)" }}
                              />{" "}
                              on all pages except:
                            </label>
                            <div className="rule-list"></div>
                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                                marginTop: "0.5rem",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control rule-input"
                                placeholder="http://example.com/dir/page"
                              />
                              <button
                                className="add-rule-btn"
                                style={{
                                  border: "none",
                                  background: "none",
                                  color: "#10b981",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: "1.5rem" }}
                          >
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.5rem",
                                fontWeight: "500",
                              }}
                            >
                              <input
                                type="radio"
                                name="displayRule"
                                style={{ accentColor: "var(--primary-color)" }}
                              />{" "}
                              on selected pages only:
                            </label>
                            <div className="rule-list"></div>
                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                                marginTop: "0.5rem",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control rule-input"
                                placeholder="http://example.com/dir/page"
                              />
                              <button
                                className="add-rule-btn"
                                style={{
                                  border: "none",
                                  background: "none",
                                  color: "#10b981",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div
                            className="rules-help-box"
                            style={{
                              background: "#ecfdf5",
                              border: "1px solid #d1fae5",
                              borderRadius: "8px",
                              padding: "1rem",
                              marginTop: "1.5rem",
                              display: "flex",
                              gap: "1rem",
                            }}
                          >
                            <div
                              style={{ color: "#10b981", fontSize: "1.2rem" }}
                            >
                              ❔
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "#047857",
                                lineHeight: "1.5",
                              }}
                            >
                              <em>
                                * - asterisk matches any number of any
                                characters.
                              </em>
                              <br />
                              <strong>Examples:</strong>
                              <br />
                              - All pages in the /catalog/ directory on
                              www.example.com
                              <br />
                              http://www.example.com/catalog/*
                              <br />
                              <br />
                              - Any page on any site that has /basket/ in the
                              path
                              <br />
                              */basket/*
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pre-Chat Form */}
                      <div className="card">
                        <div className="card-header-flex">
                          <h3>Pre-Chat Form & Requirement Labels</h3>
                          <label className="toggle-switch">
                            <input type="checkbox" checked id="preChatToggle" />
                            <span className="toggle-slider"></span>
                            <span className="toggle-label">Enable Form</span>
                          </label>
                        </div>
                        <div id="preChatContent">
                          <p
                            className="text-muted"
                            style={{
                              marginBottom: "1rem",
                              fontSize: "0.85rem",
                            }}
                          >
                            Select the intake fields collected from web visitors
                            before starting the conversation.
                          </p>
                          <div className="checkbox-grid">
                            <label className="checkbox-item">
                              <input type="checkbox" checked />
                              <span className="checkmark"></span>
                              Full Name
                            </label>
                            <label className="checkbox-item">
                              <input type="checkbox" checked />
                              <span className="checkmark"></span>
                              Email Address
                            </label>
                            <label className="checkbox-item">
                              <input type="checkbox" checked />
                              <span className="checkmark"></span>
                              Phone Number
                            </label>
                            <label className="checkbox-item">
                              <input type="checkbox" checked />
                              <span className="checkmark"></span>
                              Requirement Selection
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Custom Requirement Display Labels */}
                      <div className="card" id="customReqCard">
                        <div className="card-header-flex">
                          <h3>Custom Requirement Display Labels</h3>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Maps internal process to public visitor label
                          </span>
                        </div>

                        <div
                          className="form-group"
                          style={{
                            background: "#f8fafc",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                color: "#9333ea",
                              }}
                            >
                              ⚛ Process:{" "}
                              <span style={{ color: "var(--text-primary)" }}>
                                Patient Intake
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                color: "var(--text-secondary)",
                              }}
                            >
                              ID: 1
                            </div>
                          </div>
                          <div style={{ position: "relative" }}>
                            <span
                              style={{
                                position: "absolute",
                                left: "0.75rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--text-secondary)",
                                fontSize: "0.8rem",
                              }}
                            >
                              ✎
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value="Book an Intake Appointment"
                              style={{
                                paddingLeft: "2rem",
                                background: "white",
                              }}
                            />
                          </div>
                        </div>

                        <div
                          className="form-group"
                          style={{
                            background: "#f8fafc",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                color: "#9333ea",
                              }}
                            >
                              ⚛ Process:{" "}
                              <span style={{ color: "var(--text-primary)" }}>
                                Follow-up Calls
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                color: "var(--text-secondary)",
                              }}
                            >
                              ID: 2
                            </div>
                          </div>
                          <div style={{ position: "relative" }}>
                            <span
                              style={{
                                position: "absolute",
                                left: "0.75rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--text-secondary)",
                                fontSize: "0.8rem",
                              }}
                            >
                              ✎
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value="Insurance Verification & Coverage"
                              style={{
                                paddingLeft: "2rem",
                                background: "white",
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Default Pre-Selected Requirement</label>
                          <select className="form-control">
                            <option>
                              Book an Intake Appointment (Internal: Patient
                              Intake)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>{" "}
                    {/* End Widget Settings Content */}
                  </div>{" "}
                  {/* End Widget Settings Wrapper */}
                  {/* Section: Chat Routing Wrapper */}
                  <div
                    className="settings-section"
                    style={{ marginBottom: "2rem" }}
                  >
                    <div
                      id="routingSettingsHeader"
                      onClick={() =>
                        setShowRoutingSettings(!showRoutingSettings)
                      }
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1.25rem 1.5rem",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "12px",
                        marginBottom: "1.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "#f0f9ff",
                            color: "#0ea5e9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.1rem",
                          }}
                        >
                          🔀
                        </div>
                        <h2
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "var(--text-primary)",
                            margin: "0",
                          }}
                        >
                          Chat Routing Settings
                        </h2>
                      </div>
                      <svg
                        id="routingSettingsChevron"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        style={{
                          color: "var(--text-secondary)",
                          transition: "transform 0.3s",
                          transform: showRoutingSettings
                            ? "rotate(0deg)"
                            : "rotate(-90deg)",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div
                      id="routingSettingsContent"
                      style={{
                        display: showRoutingSettings ? "block" : "none",
                      }}
                    >
                      <div className="card">
                        <h3>First Responder</h3>
                        <p
                          className="text-muted"
                          style={{
                            fontSize: "0.85rem",
                            marginBottom: "1.5rem",
                          }}
                        >
                          Select who will be the first responder when a user
                          starts a chat.
                        </p>

                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            gap: "2rem",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontWeight: "600",
                            }}
                          >
                            <input
                              type="radio"
                              name="firstResponder"
                              id="radioAi"
                              value="ai"
                              checked={firstResponder === "ai"}
                              onChange={() => setFirstResponder("ai")}
                              style={{ accentColor: "var(--primary-color)" }}
                            />{" "}
                            AI Assistant
                          </label>
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontWeight: "600",
                            }}
                          >
                            <input
                              type="radio"
                              name="firstResponder"
                              id="radioHuman"
                              value="human"
                              checked={firstResponder === "human"}
                              onChange={() => setFirstResponder("human")}
                              style={{ accentColor: "var(--primary-color)" }}
                            />{" "}
                            Human Agent
                          </label>
                        </div>

                        <div
                          id="aiRoutingSettings"
                          style={{
                            display: firstResponder === "ai" ? "block" : "none",
                          }}
                        >
                          <div
                            className="form-group"
                            style={{
                              background: "#f0f9ff",
                              padding: "1rem",
                              borderRadius: "8px",
                              border: "1px solid #bae6fd",
                              marginBottom: "1.5rem",
                            }}
                          >
                            <label style={{ color: "#0369a1" }}>
                              Phrases to initiate human transfer
                            </label>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "#0284c7",
                                marginBottom: "0.5rem",
                              }}
                            >
                              If the user types these phrases, the AI will
                              connect them to a human.
                            </p>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g., talk to human, agent, support"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <h3>Queue & Routing</h3>
                        <div
                          className="form-group"
                          style={{ position: "relative", zIndex: "20" }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            Agent queue{" "}
                            <span
                              style={{
                                color: "var(--text-secondary)",
                                cursor: "help",
                                fontSize: "0.8rem",
                              }}
                            >
                              ❔
                            </span>
                          </label>
                          <AgentQueueSelect
                            selectedIds={selectedAgentIds}
                            onChange={setSelectedAgentIds}
                          />
                        </div>

                        <AutoCreateClient />

                        <div
                          className="form-group"
                          style={{ marginTop: "1.5rem" }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              color: "#94a3b8",
                              fontWeight: "500",
                            }}
                          >
                            Distribute submissions among employees{" "}
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
                          <select
                            className="form-control"
                            style={{
                              color: "var(--text-primary)",
                              cursor: "pointer",
                              border: "1px solid #7dd3fc",
                              borderRadius: "4px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                          >
                            <option>To everybody</option>
                            <option>Evenly</option>
                            <option>Exactly as enqueued</option>
                          </select>
                        </div>
                      </div>

                      <div className="card">
                        <h3>Agent Display</h3>
                        <div
                          className="form-group"
                          style={{ marginTop: "1.5rem" }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              color: "#94a3b8",
                              fontWeight: "500",
                            }}
                          >
                            Agent information{" "}
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

                          <select
                            className="form-control"
                            id="agentInfoSelect"
                            value={agentInfo}
                            onChange={(e) => setAgentInfo(e.target.value)}
                            style={{
                              color: "var(--text-primary)",
                              cursor: "pointer",
                              border: "1px solid #7dd3fc",
                              borderRadius: "4px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                              marginBottom: "1rem",
                            }}
                          >
                            <option value="user">User Profile</option>
                            <option value="custom">Use Custom Profile</option>
                            <option value="hide">Hide User Information</option>
                          </select>

                          <div
                            id="customAgentInfoGroup"
                            style={{
                              display:
                                agentInfo === "custom" ? "block" : "none",
                              marginTop: "1rem",
                            }}
                          >
                            <CustomProfileList
                              selectedIds={selectedAgentIds}
                              agentQueueData={agentQueueData}
                              onRemoveAgent={(id) =>
                                setSelectedAgentIds(
                                  selectedAgentIds.filter((i) => i !== id),
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* End Chat Routing Content */}
                  </div>{" "}
                  {/* End Chat Routing Wrapper */}
                </div>

                {/* Widget Simulator */}
                <div className="widget-simulator">
                  <div className="simulator-header">
                    <h3>✨ Live Widget Simulator</h3>
                    <span className="badge-outline">Interactive Preview</span>
                  </div>

                  <div className="widget-preview">
                    <div className="widget-header">
                      <div className="widget-bot-info">
                        <div className="bot-icon">🤖</div>
                        <div>
                          <strong>MantraAssist Care Bot</strong>
                          <span>Online - Powered by MantraAssist</span>
                        </div>
                      </div>
                    </div>
                    <div className="widget-body">
                      <div className="chat-message bot-message">
                        Hello! Welcome to Mantra Health. How can we assist you
                        today?
                      </div>

                      <div className="chat-form">
                        <p>Complete form to start chat:</p>
                        <input
                          type="text"
                          placeholder="Visitor Name *"
                          className="form-control"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="form-control"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="form-control"
                        />
                        <select className="form-control">
                          <option>
                            Requirement: Book an Intake Appointment
                          </option>
                        </select>
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="form-control"
                        />
                        <button className="btn btn-primary widget-btn">
                          Submit & Start Chat
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Choose Position */}
                  <div className="card" style={{ marginTop: "1.5rem" }}>
                    <h3>Choose position:</h3>
                    <div className="position-grid-container">
                      <div className="position-grid-mockup">
                        <div className="pos-header">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <div className="pos-grid">
                          <div className="pos-cell">↖</div>
                          <div className="pos-cell">↑</div>
                          <div className="pos-cell">↗</div>
                          <div className="pos-cell">↙</div>
                          <div className="pos-cell">↓</div>
                          <div className="pos-cell active">
                            ↘ <div className="pos-widget-icon">📞</div>
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
