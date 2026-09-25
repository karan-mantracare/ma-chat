import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ChatSettingsLayout() {
  const [createdWidgetsOpen, setCreatedWidgetsOpen] = useState(true);
  const [customWidgets, setCustomWidgets] = useState([]);

  const loadWidgets = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('customWidgets') || '[]');
      setCustomWidgets(stored);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadWidgets();
    window.addEventListener('widgetsUpdated', loadWidgets);
    return () => window.removeEventListener('widgetsUpdated', loadWidgets);
  }, []);

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
          <NavLink to="/chat-settings/sms/settings" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>Settings</NavLink>
        </div>

        <div className="channel-group">
          <div className="channel-title">Website</div>
          <NavLink to="/chat-settings/website/widget-settings" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`}>+ New Widget</NavLink>
          
          <div style={{ marginTop: '12px' }}>
            <div 
              onClick={() => setCreatedWidgetsOpen(!createdWidgetsOpen)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
            >
              Created Widgets
              {createdWidgetsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            
            {createdWidgetsOpen && (
              <div style={{ paddingLeft: '8px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <NavLink to="/chat-settings/website/created/ai" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`} style={{ fontSize: '13px' }}>
                  AI Chat
                </NavLink>
                <NavLink to="/chat-settings/website/created/human" className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`} style={{ fontSize: '13px' }}>
                  Chat
                </NavLink>
                {customWidgets.map((widget, i) => (
                  <NavLink key={widget.id || i} to={`/chat-settings/website/created/${widget.id}`} className={({isActive}) => `channel-item ${isActive ? 'active' : ''}`} style={{ fontSize: '13px' }}>
                    {widget.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Settings Area / Main Content Area Outlet */}
      <Outlet />
    </div>
  );
}
