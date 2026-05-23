import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mic, 
  Send, 
  X, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  AlertCircle,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ragService } from '../../services/ragService';
import './GlobalCopilot.css';

// Rich text parsing helper for clean markdown-like message rendering
const parseInlineStyling = (text) => {
  const parts = [];
  let currentText = text;
  const regex = /(\*\*.*?\*\*|`.*?`)/;
  
  let i = 0;
  while (currentText) {
    const match = currentText.match(regex);
    if (!match) {
      parts.push(currentText);
      break;
    }
    
    const index = match.index;
    if (index > 0) {
      parts.push(currentText.substring(0, index));
    }
    
    const matchText = match[0];
    if (matchText.startsWith('**') && matchText.endsWith('**')) {
      parts.push(
        <strong key={`bold-${i}`} style={{ color: '#f8fafc', fontWeight: 600 }}>
          {matchText.substring(2, matchText.length - 2)}
        </strong>
      );
    } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
      parts.push(
        <code key={`code-${i}`} style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85em', color: '#f472b6' }}>
          {matchText.substring(1, matchText.length - 1)}
        </code>
      );
    }
    
    currentText = currentText.substring(index + matchText.length);
    i++;
  }
  
  return parts.length > 0 ? parts : text;
};

const renderMessageText = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    if (line.startsWith('### ')) {
      return (
        <h4 key={`h3-${index}`} style={{ color: '#f8fafc', marginTop: '0.8rem', marginBottom: '0.4rem', fontSize: '1rem', fontWeight: 600 }}>
          {parseInlineStyling(line.substring(4))}
        </h4>
      );
    }
    if (line.startsWith('#### ')) {
      return (
        <h5 key={`h4-${index}`} style={{ color: '#f8fafc', marginTop: '0.6rem', marginBottom: '0.3rem', fontSize: '0.9rem', fontWeight: 600 }}>
          {parseInlineStyling(line.substring(5))}
        </h5>
      );
    }
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <ul key={`ul-${index}`} style={{ paddingLeft: '1.2rem', margin: '0.3rem 0', listStyleType: 'disc' }}>
          <li style={{ color: '#cbd5e1' }}>{parseInlineStyling(line.substring(2))}</li>
        </ul>
      );
    }
    
    const numberMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberMatch) {
      return (
        <ol key={`ol-${index}`} style={{ paddingLeft: '1.2rem', margin: '0.3rem 0', listStyleType: 'decimal' }}>
          <li style={{ color: '#cbd5e1' }}>{parseInlineStyling(numberMatch[2])}</li>
        </ol>
      );
    }
    
    if (line.trim() === '') {
      return <div key={`empty-${index}`} style={{ height: '0.5rem' }} />;
    }
    
    return (
      <p key={`p-${index}`} style={{ margin: '0.3rem 0', color: '#cbd5e1' }}>
        {parseInlineStyling(line)}
      </p>
    );
  });
};

const GlobalCopilot = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Persist chat panel drawer states
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Real-time server-side streaming status tracking states
  const [routerLog, setRouterLog] = useState('');
  const [intentLog, setIntentLog] = useState('');
  const [processingLog, setProcessingLog] = useState('');
  const [streamedText, setStreamedText] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const screenEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition object if supported by the browser
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? prev + ' ' : '') + transcript);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Show a welcome message on mount if messages list is empty
  useEffect(() => {
    if (messages.length === 0 && user) {
      setMessages([
        {
          sender: 'assistant',
          text: `👋 Hello **${user.name}**!\n\nI am your unified **UniInsight AI Educational Copilot**.\n\nI can read live database records, perform analytics on cohort files, execute placement readiness ML forecasts, or fetch info from your uploaded documents.\n\nTry clicking one of the suggested query chips below or write/dictate your prompt!`
        }
      ]);
    }
  }, [user, messages]);

  // Keep unread badges active if closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isOpen]);

  // Auto-scroll chat screen on message updates
  useEffect(() => {
    if (screenEndRef.current) {
      screenEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamedText, routerLog, intentLog, processingLog]);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleMicToggle = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not fully supported in this browser version. Try using Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed starting mic:', err);
      }
    }
  };

  const handleSendPrompt = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isGenerating) return;

    // Reset prompt input
    setInput('');
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Append user query to chat array
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    
    // Reset SSE status logs and streamed buffer
    setIsGenerating(true);
    setRouterLog('');
    setIntentLog('');
    setProcessingLog('');
    setStreamedText('');

    const currentRoute = location.pathname;

    try {
      await ragService.streamCopilotChat(
        query,
        user.role,
        user.name,
        currentRoute,
        // onChunk callback
        (payload) => {
          if (payload.includes('[Copilot Router]')) {
            setRouterLog(payload.trim());
          } else if (payload.includes('[Intent Classification]')) {
            setIntentLog(payload.trim());
          } else if (
            payload.includes('[Database Engine]') || 
            payload.includes('[Analytics Engine]') || 
            payload.includes('[Predictive ML Engine]') || 
            payload.includes('[RAG Knowledge Retriever]') || 
            payload.includes('[Gemini LLM]')
          ) {
            setProcessingLog(payload.trim());
          } else {
            // Normal answer stream accumulation
            setStreamedText(prev => prev + payload);
          }
        },
        // onError callback
        (error) => {
          console.error('Copilot streaming error:', error);
          setMessages(prev => [...prev, { 
            sender: 'assistant', 
            text: `⚠️ **Connection Failure**: I encountered an error communicating with the UniInsight AI Engine.\n\n*Error details*: \`${error.message}\`\n\nPlease ensure your uvicorn backend server is active at http://localhost:8000.`
          }]);
          setIsGenerating(false);
        },
        // onDone callback
        () => {
          setMessages(prev => [...prev, { sender: 'assistant', text: streamedText }]);
          setStreamedText('');
          setRouterLog('');
          setIntentLog('');
          setProcessingLog('');
          setIsGenerating(false);
        }
      );
    } catch (err) {
      console.error('Outer stream error:', err);
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  // Determine dynamic suggested queries based on active page route & role
  const getRouteSuggestions = () => {
    const roleLower = user?.role?.toLowerCase() || '';
    const route = location.pathname;
    
    if (roleLower === 'student') {
      if (route.includes('/fees')) {
        return [
          { icon: <Compass size={14} />, text: "How much tuition fee is pending?" },
          { icon: <HelpCircle size={14} />, text: "Show student dues balance summary" }
        ];
      }
      if (route.includes('/performance') || route.includes('/insights')) {
        return [
          { icon: <AlertCircle size={14} />, text: "Am I at academic risk?" },
          { icon: <Sparkles size={14} />, text: "Suggest areas where I am weak" }
        ];
      }
      if (route.includes('/placement')) {
        return [
          { icon: <Compass size={14} />, text: "What is my job readiness index?" },
          { icon: <Sparkles size={14} />, text: "Show recommendations for DSA preparation" }
        ];
      }
      if (route.includes('/schedule')) {
        return [
          { icon: <Clock size={14} />, text: "When is my next class today?" },
          { icon: <HelpCircle size={14} />, text: "Who is my DBMS professor?" }
        ];
      }
      return [
        { icon: <Compass size={14} />, text: "What is my placement readiness score?" },
        { icon: <Clock size={14} />, text: "When is my next class today?" },
        { icon: <AlertCircle size={14} />, text: "Am I at academic risk?" }
      ];
    }
    
    if (roleLower === 'teacher') {
      if (route.includes('/students') || route.includes('/analytics')) {
        return [
          { icon: <AlertCircle size={14} />, text: "Show class risk cohort analytics" },
          { icon: <Compass size={14} />, text: "Which students have attendance below 75%?" },
          { icon: <Sparkles size={14} />, text: "Which students are weak in DBMS?" }
        ];
      }
      if (route.includes('/schedule')) {
        return [
          { icon: <Clock size={14} />, text: "Show my teaching schedule for today" },
          { icon: <Compass size={14} />, text: "When is the database seminar?" }
        ];
      }
      return [
        { icon: <AlertCircle size={14} />, text: "Show class risk cohort analytics" },
        { icon: <Compass size={14} />, text: "Which students have attendance below 75%?" },
        { icon: <Sparkles size={14} />, text: "Suggest academic recovery actions" }
      ];
    }
    
    if (roleLower === 'parent') {
      if (route.includes('/fees')) {
        return [
          { icon: <Compass size={14} />, text: "How much pending tuition fee do we have?" },
          { icon: <HelpCircle size={14} />, text: "Show student dues balance summary" }
        ];
      }
      return [
        { icon: <Compass size={14} />, text: "Show child performance trend summary" },
        { icon: <Compass size={14} />, text: "How much pending tuition fee do we have?" },
        { icon: <AlertCircle size={14} />, text: "Is my child at academic risk?" }
      ];
    }
    
    if (roleLower === 'admin') {
      if (route.includes('/fees')) {
        return [
          { icon: <Compass size={14} />, text: "Show institutional tuition revenue index" },
          { icon: <HelpCircle size={14} />, text: "Explain student dues breakdown" }
        ];
      }
      if (route.includes('/analytics') || route.includes('/placements')) {
        return [
          { icon: <Compass size={14} />, text: "Which departments have low placement scores?" },
          { icon: <Sparkles size={14} />, text: "Which student cluster needs support?" }
        ];
      }
      return [
        { icon: <Compass size={14} />, text: "Show institutional tuition revenue index" },
        { icon: <Compass size={14} />, text: "Which departments have low placement scores?" },
        { icon: <Sparkles size={14} />, text: "Which student cluster needs support?" }
      ];
    }
    
    return [
      { icon: <Clock size={14} />, text: "Show my timetable for today" },
      { icon: <HelpCircle size={14} />, text: "Who is my DBMS professor?" }
    ];
  };

  const suggestions = getRouteSuggestions();

  return (
    <>
      {/* Floating Toggle Launch Button */}
      <button 
        className="copilot-floating-btn" 
        onClick={handleToggleOpen}
        title="UniInsight AI Copilot"
        aria-label="Toggle AI Copilot"
      >
        <Sparkles size={26} />
        {unreadCount > 0 && <span className="btn-badge">{unreadCount}</span>}
      </button>

      {/* Slide-out Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="copilot-panel"
            initial={{ x: '110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '110%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header section */}
            <div className="copilot-header">
              <div className="header-meta">
                <Sparkles className="header-sparkle-icon" size={20} />
                <h3>AI Copilot</h3>
                <span className="role-tag">{user?.role}</span>
              </div>
              <button className="copilot-close-btn" onClick={handleToggleOpen} title="Close Panel">
                <X size={20} />
              </button>
            </div>

            {/* Message Viewport Screen */}
            <div className="copilot-chat-screen">
              {messages.map((msg, i) => (
                <div key={i} className={`copilot-msg-row ${msg.sender === 'user' ? 'user' : 'assistant'}`}>
                  <div className="msg-icon-holder">
                    {msg.sender === 'user' ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>
                  <div className="msg-bubble-box">
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Streaming Content Message bubble */}
              {isGenerating && streamedText && (
                <div className="copilot-msg-row assistant">
                  <div className="msg-icon-holder">
                    <Bot size={16} />
                  </div>
                  <div className="msg-bubble-box">
                    {renderMessageText(streamedText)}
                  </div>
                </div>
              )}

              {/* Real-time Intent & Router SSE Logs (Streaming indicators) */}
              {isGenerating && (
                <div className="logs-banner-area" style={{ marginTop: '0.4rem' }}>
                  {routerLog && (
                    <div className="routing-banner routing">
                      {routerLog}
                    </div>
                  )}
                  {intentLog && (
                    <div className="routing-banner mapped">
                      {intentLog}
                    </div>
                  )}
                  {processingLog && (
                    <div className="routing-banner executing">
                      {processingLog}
                    </div>
                  )}
                  
                  {/* General loading animation when waiting for initial chunks */}
                  {!streamedText && !processingLog && (
                    <div className="copilot-msg-row assistant">
                      <div className="msg-icon-holder">
                        <Bot size={16} />
                      </div>
                      <div className="msg-bubble-box" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                        <div className="dot-typing">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div ref={screenEndRef} />
            </div>

            {/* Footer containing route context suggestions & text/speech fields */}
            <div className="copilot-footer">
              {/* Dynamic suggestion chips */}
              {suggestions.length > 0 && !isGenerating && (
                <div className="chips-panel-wrapper">
                  <div className="chips-title">
                    <Compass size={12} /> Route context suggestions
                  </div>
                  <div className="chips-slider">
                    {suggestions.map((chip, idx) => (
                      <button 
                        key={idx} 
                        className="prompt-suggestion-chip" 
                        onClick={() => handleSendPrompt(chip.text)}
                      >
                        {chip.icon}
                        <span>{chip.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text input, voice input, and submission group */}
              <div className="copilot-input-bar-group" style={{ marginTop: '0.8rem' }}>
                <textarea 
                  className="copilot-text-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={`Ask AI Copilot (${user?.role})...`}
                  disabled={isGenerating}
                />
                
                {/* Voice-to-text input button */}
                <button 
                  className={`copilot-mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={handleMicToggle}
                  title={isListening ? "Stop listening" : "Dictate query"}
                  disabled={isGenerating}
                >
                  <Mic size={18} />
                </button>

                {/* Query submission button */}
                <button 
                  className="copilot-send-btn" 
                  onClick={() => handleSendPrompt()}
                  disabled={!input.trim() || isGenerating}
                  title="Send Message"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalCopilot;
