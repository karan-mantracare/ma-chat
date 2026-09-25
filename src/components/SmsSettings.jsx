import React, { useState, useEffect } from 'react';
import { Phone, Database, Tag, Edit, Trash2, X, ChevronDown, Plus, MessageSquare } from 'lucide-react';

const SmsSettings = () => {
  const [activeTab, setActiveTab] = useState('numbers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  
  // Connect Provider Modal State
  const [selectedProvider, setSelectedProvider] = useState('Twilio');
  const [connectionName, setConnectionName] = useState('');
  
  // Add Number Modal State
  const [isNumberProviderDropdownOpen, setIsNumberProviderDropdownOpen] = useState(false);
  const [selectedNumberProvider, setSelectedNumberProvider] = useState(null);

  const [savedProviders, setSavedProviders] = useState([
    { id: 1, connectionName: 'Mantra Twilio', provider: 'Twilio' }
  ]);

  const [savedSenderIds, setSavedSenderIds] = useState([
    { id: 1, route: 'Transactional', senderId: 'MANTRA', peId: '1234567890' }
  ]);
  
  const [senderRoute, setSenderRoute] = useState('Transactional');
  const [senderIdInput, setSenderIdInput] = useState('');
  const [peIdInput, setPeIdInput] = useState('');
  
  const providers = ['Twilio', 'MSG91', 'BulkSMSGateway'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const tabStyle = (isActive) => ({
    color: isActive ? '#0f172a' : '#64748b'
  });

  const theadStyle = {
    color: '#64748b',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '2px solid #f1f5f9'
  };

  const thStyle = { padding: '20px 24px' };
  const tdStyle = { padding: '20px 24px', fontSize: '14px', color: '#1e293b', borderBottom: '1px solid #f1f5f9' };
  const actionBtnStyle = { border: '1px solid transparent', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', flex: 1, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: 'bold', letterSpacing: '-0.02em' }}>SMS Settings</h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#64748b' }}>Configuring infrastructure for MantraCare</p>
        </div>
        <button 
          className="premium-btn"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} strokeWidth={3} />
          {activeTab === 'numbers' ? 'Add New Number' : activeTab === 'providers' ? 'Connect Provider' : 'Add Sender ID'}
        </button>
      </div>

      {/* Segmented Tabs */}
      <div className="premium-tab-container">
        <div className={`premium-tab ${activeTab === 'numbers' ? 'active' : ''}`} style={tabStyle(activeTab === 'numbers')} onClick={() => setActiveTab('numbers')}>
          <Phone size={16} /> Numbers
        </div>
        <div className={`premium-tab ${activeTab === 'providers' ? 'active' : ''}`} style={tabStyle(activeTab === 'providers')} onClick={() => setActiveTab('providers')}>
          <Database size={16} /> Providers
        </div>
        <div className={`premium-tab ${activeTab === 'sender' ? 'active' : ''}`} style={tabStyle(activeTab === 'sender')} onClick={() => setActiveTab('sender')}>
          <Tag size={16} /> Sender ID
        </div>
      </div>

      {/* Content Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          
          {/* Numbers Tab */}
          {activeTab === 'numbers' && (
            <>
              <thead>
                <tr>
                  <th style={{ ...theadStyle, ...thStyle }}>ID</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Number</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Provider</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Priority</th>
                  <th style={{ ...theadStyle, ...thStyle, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="premium-table-row">
                  <td style={tdStyle}>1</td>
                  <td style={{ ...tdStyle, color: '#4f46e5', fontWeight: '600', letterSpacing: '0.5px' }}>+91 9999999999</td>
                  <td style={tdStyle}>Mantra Twilio</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'inline-block', backgroundColor: '#fee2e2', color: '#ef4444', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>High</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>India</div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button className="premium-action-btn" style={actionBtnStyle}><Edit size={16} color="#64748b" /></button>
                      <button className="premium-action-btn" style={actionBtnStyle}><Trash2 size={16} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </>
          )}

          {/* Providers Tab */}
          {activeTab === 'providers' && (
            <>
              <thead>
                <tr>
                  <th style={{ ...theadStyle, ...thStyle }}>ID</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Connection Name</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Provider</th>
                  <th style={{ ...theadStyle, ...thStyle, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedProviders.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '64px', textAlign: 'center', color: '#94a3b8' }}>
                      <Database size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                      <p style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', color: '#64748b' }}>No Providers Connected</p>
                      <p style={{ fontSize: '14px', margin: 0 }}>Click 'Connect Provider' to add your first SMS provider.</p>
                    </td>
                  </tr>
                ) : (
                  savedProviders.map(p => (
                    <tr key={p.id} className="premium-table-row">
                      <td style={tdStyle}>{p.id}</td>
                      <td style={{ ...tdStyle, color: '#0f172a', fontWeight: '600' }}>{p.connectionName}</td>
                      <td style={tdStyle}>
                        <span style={{ display: 'inline-block', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>{p.provider}</span>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="premium-action-btn" style={actionBtnStyle}><Edit size={16} color="#64748b" /></button>
                          <button className="premium-action-btn" style={actionBtnStyle} onClick={() => setSavedProviders(savedProviders.filter(sp => sp.id !== p.id))}><Trash2 size={16} color="#ef4444" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </>
          )}

          {/* Sender ID Tab */}
          {activeTab === 'sender' && (
            <>
              <thead>
                <tr>
                  <th style={{ ...theadStyle, ...thStyle }}>ID</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Route</th>
                  <th style={{ ...theadStyle, ...thStyle }}>Sender ID</th>
                  <th style={{ ...theadStyle, ...thStyle }}>PE ID (Entity ID)</th>
                  <th style={{ ...theadStyle, ...thStyle, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedSenderIds.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '64px', textAlign: 'center', color: '#94a3b8' }}>
                      <MessageSquare size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                      <p style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', color: '#64748b' }}>No Sender IDs Added</p>
                      <p style={{ fontSize: '14px', margin: 0 }}>Register your first Sender ID to start sending campaigns.</p>
                    </td>
                  </tr>
                ) : (
                  savedSenderIds.map(s => (
                    <tr key={s.id} className="premium-table-row">
                      <td style={tdStyle}>{s.id}</td>
                      <td style={tdStyle}>
                        <span style={{ display: 'inline-block', backgroundColor: s.route === 'Transactional' ? '#eef2ff' : '#fdf2f8', color: s.route === 'Transactional' ? '#4f46e5' : '#db2777', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{s.route}</span>
                      </td>
                      <td style={{ ...tdStyle, color: '#0f172a', fontWeight: '700', letterSpacing: '1px' }}>{s.senderId}</td>
                      <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#64748b' }}>{s.peId}</td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="premium-action-btn" style={actionBtnStyle}><Edit size={16} color="#64748b" /></button>
                          <button className="premium-action-btn" style={actionBtnStyle} onClick={() => setSavedSenderIds(savedSenderIds.filter(x => x.id !== s.id))}><Trash2 size={16} color="#ef4444" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </>
          )}
        </table>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div 
          className="premium-modal-overlay"
          onClick={() => setIsModalOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}
        >
          <div 
            className="premium-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflowY: 'auto' }}
          >
            
            {activeTab === 'providers' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Connect Provider</h3>
                  <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                    <X size={18} />
                  </button>
                </div>
                <div style={{ padding: '32px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Connection Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Marketing Twilio"
                      value={connectionName}
                      onChange={(e) => setConnectionName(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                  <div style={{ marginBottom: '32px', position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Provider</label>
                    <div 
                      onClick={() => setIsProviderDropdownOpen(!isProviderDropdownOpen)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${isProviderDropdownOpen ? '#3b82f6' : '#cbd5e1'}`, fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', backgroundColor: 'white', transition: 'border-color 0.2s' }}
                    >
                      <span style={{ fontWeight: '500', color: '#0f172a' }}>{selectedProvider}</span>
                      <ChevronDown size={18} color="#64748b" style={{ transform: isProviderDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </div>
                    {isProviderDropdownOpen && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 10, overflow: 'hidden' }}>
                        {providers.map((provider) => (
                          <div 
                            key={provider}
                            onClick={() => { setSelectedProvider(provider); setIsProviderDropdownOpen(false); }}
                            style={{ padding: '14px 16px', fontSize: '15px', cursor: 'pointer', backgroundColor: provider === selectedProvider ? '#eff6ff' : 'white', color: provider === selectedProvider ? '#3b82f6' : '#1e293b', fontWeight: provider === selectedProvider ? '600' : '500' }}
                          >
                            {provider}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <h4 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Key Details</h4>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Account SID</label>
                    <input 
                      type="text" 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Auth Token</label>
                    <input 
                      type="password" 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '24px 32px', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 24px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => {
                    if(connectionName) {
                      setSavedProviders([...savedProviders, { id: Date.now(), connectionName, provider: selectedProvider }]);
                      setConnectionName('');
                      setIsModalOpen(false);
                    }
                  }} style={{ padding: '10px 24px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: 'white', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)' }}>Save Settings</button>
                </div>
              </>
            )}

            {activeTab === 'numbers' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Add New Number</h3>
                  <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                    <X size={18} />
                  </button>
                </div>
                <div style={{ padding: '32px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +1234567890" 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  <div style={{ marginBottom: '24px', position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Provider</label>
                    <div 
                      onClick={() => setIsNumberProviderDropdownOpen(!isNumberProviderDropdownOpen)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${isNumberProviderDropdownOpen ? '#3b82f6' : '#cbd5e1'}`, fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', backgroundColor: 'white' }}
                    >
                      <span style={{ fontWeight: '500', color: selectedNumberProvider ? '#0f172a' : '#94a3b8' }}>
                        {selectedNumberProvider ? `${selectedNumberProvider.connectionName} (${selectedNumberProvider.provider})` : 'Select a provider'}
                      </span>
                      <ChevronDown size={18} color="#64748b" style={{ transform: isNumberProviderDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </div>

                    {isNumberProviderDropdownOpen && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
                        {savedProviders.map((p) => (
                          <div 
                            key={p.id}
                            onClick={() => { setSelectedNumberProvider(p); setIsNumberProviderDropdownOpen(false); }}
                            style={{ padding: '14px 16px', fontSize: '15px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', fontWeight: '500', color: '#0f172a' }}
                          >
                            {p.connectionName} <span style={{color: '#64748b', fontSize: '13px'}}>({p.provider})</span>
                          </div>
                        ))}
                        {savedProviders.length === 0 && (
                          <div style={{ padding: '16px', fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>No providers added yet.</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Priority</label>
                    <div style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
                      <span style={{ fontWeight: '500', color: '#0f172a' }}>Normal</span>
                      <ChevronDown size={18} color="#64748b" />
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Allowed Country</label>
                    <div style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
                      <span style={{ fontWeight: '500', color: '#0f172a' }}>India</span>
                      <ChevronDown size={18} color="#64748b" />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '24px 32px', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 24px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 32px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: 'white', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)' }}>Save Number</button>
                </div>
              </>
            )}

            {activeTab === 'sender' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Add Sender ID</h3>
                  <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                    <X size={18} />
                  </button>
                </div>
                <div style={{ padding: '32px' }}>
                  
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '16px' }}>Route</label>
                    <div style={{ display: 'flex', gap: '32px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', color: '#334155', fontWeight: '500' }}>
                        <input 
                          type="radio" 
                          name="route" 
                          checked={senderRoute === 'Transactional'} 
                          onChange={() => setSenderRoute('Transactional')}
                          style={{ width: '18px', height: '18px', accentColor: '#4f46e5' }}
                        />
                        Transactional
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', color: '#334155', fontWeight: '500' }}>
                        <input 
                          type="radio" 
                          name="route" 
                          checked={senderRoute === 'Promotional'} 
                          onChange={() => setSenderRoute('Promotional')}
                          style={{ width: '18px', height: '18px', accentColor: '#4f46e5' }}
                        />
                        Promotional
                      </label>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Sender ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MANTRA"
                      value={senderIdInput}
                      onChange={(e) => setSenderIdInput(e.target.value)}
                      maxLength={6}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box', letterSpacing: '2px', textTransform: 'uppercase' }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                    <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#64748b' }}>Must be exactly 6 alphabetic characters (e.g. MANTRA).</p>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>PE ID (Entity ID)</label>
                    <input 
                      type="text" 
                      placeholder="Add PE ID"
                      value={peIdInput}
                      onChange={(e) => setPeIdInput(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                  
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '24px 32px', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 24px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => {
                    if(senderIdInput && peIdInput) {
                      setSavedSenderIds([...savedSenderIds, { id: Date.now(), route: senderRoute, senderId: senderIdInput.toUpperCase(), peId: peIdInput }]);
                      setSenderIdInput('');
                      setPeIdInput('');
                      setIsModalOpen(false);
                    }
                  }} style={{ padding: '10px 32px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: 'white', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>Save Settings</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default SmsSettings;
