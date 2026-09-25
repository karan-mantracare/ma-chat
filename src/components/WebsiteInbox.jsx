import React, { useState } from 'react';
import { CircleCheckBig, ArrowBigRightDash, Search } from 'lucide-react';
import '../index.css';

const WebsiteInbox = () => {
  const [activeClient, setActiveClient] = useState(1);
  const [isClosed, setIsClosed] = useState(false);
  const [showTransferDropdown, setShowTransferDropdown] = useState(false);
  const [transferredTo, setTransferredTo] = useState(null);

  const clients = [
    { id: 1, name: 'Alice Smith', lastMessage: 'Can you help me with my order?' },
    { id: 2, name: 'Bob Johnson', lastMessage: 'Thank you for the update.' },
  ];

  return (
    <div className="inbox-area" style={{ height: '100%', display: 'flex' }}>
      {/* Left Side: Client List */}
      <div className="chat-list-panel" style={{ width: '300px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div className="chat-list-header" style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
            <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
            />
          </div>
        </div>
        <div className="chat-list" style={{ overflowY: 'auto', flex: 1 }}>
          {clients.map(client => (
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
                backgroundColor: activeClient === client.id ? '#e0f2fe' : 'transparent'
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{client.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{client.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Chat Window */}
      <div className="chat-window" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
        <div className="chat-header" style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{clients.find(c => c.id === activeClient)?.name}</div>
          <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
            <button onClick={() => setIsClosed(true)} title="Mark As Complete" style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}><CircleCheckBig size={18} /></button>
            <button onClick={() => setShowTransferDropdown(!showTransferDropdown)} title="Transfer" style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}><ArrowBigRightDash size={18} /></button>
            
            {showTransferDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', width: '200px', zIndex: 10 }}>
                <div style={{ padding: '8px 12px', fontSize: '12px', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Transfer to team member</div>
                <div style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }} onClick={() => { setTransferredTo('Sarah Connor'); setShowTransferDropdown(false); }}>Sarah Connor</div>
                <div style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }} onClick={() => { setTransferredTo('John Smith'); setShowTransferDropdown(false); }}>John Smith</div>
                <div style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }} onClick={() => { setTransferredTo('Emma Watson'); setShowTransferDropdown(false); }}>Emma Watson</div>
              </div>
            )}
          </div>
        </div>
        <div className="chat-messages" style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeClient === 1 ? (
            <>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '70%' }}>
                Hi, I placed an order yesterday and want to know its status.
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#0ea5e9', color: 'white', padding: '12px', borderRadius: '8px', maxWidth: '70%' }}>
                Hello Alice! Let me check that for you right away.
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#0ea5e9', color: 'white', padding: '12px', borderRadius: '8px', maxWidth: '70%' }}>
                Your order is currently out for delivery and should arrive today.
              </div>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '70%' }}>
                Great, thank you!
              </div>
            </>
          ) : (
            <>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '70%' }}>
                I received the package, thanks!
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#0ea5e9', color: 'white', padding: '12px', borderRadius: '8px', maxWidth: '70%' }}>
                You're welcome, Bob! Enjoy your purchase.
              </div>
            </>
          )}
        </div>
        {isClosed ? (
          <div style={{ padding: '24px 16px', backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ color: '#64748b', fontWeight: 'bold' }}>Chat Closed</div>
            <button onClick={() => setIsClosed(false)} style={{ padding: '8px 16px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Start the conversation again
            </button>
          </div>
        ) : transferredTo ? (
          <div style={{ borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', textAlign: 'center', color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>
              Chat transferred to {transferredTo}
            </div>
            <div className="chat-input" style={{ padding: '16px', backgroundColor: '#ffffff', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
              />
              <button style={{ padding: '12px 24px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="chat-input" style={{ padding: '16px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
            <button style={{ padding: '12px 24px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteInbox;
