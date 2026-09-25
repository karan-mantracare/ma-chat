import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

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
        
        <NavLink to="/chat" className={({isActive}) => `nav-item ${isActive || location.pathname.startsWith('/chat/') && !location.pathname.startsWith('/chat-settings') ? 'active' : ''}`}>
          Chats
        </NavLink>
        
        <NavLink to="/chat-settings" className={({isActive}) => `nav-item ${isActive || location.pathname.startsWith('/chat-settings') ? 'active' : ''}`}>
          Chat Settings
        </NavLink>

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
