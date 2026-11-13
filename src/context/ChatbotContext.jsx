import React, { createContext, useContext, useState, useCallback } from 'react';
import { CHATBOT_FAQ, CHATBOT_INTENTS } from '../data/mockData';

const ChatbotContext = createContext(null);

const RESPONSES_BY_LANG = {
  en: {
    welcome: "👋 Hi! I'm **UniBot**, your AI assistant for UniCore ERP.\n\nI can help you with:\n• 📊 Attendance & CGPA\n• 📅 Exam Schedule & Timetable\n• 💰 Fee Status & Online Payments\n• 🏢 Placement Drives\n• 📝 Leave Applications\n\nAsk me anything in **English**, **தமிழ் (Tamil)**, or **हिंदी (Hindi)**!",
    attendance: "📊 **Attendance**: Your current overall attendance is **82%**. Subjects:\n• Data Structures: 82.6%\n• Algorithms: 90.9%\n• Database Systems: 76.2%\n• Operating Systems: 77.8%\n• Computer Networks: 73.7% ⚠️ (Below 75% cutoff)",
    exam: "📅 **Upcoming Exams**:\n• **Data Structures**: Sep 20, 2026 (10:00 AM, Hall-A)\n• **Algorithms**: Sep 22, 2026 (10:00 AM, Hall-B)\n• **Database Systems**: Sep 25, 2026 (2:00 PM, Hall-A)",
    fees: "💰 **Fee Breakdown**:\n• Total Due: **₹15,000**\n• Due Date: October 15, 2026\n• Hostel Fee balance: ₹6,000\n• Exam Fee: ₹3,000\n• Library Fee: ₹1,500\nYou can clear dues directly in the Fees module.",
    cgpa: "🎓 Your current CGPA is **8.7 / 10**. Highest performance: A+ in Algorithms.",
    timetable: "📅 **Today's Class Schedule**:\n• 09:00 AM - Data Structures (CS-201)\n• 10:00 AM - Algorithms (CS-201)\n• 11:15 AM - DB Lab (CS-Lab1)\n• 02:00 PM - Operating Systems (CS-202)\n• 03:00 PM - Computer Networks (CS-202)",
    placement: "🚀 **Placement News**:\n• TCS Digital Drive: Open (Register by Sep 25)\n• Google Cloud: Open (Register by Sep 30)\n• Cognizant: ✅ **Offer Received** (Programmer Analyst)",
    leave: "📝 To apply for leave: Go to **Leave & OD Management**, click 'Apply Leave / OD', specify dates & upload certificates.",
    general: "I am trained on college academic & administrative data. Ask me about attendance, exams, fees, timetable, placement, or leave!",
  },
  ta: {
    welcome: "👋 வணக்கம்! நான் **UniBot**, உங்கள் கல்லூரி AI உதவியாளர்.\n\nநான் உங்களுக்கு உதவக்கூடியவை:\n• 📊 வருகைப்பதிவு (Attendance) & CGPA\n• 📅 தேர்வு அட்டவணை & கால அட்டவணை\n• 💰 கட்டணம் & செலுத்துதல்\n• 🏢 வேலைவாய்ப்பு (Placements)\n• 📝 விடுப்பு விண்ணப்பம் (Leave)\n\nஎன்னிடம் தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்!",
    attendance: "📊 **வருகைப்பதிவு விபரம்**:\nஉங்கள் மொத்த வருகைப்பதிவு **82%**.\n• Data Structures: 82.6%\n• Algorithms: 90.9%\n• Database Systems: 76.2%\n• Operating Systems: 77.8%\n• Computer Networks: 73.7% ⚠️ (75% கீழ் உள்ளது)",
    exam: "📅 **அடுத்த தேர்வுகள்**:\n• **Data Structures**: செப்டம்பர் 20, 2026 (காலை 10:00, Hall-A)\n• **Algorithms**: செப்டம்பர் 22, 2026 (காலை 10:00, Hall-B)\n• **Database Systems**: செப்டம்பர் 25, 2026 (மதியம் 02:00, Hall-A)",
    fees: "💰 **நிலுவைக் கட்டணம்**:\nசெலுத்த வேண்டிய தொகை: **₹15,000**\nகடைசி தேதி: அக்டோபர் 15, 2026. ஆன்லைனில் கட்டணம் செலுத்த 'Fees' பகுதிக்கு செல்லவும்.",
    cgpa: "🎓 உங்கள் தற்போதைய CGPA: **8.7 / 10**.",
    timetable: "📅 **இன்றைய வகுப்பு அட்டவணை**:\n• 09:00 AM - Data Structures (CS-201)\n• 10:00 AM - Algorithms (CS-201)\n• 11:15 AM - DB Lab (CS-Lab1)\n• 02:00 PM - OS (CS-202)\n• 03:00 PM - Networks (CS-202)",
    placement: "🚀 **வேலைவாய்ப்பு முகாம்**:\nTCS Digital பதிவு செப்டம்பர் 25 வரை திறந்துள்ளது. Cognizant நிறுவனத்தில் உங்களுக்கு வேலை உறுதி செய்யப்பட்டுள்ளது!",
    leave: "📝 விடுப்பு எடுக்க **Leave & OD Management** பகுதியில் சென்று 'Apply Leave' அழுத்தவும்.",
    general: "கல்லூரி தகவல்கள் குறித்து ஏதேனும் கேட்க விரும்பினால் வருகை, தேர்வு, கட்டணம், கால அட்டவணை பற்றி கேளுங்கள்!",
  },
  hi: {
    welcome: "👋 नमस्ते! मैं **UniBot** हूँ, आपका AI कॉलेज सहायक।\n\nमैं आपकी सहायता कर सकता हूँ:\n• 📊 उपस्थिति (Attendance) & CGPA\n• 📅 परीक्षा कार्यक्रम & समय सारिणी\n• 💰 फीस और ऑनलाइन भुगतान\n• 🏢 कैंपस प्लेसमेंट अपडेट\n• 📝 छुट्टी आवेदन (Leave)",
    attendance: "📊 **उपस्थिति विवरण**: आपकी कुल उपस्थिति **82%** है। कंप्यूटर नेटवर्क्स में 73.7% (75% से कम) है, कृपया आगामी कक्षाओं में उपस्थित रहें।",
    exam: "📅 **आगामी परीक्षाएं**:\n• Data Structures: 20 सितम्बर (सुबह 10:00 बजे)\n• Algorithms: 22 सितम्बर (सुबह 10:00 बजे)\n• Database Systems: 25 सितम्बर (दोपहर 02:00 बजे)",
    fees: "💰 **फीस विवरण**: शेष बकाया राशि **₹15,000** है। अंतिम तिथि 15 अक्टूबर 2026 है।",
    cgpa: "🎓 आपका वर्तमान CGPA **8.7 / 10** है।",
    timetable: "📅 आज की कक्षाएं: 9:00 Data Structures, 10:00 Algorithms, 11:15 DB Lab, 2:00 OS, 3:00 Networks.",
    placement: "🚀 TCS Digital और Google Cloud ड्राइव सक्रिय हैं। Cognizant से ऑफर लेटर प्राप्त हुआ है!",
    leave: "📝 छुट्टी आवेदन करने के लिए **Leave & OD** पोर्टल पर जाएं।",
    general: "आप उपस्थिति, परीक्षा, फीस या प्लेसमेंट के बारे में हिंदी या अंग्रेजी में पूछ सकते हैं।",
  },
};

function detectIntent(text) {
  const lower = text.toLowerCase();
  for (const [intent, keywords] of Object.entries(CHATBOT_INTENTS)) {
    if (keywords.some((kw) => lower.includes(kw))) return intent;
  }
  if (lower.includes('வணக்கம்') || lower.includes('ஹலோ') || lower.includes('नमस्ते') || lower.includes('hello') || lower.includes('hi')) {
    return 'greeting';
  }
  return 'general';
}

function detectLanguage(text, activeLang) {
  // Tamil unicode block 0B80 - 0BFF
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
  // Devanagari (Hindi) unicode block 0900 - 097F
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return activeLang;
}

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' | 'ta' | 'hi'
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'bot',
      content: RESPONSES_BY_LANG.en.welcome,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);

  const sendMessage = useCallback(
    async (text, user) => {
      if (!text.trim()) return;

      const userMsg = {
        id: Date.now(),
        role: 'user',
        content: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setTyping(true);

      // Detect language
      const lang = detectLanguage(text, language);
      const dict = RESPONSES_BY_LANG[lang] || RESPONSES_BY_LANG.en;
      const intent = detectIntent(text);

      await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

      let reply = dict[intent] || dict.general;
      if (intent === 'greeting') {
        reply = `${dict.welcome}\n\nHello ${user?.name ? user.name.split(' ')[0] : 'Student'}! How can I assist you today?`;
      }

      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);

      if (!isOpen) setUnread((n) => n + 1);
    },
    [isOpen, language]
  );

  const switchLanguage = (lang) => {
    setLanguage(lang);
    const welcome = RESPONSES_BY_LANG[lang]?.welcome || RESPONSES_BY_LANG.en.welcome;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'bot',
        content: `🌐 Language changed to **${lang === 'ta' ? 'தமிழ் (Tamil)' : lang === 'hi' ? 'हिंदी (Hindi)' : 'English'}**\n\n${welcome}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnread(0);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: Date.now(),
        role: 'bot',
        content: RESPONSES_BY_LANG[language].welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  return (
    <ChatbotContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  return useContext(ChatbotContext);
}
