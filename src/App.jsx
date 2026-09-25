import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Sidebar from "./components/Sidebar";
import ChatLayout from "./components/ChatLayout";
import ChatSettingsLayout from "./components/ChatSettingsLayout";
import WidgetSettings from "./components/WidgetSettings";
import TemplatesDashboard from "./components/TemplatesDashboard";
import CreateTemplate from "./components/CreateTemplate";
import BrowseTemplates from "./components/BrowseTemplates";
import Campaigns from "./components/Campaigns";
import UnifiedChat from "./components/UnifiedChat";
import SmsSettings from "./components/SmsSettings";

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
        <Route path="/" element={<Navigate to="/chat" replace />} />
        
        {/* Chat Routes (Team Members) */}
        <Route path="/chat" element={
          <DefaultLayout>
            <header className="page-header">
              <div className="header-title">
                <h1>
                  Chats <span className="badge">OMNICHANNEL</span>
                </h1>
                <p>
                  Message clients over WhatsApp and SMS, and manage active conversations.
                </p>
              </div>
            </header>
            <UnifiedChat />
          </DefaultLayout>
        }>
          <Route path="*" element={<UnifiedChat />} />
        </Route>

        {/* Chat Settings Routes (Admin/Product Team) */}
        <Route path="/chat-settings" element={
          <DefaultLayout>
            <header className="page-header">
              <div className="header-title">
                <h1>
                  Chat Settings <span className="badge">ADMIN</span>
                </h1>
                <p>
                  Configure templates, campaigns, and widget settings for all channels.
                </p>
              </div>
            </header>
            <ChatSettingsLayout />
          </DefaultLayout>
        }>
          <Route index element={<Navigate to="/chat-settings/whatsapp/templates" replace />} />
          <Route path="whatsapp/templates" element={<TemplatesDashboard />} />
          <Route path="whatsapp/templates/create" element={<CreateTemplate />} />
          <Route path="whatsapp/templates/browse" element={<BrowseTemplates />} />
          <Route path="whatsapp/campaigns" element={<Campaigns />} />
          <Route path="sms/settings" element={<SmsSettings />} />
          <Route path="website/widget-settings" element={<WidgetSettings />} />
          <Route path="*" element={<div className="settings-area"><h2>Select a setting</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
