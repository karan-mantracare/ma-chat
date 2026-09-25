import React from "react";
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
        </div>

        <div className="channel-group">
          <div className="channel-title">SMS</div>
          <NavLink to="/chat/sms/inbox" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Inbox</NavLink>
        </div>

        <div className="channel-group">
          <div className="channel-title">Website</div>
          <NavLink to="/chat/website/ai-chat" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>AI Chat</NavLink>
          <NavLink to="/chat/website/chat" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Chat</NavLink>
        </div>
      </div>
      
      {/* Main Content Area Outlet */}
      <Outlet />
    </div>
  );
}
