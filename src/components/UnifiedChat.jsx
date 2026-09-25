import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bot, CircleCheckBig, ArrowBigRightDash, Filter, Settings } from 'lucide-react';
import '../index.css';

const UnifiedChat = () => {
  const navigate = useNavigate();
  const [activeClient, setActiveClient] = useState(1);
  const [isClosed, setIsClosed] = useState(false);
  const [showTransferDropdown, setShowTransferDropdown] = useState(false);
  const [transferredTo, setTransferredTo] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Combined clients from all inboxes
  const clients = [
    { id: 1, name: 'David Lee', lastMessage: 'Is this available on WhatsApp?', channel: 'WhatsApp', color: '#25D366', bgColor: '#dcfce7' },
    { id: 2, name: 'Emma Watson', lastMessage: 'Thanks for the quick reply.', channel: 'WhatsApp', color: '#25D366', bgColor: '#dcfce7' },
    { id: 3, name: 'Michael Chen', lastMessage: 'Can you confirm my appointment?', channel: 'SMS', color: '#8b5cf6', bgColor: '#f3e8ff' },
    { id: 4, name: 'Sarah Jones', lastMessage: 'I received the text, thanks.', channel: 'SMS', color: '#8b5cf6', bgColor: '#f3e8ff' },
    { id: 5, name: 'Visitor 1432', lastMessage: 'Are you an AI?', channel: 'AI Chat', color: '#0ea5e9', bgColor: '#e0f2fe' },
    { id: 6, name: 'Visitor 9081', lastMessage: 'How do I reset my password?', channel: 'AI Chat', color: '#0ea5e9', bgColor: '#e0f2fe' },
    { id: 7, name: 'Guest 45', lastMessage: 'I need to speak to a human.', channel: 'Chat', color: '#f59e0b', bgColor: '#fef3c7' },
    { id: 8, name: 'Jane Doe', lastMessage: 'Thanks for your help earlier.', channel: 'Chat', color: '#f59e0b', bgColor: '#fef3c7' },
  ];

  const filteredClients = clients.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.channel === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const activeClientData = clients.find(c => c.id === activeClient) || clients[0];

  return (
    <div className="inbox-area" style={{ height: 'calc(100vh - 100px)', display: 'flex', width: '100%', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      {/* Left Side: Unified Client List */}
      <div className="chat-list-panel" style={{ width: '320px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div className="chat-list-header" style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px 10px', borderRadius: '8px', flex: 1 }}>
              <Search size={16} color="#64748b" style={{ marginRight: '4px' }} />
              <input 
                type="text" 
                placeholder="Search all conversations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                style={{ padding: '8px 10px', backgroundColor: activeFilter !== 'All' ? '#e0f2fe' : '#f1f5f9', color: activeFilter !== 'All' ? '#0ea5e9' : '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Filter by Channel"
              >
                <Filter size={18} />
              </button>
              {showFilterMenu && (
                <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', width: '160px', zIndex: 20, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b', borderBottom: '1px solid #e2e8f0', fontWeight: '600', backgroundColor: '#f8fafc' }}>Filter Channels</div>
                  {['All', 'WhatsApp', 'SMS', 'AI Chat', 'Chat'].map(channel => (
                    <div 
                      key={channel}
                      style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '13px', borderBottom: '1px solid #f1f5f9', backgroundColor: activeFilter === channel ? '#f8fafc' : 'white', fontWeight: activeFilter === channel ? '600' : 'normal', color: activeFilter === channel ? '#0ea5e9' : '#334155' }} 
                      onClick={() => { setActiveFilter(channel); setShowFilterMenu(false); }}
                    >
                      {channel === 'All' ? 'All Channels' : channel}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => navigate('/chat-settings')}
              style={{ padding: '8px 10px', backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
              title="Manage Setting of chat (Admin Access only)"
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
        <div className="chat-list" style={{ overflowY: 'auto', flex: 1 }}>
          {filteredClients.map(client => (
            <div 
              key={client.id}
              onClick={() => {
                setActiveClient(client.id);
                setIsClosed(false);
                setShowTransferDropdown(false);
                setTransferredTo(null);
              }}
              style={{ 
                padding: '16px', 
                borderBottom: '1px solid #e2e8f0', 
                cursor: 'pointer',
                backgroundColor: activeClient === client.id ? '#f8fafc' : 'transparent',
                borderLeft: activeClient === client.id ? `3px solid ${client.color}` : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{client.name}</div>
                <div style={{ 
                  fontSize: '10px', 
                  fontWeight: '600',
                  color: client.color,
                  backgroundColor: client.bgColor,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase'
                }}>
                  {client.channel}
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{client.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Chat Window */}
      <div className="chat-window" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
        <div className="chat-header" style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activeClientData.bgColor, color: activeClientData.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {activeClientData.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', color: '#0f172a' }}>{activeClientData.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span> Active on {activeClientData.channel}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
            <button onClick={() => setIsClosed(true)} title="Mark As Complete" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', transition: 'all 0.2s' }}><CircleCheckBig size={18} /></button>
            <button onClick={() => setShowTransferDropdown(!showTransferDropdown)} title="Transfer" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', transition: 'all 0.2s' }}><ArrowBigRightDash size={18} /></button>
            
            {showTransferDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', width: '220px', zIndex: 10, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b', borderBottom: '1px solid #e2e8f0', fontWeight: '600', backgroundColor: '#f8fafc' }}>Transfer to team member</div>
                <div style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f1f5f9' }} onClick={() => { setTransferredTo('Sarah Connor'); setShowTransferDropdown(false); }}>Sarah Connor</div>
                <div style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f1f5f9' }} onClick={() => { setTransferredTo('John Smith'); setShowTransferDropdown(false); }}>John Smith</div>
                <div style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px' }} onClick={() => { setTransferredTo('Emma Watson'); setShowTransferDropdown(false); }}>Emma Watson</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="chat-messages" style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ alignSelf: 'center', backgroundColor: '#f1f5f9', color: '#64748b', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', marginBottom: '8px' }}>
            Today
          </div>
          
          <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '16px', borderTopLeftRadius: '4px', border: '1px solid #e2e8f0', maxWidth: '75%', color: '#334155', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
            {activeClientData.lastMessage}
          </div>
          
          {activeClientData.channel === 'AI Chat' && (
             <div style={{ alignSelf: 'flex-end', display: 'flex', gap: '12px', maxWidth: '75%', flexDirection: 'row-reverse' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#e0f2fe', borderRadius: '50%', flexShrink: 0 }}><Bot size={20} color="#0ea5e9" /></div>
               <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '14px 18px', borderRadius: '16px', borderTopRightRadius: '4px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                 I am an AI assistant here to help you! How can I assist you today?
               </div>
             </div>
          )}
        </div>
        
        {isClosed ? (
          <div style={{ padding: '24px', backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: '#64748b', fontWeight: 'bold' }}>Chat Closed</div>
            <button onClick={() => setIsClosed(false)} style={{ padding: '10px 20px', backgroundColor: activeClientData.color, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Reopen Conversation
            </button>
          </div>
        ) : transferredTo ? (
          <div style={{ borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 16px', backgroundColor: '#f1f5f9', textAlign: 'center', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
              Chat transferred to {transferredTo}
            </div>
            <div className="chat-input" style={{ padding: '20px 24px', backgroundColor: '#ffffff', display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder={`Type your reply to ${activeClientData.name}...`}
                style={{ flex: 1, padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }}
              />
              <button style={{ padding: '0 28px', backgroundColor: activeClientData.color, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="chat-input" style={{ padding: '20px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder={`Type your reply to ${activeClientData.name}...`}
              style={{ flex: 1, padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = activeClientData.color}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
            <button style={{ padding: '0 28px', backgroundColor: activeClientData.color, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedChat;
