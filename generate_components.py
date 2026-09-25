import re

with open('src/App.jsx', 'r') as f:
    app_content = f.read()

# 1. Generate WidgetSettings.jsx
widget_settings_start = app_content.find('<div className="settings-header">')
widget_settings_end = app_content.find('</div>\n          </div>\n        </main>')
if widget_settings_start != -1 and widget_settings_end != -1:
    widget_jsx = app_content[widget_settings_start:widget_settings_end]
    
    # Needs the state hooks
    state_hooks = """
  const [themeMode, setThemeMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#0ea5e9");
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const [showRoutingSettings, setShowRoutingSettings] = useState(false);
  const [firstResponder, setFirstResponder] = useState("ai");
  const [agentInfo, setAgentInfo] = useState("user");
  const [selectedAgentIds, setSelectedAgentIds] = useState(["u7", "u5"]);
"""
    
    imports = """import React, { useState } from "react";
import AgentQueueSelect, { agentQueueData } from "../AgentQueueSelect";
import CustomProfileList from "../CustomProfileList";
import AutoCreateClient from "../AutoCreateClient";
"""

    widget_component = f"""{imports}

export default function WidgetSettings() {{
{state_hooks}
  return (
    <div className="settings-area">
      {widget_jsx}
    </div>
  );
}}
"""
    with open('src/components/WidgetSettings.jsx', 'w') as f:
        f.write(widget_component)


# 2. Generate ChatLayout.jsx
chat_layout = """import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function ChatLayout() {
  return (
    <div className="content-layout">
      {/* Channels Sidebar */}
      <div className="channels-sidebar">
        <h3>All Channels</h3>
        
        <div className="channel-group">
          <div className="channel-title">WhatsApp</div>
          <NavLink to="/chat/whatsapp/inbox" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Inbox</NavLink>
          <NavLink to="/chat/whatsapp/templates" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Templates</NavLink>
          <NavLink to="/chat/whatsapp/campaigns" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Campaigns</NavLink>
        </div>

        <div className="channel-group">
          <div className="channel-title">SMS</div>
        </div>

        <div className="channel-group">
          <div className="channel-title">Website</div>
          <NavLink to="/chat/website/inbox" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Inbox</NavLink>
          <NavLink to="/chat/website/widget-settings" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Widget Settings</NavLink>
        </div>
      </div>
      
      {/* Settings Area / Main Content Area Outlet */}
      <Outlet />
    </div>
  );
}
"""
with open('src/components/ChatLayout.jsx', 'w') as f:
    f.write(chat_layout)

# 3. Sidebar.jsx
sidebar_code = """import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [showChatSettings, setShowChatSettings] = useState(true);

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <h2>MantraAssist</h2>
      </div>

      <div className="user-profile">
        <div className="avatar">D</div>
        <div className="user-info">
          <span className="user-name">Demo Mantra Care</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a href="#" className="nav-item">Overview</a>
        <a href="#" className="nav-item">Clients</a>
        <a href="#" className="nav-item">Processes</a>
        <a href="#" className="nav-item">Call Logs</a>
        <a href="#" className="nav-item">Appointments</a>
        <a href="#" className="nav-item">AI Scribe</a>
        <a href="#" className="nav-item">Settings</a>

        <div className="nav-section-title">More Modules</div>
        
        <div className="nav-item-group">
            <NavLink to="/chat" end className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            Chats
            </NavLink>
            
            <div 
                className="nav-item" 
                onClick={() => setShowChatSettings(!showChatSettings)}
                style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
            >
                <span>Chat Settings</span>
                <span>{showChatSettings ? '▼' : '▶'}</span>
            </div>
            
            {showChatSettings && (
                <div style={{ paddingLeft: "1rem" }}>
                    <div className="nav-section-title" style={{ marginTop: "0.5rem", marginBottom: "0.25rem", fontSize: "0.7rem" }}>WhatsApp/SMS</div>
                    <NavLink to="/chat/whatsapp/templates" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Templates</NavLink>
                    <NavLink to="/chat/whatsapp/campaigns" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Campaigns</NavLink>
                    
                    <div className="nav-section-title" style={{ marginTop: "0.5rem", marginBottom: "0.25rem", fontSize: "0.7rem" }}>Website</div>
                    <NavLink to="/chat/website/widget-settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Widget Settings</NavLink>
                </div>
            )}
        </div>

        <a href="#" className="nav-item">Invoices</a>
        <a href="#" className="nav-item">Insurance & Claims</a>
        <a href="#" className="nav-item">Reports</a>
        <a href="#" className="nav-item">Knowledge Base</a>
        <a href="#" className="nav-item">Process Settings</a>
        <a href="#" className="nav-item">Web Forms</a>
        <a href="#" className="nav-item">Product/Services</a>
        <a href="#" className="nav-item">Refer & Earn</a>
      </nav>

      <div className="sidebar-footer">
        <a href="#" className="nav-item">Sign Out</a>
      </div>
    </aside>
  );
}
"""
with open('src/components/Sidebar.jsx', 'w') as f:
    f.write(sidebar_code)

# 4. Main App.jsx refactor
app_code = """import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Sidebar from "./components/Sidebar";
import ChatLayout from "./components/ChatLayout";
import WidgetSettings from "./components/WidgetSettings";
import TemplatesDashboard from "./components/TemplatesDashboard";
import CreateTemplate from "./components/CreateTemplate";
import BrowseTemplates from "./components/BrowseTemplates";

function DefaultLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat/whatsapp/templates" replace />} />
        
        <Route path="/chat" element={
          <DefaultLayout>
            <header className="page-header">
              <div className="header-title">
                <h1>
                  Chats <span className="badge">OMNICHANNEL</span>
                </h1>
                <p>
                  Message clients over WhatsApp and SMS, and set up automated chat campaigns
                </p>
              </div>
              <button className="btn btn-outline">▶ How Chats Works</button>
            </header>
            <ChatLayout />
          </DefaultLayout>
        }>
          <Route index element={<Navigate to="/chat/whatsapp/templates" replace />} />
          <Route path="whatsapp/templates" element={<TemplatesDashboard />} />
          <Route path="whatsapp/templates/create" element={<CreateTemplate />} />
          <Route path="whatsapp/templates/browse" element={<BrowseTemplates />} />
          <Route path="whatsapp/campaigns" element={<div className="settings-area"><h2>Campaigns Placeholder</h2></div>} />
          <Route path="website/widget-settings" element={<WidgetSettings />} />
          {/* Catch-all */}
          <Route path="*" element={<div className="settings-area"><h2>Select an option</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
"""
with open('src/App.jsx', 'w') as f:
    f.write(app_code)

