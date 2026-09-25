import React, { useState, useEffect, useRef } from "react";
import { Zap, Play, Send, TrendingUp, Plus, MoreVertical, Eye, Edit2, Pause, Trash2, Check, MessageCircle, Clock, CheckCircle, X, ArrowDown, MousePointerClick } from "lucide-react";

export default function Campaigns() {
  const [view, setView] = useState("dashboard"); // 'dashboard' or 'editor'
  const [isNewCampaign, setIsNewCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignAudience, setCampaignAudience] = useState("");
  
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [openActionDropdown, setOpenActionDropdown] = useState(null);
  const [viewingCampaign, setViewingCampaign] = useState(null); // Selected campaign to view overview
  const [campaignToDelete, setCampaignToDelete] = useState(null); // ID of campaign to delete
  const [showVariableDropdown, setShowVariableDropdown] = useState(false); // Global toggle for Insert Variable
  
  // Ref for click outside to close dropdown
  const dropdownRef = useRef(null);

  // Global ESC key handler to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCampaignToDelete(null);
        setViewingCampaign(null);
        setShowVariableDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenActionDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Post-Visit Follow-up', status: 'ACTIVE', audience: 'Post-Visit Patients', sent: 342, created: '2026-06-20' },
    { id: 2, name: 'Appointment Reminder Series', status: 'ACTIVE', audience: 'Scheduled Patients', sent: 156, created: '2026-06-22' },
    { id: 3, name: 'New Lead Nurture', status: 'DRAFT', audience: 'New Leads List', sent: 0, created: '2026-06-27' },
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const togglePause = (id) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        if (c.status === 'ACTIVE') {
          setToastMessage('Campaign paused');
          return { ...c, status: 'PAUSED' };
        }
        if (c.status === 'PAUSED') {
          setToastMessage('Campaign resumed');
          return { ...c, status: 'ACTIVE' };
        }
      }
      return c;
    }));
    setOpenActionDropdown(null);
  };

  const confirmDelete = () => {
    if (campaignToDelete) {
      setCampaigns(prev => prev.filter(c => c.id !== campaignToDelete));
      setToastMessage('Campaign deleted');
      setCampaignToDelete(null);
    }
  };

  const handleDeleteClick = (id) => {
    setCampaignToDelete(id);
    setOpenActionDropdown(null);
  };

  // Initial mock state matching the screenshots
  const [nodes, setNodes] = useState([
    { id: 1, type: "message", messageType: "message", title: "Welcome Message", subtitle: "Hi {{contact_name}}, thank you for visiting us!" },
    { id: 2, type: "delay", title: "Wait 2 Days", subtitle: "Wait 2 days" },
    { id: 3, type: "message", messageType: "message", title: "Feedback Request", subtitle: "We'd love to hear your feedback." }
  ]);

  const handleNodeClick = (id) => {
    setSelectedNodeId(id);
  };

  const handleMessageTypeChange = (type) => {
    setNodes(prev => prev.map(n => n.id === selectedNodeId ? { 
      ...n, 
      messageType: type,
      subtitle: type === 'message' ? "—" : type === 'template' ? "Template: —" : "Chatbot: —"
    } : n));
  };

  const addNode = (type) => {
    const newId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 1;
    let newNode = { id: newId, type };
    if (type === 'message') {
      newNode = { ...newNode, messageType: "message", title: "New Message", subtitle: "—" };
    } else if (type === 'delay') {
      newNode = { ...newNode, title: "Wait", duration: "1", unit: "days" };
    } else if (type === 'condition') {
      newNode = { ...newNode, title: "Check Condition", variable: "Client Name", operator: "Equals", value: "" };
    }
    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newId);
  };

  const deleteNode = (id) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  };

  const handleNodeChange = (field, value) => {
    setNodes(prev => prev.map(n => n.id === selectedNodeId ? { 
      ...n, 
      [field]: value 
    } : n));
  };

  const insertVariable = (field, variable) => {
    setNodes(prev => prev.map(n => {
      if (n.id === selectedNodeId) {
        return { ...n, [field]: (n[field] || "") + variable };
      }
      return n;
    }));
    setShowVariableDropdown(false);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Calculate summary
  const messagesCount = nodes.filter(n => n.type === 'message').length;
  const delaysCount = nodes.filter(n => n.type === 'delay').length;
  const totalSteps = nodes.length + 1; // +1 for End Flow

  if (view === "dashboard") {
    return (
      <div style={{ padding: "40px", backgroundColor: "#f8fafc", flex: 1, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "28px", color: "#0f172a", fontWeight: "bold", letterSpacing: "-0.02em" }}>WhatsApp Campaigns</h2>
            <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#64748b" }}>Create and track automated marketing flows</p>
          </div>
          <button 
            className="premium-btn"
            onClick={() => {
              setIsNewCampaign(true);
              setCampaignName("");
              setCampaignAudience("");
              setNodes([{ id: 1, type: "message", messageType: "message", title: "Message 1", subtitle: "—" }]);
              setSelectedNodeId(null);
              setView("editor");
            }}
            style={{ backgroundColor: "#1e293b", color: "white", border: "none", padding: "12px 20px", borderRadius: "24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
          >
            <Plus size={16} strokeWidth={3} />
            New Campaign
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" }}>
          
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a", lineHeight: "1.2" }}>3</div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Total Campaigns</div>
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#f0fdf4", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a", lineHeight: "1.2" }}>2</div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Active</div>
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#faf5ff", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Send size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a", lineHeight: "1.2" }}>498</div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Total Sent</div>
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#fff7ed", color: "#f97316", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a", lineHeight: "1.2" }}>78%</div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Avg. Open Rate</div>
            </div>
          </div>

        </div>

        {/* Campaigns Table */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1e293b", color: "white" }}>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>CAMPAIGN NAME</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>STATUS</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>AUDIENCE</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>SENT</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>CREATED</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="premium-table-row">
                  <td style={{ padding: "24px", fontSize: "15px", color: "#0f172a", fontWeight: "600", borderBottom: "1px solid #f1f5f9" }}>{campaign.name}</td>
                  <td style={{ padding: "24px", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ 
                      display: "inline-block", 
                      backgroundColor: campaign.status === 'ACTIVE' ? "#dcfce7" : campaign.status === 'PAUSED' ? "#fef08a" : "#f1f5f9", 
                      color: campaign.status === 'ACTIVE' ? "#166534" : campaign.status === 'PAUSED' ? "#a16207" : "#475569", 
                      padding: "4px 12px", 
                      borderRadius: "16px", 
                      fontSize: "12px", 
                      fontWeight: "700" 
                    }}>{campaign.status}</span>
                  </td>
                  <td style={{ padding: "24px", fontSize: "14px", color: "#9333ea", fontWeight: "600", borderBottom: "1px solid #f1f5f9" }}>{campaign.audience}</td>
                  <td style={{ padding: "24px", fontSize: "15px", color: "#0f172a", fontWeight: "700", borderBottom: "1px solid #f1f5f9" }}>{campaign.sent}</td>
                  <td style={{ padding: "24px", fontSize: "14px", color: "#94a3b8", borderBottom: "1px solid #f1f5f9" }}>{campaign.created}</td>
                  <td style={{ padding: "24px", textAlign: "center", borderBottom: "1px solid #f1f5f9", position: "relative" }}>
                    <button 
                      className="premium-action-btn" 
                      onClick={(e) => { e.stopPropagation(); setOpenActionDropdown(openActionDropdown === campaign.id ? null : campaign.id); }}
                      style={{ background: openActionDropdown === campaign.id ? "#f1f5f9" : "transparent", border: "none", cursor: "pointer", color: "#64748b", padding: "8px", borderRadius: "50%" }}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openActionDropdown === campaign.id && (
                      <div 
                        ref={dropdownRef}
                        className="premium-modal-content"
                        style={{ position: "absolute", top: "100%", right: "24px", width: "200px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", border: "1px solid #e2e8f0", zIndex: 50, overflow: "hidden", marginTop: "-10px" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <button 
                            onClick={() => { setViewingCampaign(campaign); setOpenActionDropdown(null); }}
                            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "white", border: "none", borderBottom: "1px solid transparent", cursor: "pointer", fontSize: "14px", color: "#334155", fontWeight: "500", textAlign: "left" }} 
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"} 
                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                          >
                            <Eye size={16} color="#64748b" /> View Overview
                          </button>
                          <button 
                            onClick={() => { 
                              setIsNewCampaign(false);
                              setCampaignName(campaign.name);
                              setCampaignAudience(campaign.audience);
                              setNodes([
                                { id: 1, type: "message", messageType: "message", title: "Welcome Message", subtitle: "Hi {{contact_name}}, thank you for visiting us!", content: "Hi {{contact_name}}, thank you for visiting us!" },
                                { id: 2, type: "delay", title: "Wait", duration: "2", unit: "days" },
                                { id: 3, type: "message", messageType: "message", title: "Feedback Request", subtitle: "We'd love to hear your feedback.", content: "We'd love to hear your feedback." }
                              ]);
                              setSelectedNodeId(null);
                              setView('editor'); 
                              setOpenActionDropdown(null); 
                            }} 
                            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "white", border: "none", cursor: "pointer", fontSize: "14px", color: "#334155", fontWeight: "500", textAlign: "left" }} 
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"} 
                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                          >
                            <Edit2 size={16} color="#64748b" /> Edit Campaign
                          </button>
                          
                          {campaign.status !== 'DRAFT' && (
                            <button 
                              onClick={() => togglePause(campaign.id)}
                              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "white", border: "none", cursor: "pointer", fontSize: "14px", color: "#334155", fontWeight: "500", textAlign: "left" }} 
                              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"} 
                              onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                            >
                              {campaign.status === 'PAUSED' ? (
                                <><Play size={16} color="#64748b" /> Resume</>
                              ) : (
                                <><Pause size={16} color="#64748b" /> Pause</>
                              )}
                            </button>
                          )}
                          
                          <button 
                            onClick={() => handleDeleteClick(campaign.id)}
                            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "white", border: "none", borderTop: "1px solid #f1f5f9", cursor: "pointer", fontSize: "14px", color: "#ef4444", fontWeight: "500", textAlign: "left" }} 
                            onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"} 
                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                          >
                            <Trash2 size={16} color="#ef4444" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 1000, backgroundColor: "white", padding: "12px 20px", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #e2e8f0", animation: "fadeInSlideUp 0.3s ease-out" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#0f172a", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={12} strokeWidth={4} />
            </div>
            <span style={{ fontSize: "14px", color: "#334155", fontWeight: "500" }}>{toastMessage}</span>
          </div>
        )}

        {/* View Overview Slide-over Panel */}
        {viewingCampaign && (
          <div onClick={() => setViewingCampaign(null)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 100, display: "flex", justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{ width: "500px", height: "100%", backgroundColor: "white", display: "flex", flexDirection: "column", boxShadow: "-10px 0 25px rgba(0,0,0,0.1)", animation: "slideInRight 0.3s ease-out forwards" }}
            >
              {/* Header */}
              <div style={{ padding: "32px", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h2 style={{ margin: 0, fontSize: "22px", color: "#0f172a", fontWeight: "bold" }}>{viewingCampaign.name}</h2>
                    <span style={{ display: "inline-block", backgroundColor: viewingCampaign.status === 'ACTIVE' ? "#dcfce7" : "#f1f5f9", color: viewingCampaign.status === 'ACTIVE' ? "#166534" : "#475569", padding: "4px 12px", borderRadius: "16px", fontSize: "12px", fontWeight: "700" }}>{viewingCampaign.status}</span>
                  </div>
                  <button onClick={() => setViewingCampaign(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}>
                    <X size={16} />
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>Audience: {viewingCampaign.audience === 'Post-Visit Patients' ? 'Patients visited in last 7 days' : viewingCampaign.audience} · Created {viewingCampaign.created}</p>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: "auto", padding: "32px", backgroundColor: "#f8fafc" }}>
                
                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                  <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.5px" }}>SENT</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}><Send size={16} /></div>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a" }}>{viewingCampaign.sent}</div>
                  </div>
                  
                  <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.5px" }}>DELIVERED</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#f0fdf4", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={16} strokeWidth={3} /></div>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a" }}>330</div>
                  </div>

                  <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.5px" }}>OPENED</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#faf5ff", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={16} /></div>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a" }}>210</div>
                  </div>

                  <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.5px" }}>CLICKED</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fff7ed", color: "#f97316", display: "flex", alignItems: "center", justifyContent: "center" }}><MousePointerClick size={16} /></div>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a" }}>87</div>
                  </div>
                </div>

                {/* Campaign Flow */}
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", letterSpacing: "0.5px", marginBottom: "16px" }}>CAMPAIGN FLOW</h3>
                  
                  {/* Step 1 */}
                  <div style={{ backgroundColor: "white", border: "1px solid #bfdbfe", borderRadius: "16px", padding: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", flexShrink: 0 }}><MessageCircle size={18} /></div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#3b82f6", fontSize: "14px" }}>Welcome Message</div>
                      <div style={{ fontSize: "12px", color: "#3b82f6", marginTop: "2px", opacity: 0.8 }}>Hi {'{{contact_name}}'}, thank you for visiting us!</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", color: "#cbd5e1" }}>
                    <div style={{ height: "16px", borderLeft: "1px dashed #cbd5e1", position: "relative" }}>
                      <ArrowDown size={14} style={{ position: "absolute", bottom: "-12px", left: "-7.5px" }} />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div style={{ backgroundColor: "#fefce8", border: "1px solid #fde047", borderRadius: "16px", padding: "16px", display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #fde047", display: "flex", alignItems: "center", justifyContent: "center", color: "#ca8a04", flexShrink: 0, backgroundColor: "white" }}><Clock size={18} /></div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#ca8a04", fontSize: "14px" }}>Wait 2 Days</div>
                      <div style={{ fontSize: "12px", color: "#ca8a04", marginTop: "2px", opacity: 0.8 }}>Wait 2 days</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", color: "#cbd5e1" }}>
                    <div style={{ height: "16px", borderLeft: "1px dashed #cbd5e1", position: "relative" }}>
                      <ArrowDown size={14} style={{ position: "absolute", bottom: "-12px", left: "-7.5px" }} />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div style={{ backgroundColor: "white", border: "1px solid #bfdbfe", borderRadius: "16px", padding: "16px", display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", flexShrink: 0 }}><MessageCircle size={18} /></div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#3b82f6", fontSize: "14px" }}>Feedback Request</div>
                      <div style={{ fontSize: "12px", color: "#3b82f6", marginTop: "2px", opacity: 0.8 }}>We'd love to hear your feedback.</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", color: "#cbd5e1" }}>
                    <div style={{ height: "16px", borderLeft: "1px dashed #cbd5e1", position: "relative" }}>
                      <ArrowDown size={14} style={{ position: "absolute", bottom: "-12px", left: "-7.5px" }} />
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "16px", display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", flexShrink: 0 }}><CheckCircle size={18} /></div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>End Flow</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: "24px 32px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span onClick={() => setViewingCampaign(null)} style={{ color: "#64748b", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>Close</span>
                <button 
                  onClick={() => { setView('editor'); setViewingCampaign(null); }}
                  style={{ backgroundColor: "#1e293b", color: "white", border: "none", padding: "10px 20px", borderRadius: "24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Edit2 size={16} /> Edit Campaign
                </button>
              </div>

            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {campaignToDelete && (
          <div onClick={() => setCampaignToDelete(null)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(15, 23, 42, 0.4)", animation: "fadeInFast 0.2s ease-out" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", borderRadius: "16px", width: "400px", padding: "32px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", animation: "fadeInSlideUp 0.3s ease-out" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#fef2f2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Trash2 size={24} />
                </div>
                <h3 style={{ margin: "0 0 12px 0", fontSize: "20px", color: "#0f172a", fontWeight: "bold" }}>Delete Campaign</h3>
                <p style={{ margin: "0 0 32px 0", fontSize: "15px", color: "#64748b", lineHeight: "1.5" }}>
                  Are you sure you want to delete this campaign? This action cannot be undone and will permanently remove all associated data.
                </p>
                <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                  <button 
                    onClick={() => setCampaignToDelete(null)}
                    style={{ flex: 1, padding: "12px", backgroundColor: "white", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "24px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    style={{ flex: 1, padding: "12px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)" }}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="settings-area" style={{ display: "flex", flexDirection: "row", gap: "24px", alignItems: "flex-start", background: "#f8fafc", padding: "24px", height: "100%", fontFamily: "Inter, sans-serif", flexWrap: "nowrap", overflowX: "auto", overflowY: "hidden", minHeight: "0" }}>
      
      {/* Left Area - Flow Editor */}
      <div style={{ flex: "1", minWidth: "600px", height: "100%", overflowY: "auto", background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px" }}>
          <div style={{ flex: 1, marginRight: "24px" }}>
            <input 
              type="text" 
              placeholder="Campaign name..." 
              value={campaignName} 
              onChange={e => setCampaignName(e.target.value)}
              style={{ width: "100%", margin: 0, fontSize: "24px", fontWeight: "bold", color: "#0f172a", border: "none", outline: "none", padding: 0, background: "transparent" }}
            />
            <input 
              type="text" 
              placeholder="Target audience (e.g. All new leads)" 
              value={campaignAudience}
              onChange={e => setCampaignAudience(e.target.value)}
              style={{ width: "100%", margin: "8px 0 0 0", fontSize: "14px", color: "#64748b", border: "none", outline: "none", padding: 0, background: "transparent" }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="premium-btn-outline" onClick={() => setView("dashboard")} style={{ borderRadius: "24px", padding: "10px 24px", fontWeight: "600", fontSize: "14px", border: "1px solid #cbd5e1", background: "white", color: "#475569", cursor: "pointer" }}>Cancel</button>
            <button className="premium-btn-outline" onClick={() => setView("dashboard")} style={{ borderRadius: "24px", padding: "10px 24px", fontWeight: "600", fontSize: "14px", border: "1px solid #cbd5e1", background: "white", color: "#0f172a", cursor: "pointer" }}>Save as Draft</button>
            <button className="premium-btn" onClick={() => setView("dashboard")} style={{ background: "#1e293b", color: "white", border: "none", borderRadius: "24px", padding: "10px 24px", fontWeight: "600", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>Activate</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", maxWidth: "600px", margin: "0 auto" }}>
          
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            
            let IconComponent = MessageCircle;
            let iconColor = "#3b82f6";
            let iconBg = "#eff6ff";
            let borderColor = "#e2e8f0";
            
            if (node.type === "delay") {
              IconComponent = Clock;
              iconColor = "#ca8a04";
              iconBg = "#fefce8";
            } else if (node.type === "condition") {
              IconComponent = Zap; // Just as an alternative, though condition isn't in screenshot
              iconColor = "#a855f7";
              iconBg = "#faf5ff";
            }

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div 
                  onClick={() => handleNodeClick(node.id)}
                  style={{ 
                    width: "100%", 
                    border: `1px solid ${isSelected ? "#3b82f6" : borderColor}`, 
                    borderRadius: "20px", 
                    padding: "20px 24px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    cursor: "pointer",
                    background: "white",
                    boxShadow: isSelected ? "0 4px 12px rgba(59, 130, 246, 0.15)" : "none",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: iconBg, color: iconColor, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${iconColor}40` }}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "15px", color: "#0f172a", fontWeight: "600" }}>{node.title}</h4>
                      <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: node.type === 'delay' ? '#ca8a04' : node.type === 'condition' ? '#a855f7' : "#64748b" }}>
                        {node.type === 'delay' ? `Wait ${node.duration || ''} ${node.unit || ''}` : 
                         node.type === 'condition' ? `If ${(node.variable || 'name').replace('Client ', '').toLowerCase()} ${(node.operator || 'equals').toLowerCase()} "${node.value || ''}"` : 
                         (node.content || node.subtitle || "—")}
                      </p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fef2f2"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0", color: "#cbd5e1" }}>
                  <div style={{ height: "24px", borderLeft: "1px dashed #cbd5e1", position: "relative" }}>
                    <ArrowDown size={16} style={{ position: "absolute", bottom: "-14px", left: "-8.5px" }} />
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* End Flow Node */}
          <div 
            style={{ 
              width: "100%", 
              border: "1px solid #e2e8f0", 
              borderRadius: "20px", 
              padding: "20px 24px", 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              background: "#f8fafc"
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "white", border: "1px solid #e2e8f0", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={20} />
            </div>
            <h4 style={{ margin: 0, fontSize: "15px", color: "#64748b", fontWeight: "600" }}>End Flow</h4>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "16px", marginTop: "32px", justifyContent: "center", width: "100%" }}>
            <button onClick={() => addNode('message')} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#3b82f6", borderRadius: "24px", padding: "10px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#dbeafe"} onMouseLeave={(e) => e.currentTarget.style.background = "#eff6ff"}>
              <Plus size={16} strokeWidth={3} /> Add Message
            </button>
            <button onClick={() => addNode('delay')} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fefce8", border: "1px solid #fde047", color: "#ca8a04", borderRadius: "24px", padding: "10px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#fef08a"} onMouseLeave={(e) => e.currentTarget.style.background = "#fefce8"}>
              <Plus size={16} strokeWidth={3} /> Add Delay
            </button>
            <button onClick={() => addNode('condition')} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#faf5ff", border: "1px solid #e9d5ff", color: "#9333ea", borderRadius: "24px", padding: "10px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f3e8ff"} onMouseLeave={(e) => e.currentTarget.style.background = "#faf5ff"}>
              <Plus size={16} strokeWidth={3} /> Add Condition
            </button>
          </div>

        </div>
      </div>

      {/* Right Area - Config Panel / Summary */}
      <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "24px", flexShrink: 0, height: "100%", overflowY: "auto", paddingRight: "4px" }}>
        
        {/* Flow Summary */}
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#0f172a", fontWeight: "600" }}>Flow Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
              <span>Messages</span>
              <span style={{ fontWeight: "700", color: "#3b82f6" }}>{messagesCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
              <span>Delays</span>
              <span style={{ fontWeight: "700", color: "#ca8a04" }}>{delaysCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", borderTop: "1px solid #e2e8f0", paddingTop: "16px", marginTop: "4px" }}>
              <span>Total Steps</span>
              <span style={{ fontWeight: "700", color: "#0f172a" }}>{totalSteps}</span>
            </div>
          </div>
        </div>

        {/* Conditional Config Panel */}
        {selectedNode && (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", 
                  background: selectedNode.type === 'condition' ? '#faf5ff' : selectedNode.type === 'delay' ? '#fefce8' : '#eff6ff', 
                  color: selectedNode.type === 'condition' ? '#a855f7' : selectedNode.type === 'delay' ? '#eab308' : '#3b82f6', 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: `1px solid ${selectedNode.type === 'condition' ? '#a855f7' : selectedNode.type === 'delay' ? '#eab308' : '#3b82f6'}40` 
                }}>
                  {selectedNode.type === 'condition' ? <Zap size={18}/> : selectedNode.type === 'delay' ? <Clock size={18}/> : <MessageCircle size={18}/>}
                </div>
                <h3 style={{ margin: 0, fontSize: "16px", color: "#0f172a", fontWeight: "600" }}>Configure Step</h3>
              </div>
              <button onClick={() => setSelectedNodeId(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}><X size={16}/></button>
            </div>

            {selectedNode.type === "condition" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-group">
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>Variable</label>
                  <select 
                    className="form-control" 
                    value={selectedNode.variable || "Client Name"}
                    onChange={(e) => handleNodeChange('variable', e.target.value)}
                    style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none", appearance: "auto" }}
                  >
                    <option>Client Name</option>
                    <option>Client Email</option>
                    <option>Client Phone</option>
                    <option>Client Status</option>
                    <option>Country</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>Operator</label>
                  <select 
                    className="form-control" 
                    value={selectedNode.operator || "Equals"}
                    onChange={(e) => handleNodeChange('operator', e.target.value)}
                    style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none", appearance: "auto" }}
                  >
                    <option>Equals</option>
                    <option>Contains</option>
                    <option>Starts With</option>
                    <option>Ends With</option>
                    <option>Is Empty</option>
                  </select>
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Value</label>
                    <span onClick={() => setShowVariableDropdown(!showVariableDropdown)} style={{ fontSize: "12px", color: "#3b82f6", cursor: "pointer", fontWeight: "600" }}>{'{ }'} Insert Variable</span>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Match value..." 
                    value={selectedNode.value || ""}
                    onChange={(e) => handleNodeChange('value', e.target.value)}
                    style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none" }} 
                  />

                  {/* Dropdown Popover */}
                  {showVariableDropdown && (
                    <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", width: "240px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", border: "1px solid #e2e8f0", zIndex: 100, overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Insert Field Variable</div>
                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {[
                          { label: "Name", var: "{{name}}" },
                          { label: "Status", var: "{{status}}" },
                          { label: "Processes", var: "{{processes}}" },
                          { label: "Email", var: "{{email}}" },
                          { label: "Phone", var: "{{phone}}" },
                          { label: "Location", var: "{{location}}" }
                        ].map(item => (
                          <div 
                            key={item.var}
                            onClick={() => insertVariable('value', item.var)}
                            style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"} 
                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                          >
                            <span style={{ color: "#334155", fontWeight: "500" }}>{item.label}</span>
                            <span style={{ color: "#94a3b8", fontFamily: "monospace" }}>{item.var}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {selectedNode.type === "delay" && (
              <div style={{ display: "flex", gap: "16px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>Duration</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={selectedNode.duration || ""}
                    onChange={(e) => handleNodeChange('duration', e.target.value)}
                    style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none" }} 
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>Unit</label>
                  <select 
                    className="form-control" 
                    value={selectedNode.unit || "days"}
                    onChange={(e) => handleNodeChange('unit', e.target.value)}
                    style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none", appearance: "auto" }}
                  >
                    <option value="days">Days</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                  </select>
                </div>
              </div>
            )}

            {selectedNode.type === "message" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                
                {/* Segmented Control */}
                <div style={{ display: "flex", background: "#f8fafc", borderRadius: "24px", padding: "4px" }}>
                  <button 
                    onClick={() => handleMessageTypeChange('message')}
                    style={{ flex: 1, padding: "8px 0", borderRadius: "20px", border: "none", background: selectedNode.messageType === 'message' ? "white" : "transparent", color: selectedNode.messageType === 'message' ? "#3b82f6" : "#64748b", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: selectedNode.messageType === 'message' ? "0 2px 4px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}
                  >
                    Message
                  </button>
                  <button 
                    onClick={() => handleMessageTypeChange('template')}
                    style={{ flex: 1, padding: "8px 0", borderRadius: "20px", border: "none", background: selectedNode.messageType === 'template' ? "white" : "transparent", color: selectedNode.messageType === 'template' ? "#3b82f6" : "#64748b", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: selectedNode.messageType === 'template' ? "0 2px 4px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}
                  >
                    Template
                  </button>
                  <button 
                    onClick={() => handleMessageTypeChange('chatbot')}
                    style={{ flex: 1, padding: "8px 0", borderRadius: "20px", border: "none", background: selectedNode.messageType === 'chatbot' ? "white" : "transparent", color: selectedNode.messageType === 'chatbot' ? "#3b82f6" : "#64748b", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: selectedNode.messageType === 'chatbot' ? "0 2px 4px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}
                  >
                    Chatbot
                  </button>
                </div>

                {/* Content based on selected type */}
                {(!selectedNode.messageType || selectedNode.messageType === 'message') && (
                  <div className="form-group" style={{ position: "relative" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Message Content</label>
                      <span onClick={() => setShowVariableDropdown(!showVariableDropdown)} style={{ fontSize: "12px", color: "#3b82f6", cursor: "pointer", fontWeight: "600" }}>{'{ }'} Insert Variable</span>
                    </div>
                    <textarea 
                      className="form-control" 
                      placeholder="Type message..." 
                      value={selectedNode.content || ""}
                      onChange={(e) => handleNodeChange('content', e.target.value)}
                      style={{ borderRadius: "12px", width: "100%", padding: "14px", border: "1px solid #e2e8f0", outline: "none", minHeight: "120px", resize: "vertical", fontFamily: "inherit" }}
                    ></textarea>

                    {/* Dropdown Popover */}
                    {showVariableDropdown && (
                      <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", width: "240px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", border: "1px solid #e2e8f0", zIndex: 100, overflow: "hidden" }}>
                        <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Insert Field Variable</div>
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          {[
                            { label: "Name", var: "{{name}}" },
                            { label: "Status", var: "{{status}}" },
                            { label: "Processes", var: "{{processes}}" },
                            { label: "Email", var: "{{email}}" },
                            { label: "Phone", var: "{{phone}}" },
                            { label: "Location", var: "{{location}}" }
                          ].map(item => (
                            <div 
                              key={item.var}
                              onClick={() => insertVariable('content', item.var)}
                              style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"} 
                              onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                            >
                              <span style={{ color: "#334155", fontWeight: "500" }}>{item.label}</span>
                              <span style={{ color: "#94a3b8", fontFamily: "monospace" }}>{item.var}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedNode.messageType === 'template' && (
                  <div className="form-group">
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>WhatsApp Template</label>
                    <select className="form-control" style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none", appearance: "auto" }}>
                      <option value="" disabled selected>Select template...</option>
                      <option>Welcome Message Template</option>
                      <option>Feedback Request</option>
                      <option>Appointment Reminder</option>
                    </select>
                  </div>
                )}

                {selectedNode.messageType === 'chatbot' && (
                  <div className="form-group">
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>Target Chatbot</label>
                    <select className="form-control" style={{ borderRadius: "12px", width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", outline: "none", appearance: "auto" }}>
                      <option value="" disabled selected>Select chatbot...</option>
                      <option>Support Bot</option>
                      <option>Sales Bot</option>
                      <option>FAQ Bot</option>
                    </select>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
