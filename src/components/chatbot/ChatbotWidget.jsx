import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Trash2, Bot, Globe } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';
import { useAuth } from '../../context/AuthContext';

function TypingIndicator() {
  return (
    <div className="chat-msg bot" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--brand-primary)',
            animation: `pulse 1.2s ${i * 0.2}s infinite`,
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
}

function MessageContent({ content }) {
  const lines = content.split('\n');
  return (
    <div>
      {lines.map((line, i) => {
        const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.startsWith('• ')) {
          return <div key={i} dangerouslySetInnerHTML={{ __html: '• ' + boldLine.slice(2) }} style={{ marginBottom: 2 }} />;
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: boldLine || '&nbsp;' }} style={{ marginBottom: line ? 2 : 0 }} />;
      })}
    </div>
  );
}

const QUICK_PROMPTS = [
  '📊 My attendance',
  '📅 Next exam',
  '💰 Fee status',
  '🏢 Placements',
];

export default function ChatbotWidget() {
  const {
    isOpen,
    messages,
    typing,
    unread,
    language,
    switchLanguage,
    sendMessage,
    openChat,
    closeChat,
    clearMessages,
  } = useChatbot();

  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim(), user);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in your browser.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript, user);
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleQuickPrompt = (prompt) => {
    const clean = prompt.replace(/^[^a-zA-Z]+/, '').trim();
    sendMessage(clean, user);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className="chatbot-fab"
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        id="chatbot-trigger"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        {!isOpen && unread > 0 && <span className="chatbot-unread-badge">{unread}</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-panel animate-scaleIn" role="dialog" aria-label="UniBot AI Assistant">
          {/* Header */}
          <div className="chatbot-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="chatbot-avatar" style={{ fontSize: 20 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>UniBot AI</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Multi-Language · NLP Ready
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Language Pills */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 6, padding: 2 }}>
                {[
                  { code: 'en', label: 'EN' },
                  { code: 'ta', label: 'தமிழ்' },
                  { code: 'hi', label: 'हिंदी' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLanguage(l.code)}
                    style={{
                      background: language === l.code ? '#fff' : 'transparent',
                      color: language === l.code ? 'var(--brand-primary)' : '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '2px 6px',
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                onClick={clearMessages}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 6, padding: '5px 7px', cursor: 'pointer', color: 'white' }}
                title="Clear conversation"
              >
                <Trash2 size={13} />
              </button>
              <button
                onClick={closeChat}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 6, padding: '5px 7px', cursor: 'pointer', color: 'white' }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Quick prompts */}
          {messages.length <= 2 && (
            <div style={{ padding: '8px 12px', display: 'flex', gap: 6, flexWrap: 'wrap', borderBottom: '1px solid var(--border-subtle)' }}>
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleQuickPrompt(p)}
                  style={{
                    padding: '4px 8px',
                    fontSize: 11,
                    fontWeight: 600,
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Messages Log */}
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.role}`}>
                <MessageContent content={msg.content} />
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                  {msg.time}
                </div>
              </div>
            ))}
            {typing && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-bar">
            <input
              ref={inputRef}
              className="chatbot-input"
              placeholder={
                language === 'ta'
                  ? 'தமிழில் ஏதேனும் கேளுங்கள்...'
                  : language === 'hi'
                  ? 'हिंदी में कुछ भी पूछें...'
                  : 'Ask about attendance, fees, exams...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`btn btn-icon ${listening ? 'listening' : ''}`}
              onClick={handleVoice}
              title={listening ? 'Listening...' : 'Voice Input'}
              style={{ background: listening ? '#ef4444' : 'transparent', color: listening ? '#fff' : 'var(--text-secondary)' }}
            >
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              className="btn btn-primary btn-icon"
              onClick={handleSend}
              disabled={!input.trim()}
              title="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
