import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ragService } from '../services/ragService';
import { 
  Sparkles, UploadCloud, FileText, Trash2, Search, 
  Send, BrainCircuit, AlertCircle, Info, Database, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './RagAssistant.css';

const RagAssistant = () => {
  const { user } = useAuth();
  const role = user?.role || 'student';
  const chatEndRef = useRef(null);

  // Core State
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Initial welcome message based on role
  useEffect(() => {
    const welcomeMessages = {
      student: `👋 **Welcome, Student User!** I am your **UniInsight AI Document Assistant**.\n\nUpload your lecture notes, textbook chapters, practice exam PDFs, or syllabus documents on the left. I will index them and answer any doubts you have in real-time, generate personalized quizzes, or create custom placement prep outlines based strictly on your materials!`,
      teacher: `👋 **Welcome, Educator!** I am your **UniInsight Lesson & Curriculum Companion**.\n\nUpload syllabus guides, homework templates, or reading materials on the left. I will help you quickly generate question-banks, design comprehensive exams, summarize complex topics for your lessons, and analyze curriculum focus areas.`,
      parent: `👋 **Welcome, Parent!** I am your **UniInsight Academic Translator**.\n\nEducational requirements and college syllabus sheets can be complex. Upload any academic files on the left and ask me to translate course expectations, identify learning milestones, or break down the material into clear, simple summaries to help you support your child.`,
      admin: `👋 **Welcome, Administrator!** I am your **UniInsight System Auditor & Asset Manager**.\n\nUpload departmental summaries, college rules, placement records, or campus sheets. I will provide executive briefs, help you audit course frameworks, and track document analytical parameters.`
    };

    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: welcomeMessages[role] || welcomeMessages.student,
        timestamp: new Date()
      }
    ]);

    loadDocuments();
  }, [role]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, generating]);

  // Load documents list
  const loadDocuments = async () => {
    setLoadingDocs(true);
    try {
      const data = await ragService.listDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDocs(false);
    }
  };

  // Drag and Drop files
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  // Upload processing
  const uploadFile = async (file) => {
    const allowedExtensions = ['.pdf', '.docx', '.pptx', '.txt', '.md'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedExtensions.includes(fileExt)) {
      setUploadError(`Unsupported file format. Please upload PDF, DOCX, PPTX, or TXT.`);
      return;
    }

    if (file.size > 15 * 1024 * 1024) { // 15MB limit
      setUploadError(`File too large. Maximum size limit is 15MB.`);
      return;
    }

    setUploading(true);
    setUploadError('');
    try {
      await ragService.uploadDocument(file);
      await loadDocuments();
      
      // Auto-notify in chat
      setMessages(prev => [
        ...prev,
        {
          id: `upload-success-${Date.now()}`,
          sender: 'assistant',
          text: `📁 **Success!** Indexed **"${file.name}"** successfully. I have broken it into semantic vector chunks and it is now ready for questioning. What would you like to know?`,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Error processing document. Ensure Python server is online.');
    } finally {
      setUploading(false);
    }
  };

  // Delete Indexed File
  const handleDocDelete = async (docId, filename) => {
    try {
      await ragService.deleteDocument(docId);
      setDocuments(prev => prev.filter(d => d.id !== docId));
      
      setMessages(prev => [
        ...prev,
        {
          id: `delete-success-${Date.now()}`,
          sender: 'assistant',
          text: `🗑️ Removed document **"${filename}"** from the local search index.`,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      alert('Failed to delete document from vector index.');
    }
  };

  // Chat Query Submission
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || generating) return;

    const userPrompt = input.trim();
    setInput('');
    setGenerating(true);

    // 1. Add User Message
    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      text: userPrompt,
      timestamp: new Date()
    };
    
    // 2. Add empty Assistant message for streaming
    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantMsg = {
      id: assistantMsgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);

    // 3. Trigger streaming connection
    try {
      let fullText = '';
      await ragService.streamChat(
        userPrompt,
        role,
        (token) => {
          fullText += token;
          setMessages(prev => prev.map(m => {
            if (m.id === assistantMsgId) {
              return { ...m, text: fullText };
            }
            return m;
          }));
        },
        (error) => {
          console.error(error);
          setMessages(prev => prev.map(m => {
            if (m.id === assistantMsgId) {
              return { ...m, text: `🔴 **Connection error**: Make sure the backend server is running on port 8000.\n\n*Error details: ${error.message}*` };
            }
            return m;
          }));
          setGenerating(false);
        },
        () => {
          setGenerating(false);
        }
      );
    } catch (err) {
      console.error(err);
      setGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setInput(suggestionText);
    setTimeout(() => {
      // Focus element and send
      const submitBtn = document.getElementById('chat-submit-trigger');
      if (submitBtn) submitBtn.click();
    }, 100);
  };

  // Filter list of documents
  const filteredDocs = documents.filter(doc => 
    doc.filename.toLowerCase().includes(filterText.toLowerCase())
  );

  // Dynamic Suggestion lists based on role
  const getSuggestions = () => {
    const lists = {
      student: [
        {
          title: "📝 Synthesize Cheat Sheet",
          desc: "Extract study guidelines & formulate review metrics.",
          prompt: "Analyze my uploaded materials and generate a comprehensive study cheat sheet highlighting key equations, definitions, and concepts."
        },
        {
          title: "❓ Mock Assessment",
          desc: "Generate exam practice questions locally.",
          prompt: "Generate a 5-question mock quiz based strictly on the uploaded documents. Include multiple choice options and provide answers at the very end."
        },
        {
          title: "💼 Placement Preparedness",
          desc: "Identify job readiness alignment.",
          prompt: "Based on my syllabus and skill notes, compile a list of standard placement interview questions and technical competency expectations."
        },
        {
          title: "💡 Identify Weak Points",
          desc: "Identify potential concept risks.",
          prompt: "Identify the most complex technical chapters in these documents and suggest a targeted action plan to prevent grade dips."
        }
      ],
      teacher: [
        {
          title: "🎒 Question Bank Generator",
          desc: "Generate curriculum assessment questions.",
          prompt: "Generate 10 conceptual review questions from these course documents to check student classroom understanding."
        },
        {
          title: "📜 Lesson Planner Outline",
          desc: "Create comprehensive lectures.",
          prompt: "Create a detailed 3-part lecture plan from these notes, including active learning prompts and board diagrams."
        }
      ],
      parent: [
        {
          title: "🔍 Simple Summarizer",
          desc: "Decomplexify heavy academic syllabi.",
          prompt: "Summarize this course syllabus document in simple plain words. What are the top 3 items my child must do well to succeed?"
        },
        {
          title: "📈 Milestone Tracker",
          desc: "Map major project targets.",
          prompt: "Read through this course schedule and identify all major deadlines, project submissions, and core exams my child has."
        }
      ],
      admin: [
        {
          title: "📊 Document Audit Brief",
          desc: "Compile college asset stats.",
          prompt: "Provide an executive departmental audit report summarizing the scope and structure of the documents indexed in our database."
        }
      ]
    };

    return lists[role] || lists.student;
  };

  // Convert bytes to human readable format
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formats basic markdown elements inside bubbles
  const renderMessageText = (text) => {
    if (!text) return <div className="typing-indicator">
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
    </div>;

    // Direct markdown parser
    return text.split('\n').map((paragraph, pIdx) => {
      let formattedText = paragraph;
      
      // Parse header 3
      if (formattedText.startsWith('### ')) {
        return <h3 key={pIdx}>{formattedText.substring(4)}</h3>;
      }
      // Parse header 4
      if (formattedText.startsWith('#### ')) {
        return <h4 key={pIdx}>{formattedText.substring(5)}</h4>;
      }
      
      // Parse list items
      if (formattedText.startsWith('* ') || formattedText.startsWith('- ')) {
        return <li key={pIdx} style={{ marginLeft: '1.2rem', marginBottom: '0.4rem', listStyleType: 'disc' }}>
          {parseInlineFormatting(formattedText.substring(2))}
        </li>;
      }

      // Check for numbered lists
      const numberListMatch = formattedText.match(/^(\d+)\.\s(.*)/);
      if (numberListMatch) {
        return <li key={pIdx} style={{ marginLeft: '1.2rem', marginBottom: '0.4rem', listStyleType: 'decimal' }}>
          {parseInlineFormatting(numberListMatch[2])}
        </li>;
      }

      // Default paragraph
      return <p key={pIdx} style={{ marginBottom: paragraph.trim() ? '0.6rem' : '0' }}>
        {parseInlineFormatting(formattedText)}
      </p>;
    });
  };

  // Inline styling parser (**bold**, `code`, *italic*)
  const parseInlineFormatting = (text) => {
    const parts = [];
    let currentText = text;
    let idx = 0;

    // Simple regex replacements for clean rendering
    // Matches **text**, `text`, *text*
    const regex = /(\*\*|`|\*)(.*?)\1/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(currentText)) !== null) {
      // Add preceding plain text
      if (match.index > lastIndex) {
        parts.push(currentText.substring(lastIndex, match.index));
      }

      const type = match[1];
      const matchText = match[2];

      if (type === '**') {
        parts.push(<strong key={idx++}>{matchText}</strong>);
      } else if (type === '`') {
        parts.push(<code key={idx++}>{matchText}</code>);
      } else if (type === '*') {
        parts.push(<em key={idx++}>{matchText}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < currentText.length) {
      parts.push(currentText.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="assistant-container">
      
      {/* Sidebar: Vector DB Manager */}
      <aside className="assistant-sidebar glass">
        <div className="sidebar-title">
          <Database size={18} className="text-blue" />
          <span>Knowledge Bank</span>
        </div>
        <p className="sidebar-subtitle">Upload assets to index into RAG vector memory</p>

        {/* Drag and Drop Zone */}
        <div 
          className={`upload-zone ${dragActive ? 'dragging' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload-input').click()}
        >
          <input 
            type="file" 
            id="file-upload-input" 
            style={{ display: 'none' }} 
            onChange={handleFileInput}
            accept=".pdf,.docx,.pptx,.txt,.md"
          />
          <UploadCloud size={28} className="upload-icon" />
          <span className="upload-text">
            {uploading ? 'Processing & Indexing...' : 'Upload Academic File'}
          </span>
          <span className="upload-hint">Drag & drop or browse</span>
          <span className="upload-hint" style={{ fontSize: '0.65rem', marginTop: '-4px' }}>
            PDF, DOCX, PPTX, TXT up to 15MB
          </span>
        </div>

        {uploadError && (
          <div className="flex-start" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.6rem', marginBottom: '1rem', color: '#b91c1c', fontSize: '0.78rem' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Search document list */}
        <div className="doc-search-wrapper">
          <Search size={14} className="text-muted" />
          <input 
            type="text" 
            className="doc-search-input" 
            placeholder="Search indexed docs..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {/* Document list area */}
        <div className="doc-list">
          {loadingDocs ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2rem' }}>
              <div className="typing-indicator" style={{ justifyContent: 'center' }}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
              <p>Scanning local index...</p>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="empty-docs">
              <FileText size={28} style={{ opacity: 0.3 }} />
              <p>{filterText ? 'No matching documents' : 'Knowledge index is empty'}</p>
            </div>
          ) : (
            filteredDocs.map(doc => (
              <div key={doc.id} className="doc-card">
                <div className="doc-info">
                  <span className="doc-type-badge">{doc.file_type}</span>
                  <div className="doc-details">
                    <span className="doc-name" title={doc.filename}>{doc.filename}</span>
                    <span className="doc-size">{formatBytes(doc.size_bytes)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDocDelete(doc.id, doc.filename)} 
                  className="doc-delete-btn"
                  title="Remove from vector store"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Area: Chat Arena */}
      <section className="assistant-chat-pane glass">
        <header className="chat-header">
          <div className="chat-header-info">
            <BrainCircuit className="text-indigo" size={24} />
            <div>
              <h2 style={{ fontSize: '1.1rem', margin: 0 }}>AI Academic Intelligence</h2>
              <p className="text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>Retrieval-Augmented Generation (RAG) Document Assistant</p>
            </div>
          </div>
          <span className="chat-role-indicator">{role} Engine</span>
        </header>

        {/* Chat window viewport */}
        <div className="chat-window">
          
          {/* Simulation Mode alert banner if no API Key loaded */}
          {!loadingDocs && documents.length > 0 && !generating && (
            <div className="simulation-banner">
              <Info size={16} />
              <span>Vector Database is armed. Simply type below to query your uploaded resources contextually!</span>
            </div>
          )}

          {/* Message bubble loop */}
          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              <div className={`avatar-wrapper ${msg.sender}`}>
                {msg.sender === 'user' ? (
                  <img src={user?.avatar} alt="avatar" style={{ width: '100%', height: '100%' }} />
                ) : (
                  <Sparkles size={18} />
                )}
              </div>
              <div className="message-content">
                {renderMessageText(msg.text)}
              </div>
            </div>
          ))}
          
          {/* Static Welcome suggestions if only welcome bubble is active */}
          {messages.length === 1 && (
            <div className="suggestions-panel">
              <div className="suggestions-title">
                <Sparkles size={18} className="text-indigo" />
                <span>Quick Actions for {role.charAt(0).toUpperCase() + role.slice(1)}</span>
              </div>
              <p className="suggestions-subtitle">Select a predefined action card to test the local semantic extraction logic</p>
              
              <div className="suggestions-grid">
                {getSuggestions().map((sug, idx) => (
                  <div 
                    key={idx} 
                    className="suggestion-card"
                    onClick={() => handleSuggestionClick(sug.prompt)}
                  >
                    <span className="suggestion-header">{sug.title}</span>
                    <span className="suggestion-text">{sug.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input box bottom panel */}
        <div className="chat-input-wrapper">
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <textarea
              className="chat-text-input"
              rows={1}
              placeholder={documents.length === 0 ? "Upload documents to unlock contextual QA chat..." : "Ask doubt, summarize concept, quiz yourself..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // Submit on enter (unless shift is pressed)
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={generating}
            />
            <button 
              type="submit" 
              className="chat-send-btn" 
              id="chat-submit-trigger"
              disabled={generating || !input.trim()}
              title="Submit Prompt"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default RagAssistant;
