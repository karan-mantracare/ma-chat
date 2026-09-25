import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function ChatSettingsLayout() {
  return (
    <div className="content-layout">
      {/* Channels Sidebar */}
      <div className="channels-sidebar">
        <h3>Settings Channels</h3>
        
        <div className="channel-group">
          <div className="channel-title">WhatsApp</div>
          <NavLink to="/chat-settings/whatsapp/templates" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Templates</NavLink>
          <NavLink to="/chat-settings/whatsapp/campaigns" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Campaigns</NavLink>
        </div>

        <div className="channel-group">
          <div className="channel-title">SMS</div>
        </div>

        <div className="channel-group">
          <div className="channel-title">Website</div>
          <NavLink to="/chat-settings/website/widget-settings" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Widget Settings</NavLink>
        </div>
      </div>
      
      {/* Settings Area / Main Content Area Outlet */}
      <Outlet />
    </div>
  );
}
