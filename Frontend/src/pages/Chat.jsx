
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContent } from "../Context/AppContext";
import { sendMessage } from "../api/chatApi";
import { Send, Moon, Sun, Mail, HardDrive, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const externalApps = [
  { name: 'Gmail', icon: Mail, url: 'https://mail.google.com' },
  { name: 'Contacts', icon: HardDrive, url: '/contacts', internal: true },
  { name: 'Profile', icon: User, url: '/profile', internal: true },
];

function Chat() {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 'initial', text: `Hello ${userData?.name || 'there'}! How can I help you today?`, isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Theme Logic using document class (Syncs with your index.css variables)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: trimmedInput,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await sendMessage(trimmedInput);
      
      // const botMessage = {
      //   id: Date.now() + 1,
      //   text: res.data?.reply || "I received your message but couldn't generate a text response.",
      //   isUser: false,
      // };

      const botReply = res?.data?.reply;

        const botMessage = {
          id: Date.now() + 1,
          text: typeof botReply === "string"
            ? botReply
            : "No response from server yet.",
          isUser: false,
        };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to the server. Please check your connection and try again.",
        isUser: false,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-md">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {userData?.name ? `Welcome, ${userData.name}` : 'Chat Assistant'}
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl border border-border-subtle bg-background-secondary hover:bg-accent transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-brand" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
          </button>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : message.isError 
                      ? 'bg-destructive/10 text-destructive border border-destructive/20'
                      : 'bg-secondary text-secondary-foreground rounded-tl-none border border-border-subtle'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary p-3 rounded-2xl border border-border-subtle">
                <Loader2 className="w-5 h-5 animate-spin text-brand" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <footer className="p-4 border-t border-border bg-background">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-input bg-background-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-3 rounded-xl bg-brand hover:bg-brand-hover text-white transition-all hover:scale-105 disabled:grayscale disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>

      {/* Right Sidebar (Navigation) */}
      <aside className="w-20 hidden md:flex flex-col items-center py-6 gap-6 bg-background-secondary border-l border-border">
        {externalApps.map((app) => (
          <div key={app.name} className="relative group">
            <button
              onClick={() => app.internal ? navigate(app.url) : window.open(app.url, '_blank')}
              className="p-3 rounded-2xl bg-card border border-border-subtle text-muted-foreground hover:text-brand hover:border-brand/30 transition-all duration-200 hover:scale-110 shadow-sm"
              aria-label={app.name}
            >
              <app.icon className="w-6 h-6" />
            </button>
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 border border-border pointer-events-none transition-opacity shadow-lg whitespace-nowrap">
              {app.name}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}

export default Chat;
