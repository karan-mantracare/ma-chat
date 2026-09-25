import React, { useState } from 'react';
import '../index.css';

const SmsInbox = () => {
  const [activeClient, setActiveClient] = useState(1);

  const clients = [
    { id: 1, name: 'Michael Scott', lastMessage: 'Please call me when you can.' },
    { id: 2, name: 'Jim Halpert', lastMessage: 'Got the SMS update.' },
  ];

  return (
    <div className="inbox-area" style={{ height: '100%', display: 'flex' }}>
      {/* Left Side: Client List */}
      <div className="chat-list-panel" style={{ width: '300px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div className="chat-list-header" style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
            <span style={{ marginRight: '8px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search SMS clients..." 
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
            />
          </div>
        </div>
        <div className="chat-list" style={{ overflowY: 'auto', flex: 1 }}>
          {clients.map(client => (
            <div 
              key={client.id}
              onClick={() => setActiveClient(client.id)}
              style={{ 
                padding: '16px', 
                borderBottom: '1px solid #e2e8f0', 
                cursor: 'pointer',
                backgroundColor: activeClient === client.id ? '#f3e8ff' : 'transparent'
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{client.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{client.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Chat Window */}
      <div className="chat-window" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#faf5ff' }}>
        <div className="chat-header" style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontWeight: 'bold' }}>
          {clients.find(c => c.id === activeClient)?.name} (SMS)
        </div>
        <div className="chat-messages" style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeClient === 1 ? (
            <>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '70%' }}>
                Please call me when you can.
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#a855f7', color: 'white', padding: '12px', borderRadius: '8px', maxWidth: '70%' }}>
                Hi Michael, we will give you a call shortly.
              </div>
            </>
          ) : (
            <>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '70%' }}>
                Got the SMS update.
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#a855f7', color: 'white', padding: '12px', borderRadius: '8px', maxWidth: '70%' }}>
                Thanks Jim, let us know if you need anything else.
              </div>
            </>
          )}
        </div>
        <div className="chat-input" style={{ padding: '16px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Type your SMS message..." 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
          />
          <button style={{ padding: '12px 24px', backgroundColor: '#a855f7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsInbox;
