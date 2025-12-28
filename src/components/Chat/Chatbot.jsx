// import React, { useState } from "react";
// import { Lightbulb, Pin, FileText, Target, Zap, HelpCircle } from "lucide-react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi , I'm your Internship & Placement Guide. Ask me something!" }
//   ]);
//   const [input, setInput] = useState("");

//   // Fixed rules for responses
// const getBotResponse = (userInput) => {
//     const text = userInput.toLowerCase();

//     if (text.includes("internship")) {
//         return (
//             <>
//                 <Lightbulb size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
//                 Internships help you gain practical skills. You can find opportunities in the 'Jobs' section.
//             </>
//         );
//     } else if (text.includes("placement")) {
//         return (
//             <>
//                 <Pin size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
//                 Placements usually start in pre-final year. Focus on projects, CGPA, and mock interviews.
//             </>
//         );
//     } else if (text.includes("resume")) {
//         return (
//             <>
//                 <FileText size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
//                 A good resume should highlight skills, projects, and internships. Keep it 1 page.
//             </>
//         );
//     } else if (text.includes("cgpa")) {
//         return (
//             <>
//                 <Target size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
//                 A CGPA of 7.5+ is good for most companies. But skills & projects matter more.
//             </>
//         );
//     } else if (text.includes("skills")) {
//         return (
//             <>
//                 <Zap size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
//                 In-demand skills: Web Dev, Data Structures, DBMS, Cloud, and Communication skills.
//             </>
//         );
//     } else if (text.includes("hello") || text.includes("hi")) {
//         return "Hello! How can I help you with internships or placements today?";
//     } else {
//         return (
//             <>
//                 <HelpCircle size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
//                 Sorry, I can answer only about internships, placements, resume, CGPA, and skills.
//             </>
//         );
//     }
// };

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);

//     // Bot response
//     const botReply = getBotResponse(input);
//     setMessages([...newMessages, { sender: "bot", text: botReply }]);

//     setInput("");
//   };

//   return (
//     <div style={{
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//       zIndex: 1000,
//     }}>
//       {/* Toggle Button */}
//       {!isOpen ? (
//         <button 
//           onClick={() => setIsOpen(true)} 
//           style={{
//             background: "#4CAF50",
//             color: "#fff",
//             border: "none",
//             borderRadius: "50%",
//             width: "60px",
//             height: "60px",
//             fontSize: "24px",
//             cursor: "pointer",
//             boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
//           }}
//         >
//           💬
//         </button>
//       ) : (
//         <div style={{
//           width: "300px",
//           height: "400px",
//           background: "#fff",
//           border: "1px solid #ccc",
//           borderRadius: "10px",
//           display: "flex",
//           flexDirection: "column",
//           boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
//         }}>
//           {/* Header */}
//           <div style={{
//             background: "#4CAF50",
//             color: "#fff",
//             padding: "10px",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}>
//             <span>Internship Bot 🤖</span>
//             <button 
//               onClick={() => setIsOpen(false)} 
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "#fff",
//                 fontSize: "18px",
//                 cursor: "pointer"
//               }}
//             >
//               ✖
//             </button>
//           </div>

//           {/* Messages */}
//           <div style={{
//             flex: 1,
//             padding: "10px",
//             overflowY: "auto"
//           }}>
//             {messages.map((msg, index) => (
//               <div 
//                 key={index} 
//                 style={{
//                   margin: "8px 0",
//                   textAlign: msg.sender === "user" ? "right" : "left"
//                 }}
//               >
//                 <span style={{
//                   display: "inline-block",
//                   padding: "8px 12px",
//                   borderRadius: "15px",
//                   background: msg.sender === "user" ? "#DCF8C6" : "#F1F0F0",
//                   maxWidth: "80%"
//                 }}>
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div style={{ display: "flex", padding: "8px", borderTop: "1px solid #ccc" }}>
//             <input 
//               type="text" 
//               value={input} 
//               onChange={(e) => setInput(e.target.value)} 
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..." 
//               style={{
//                 flex: 1,
//                 padding: "8px",
//                 borderRadius: "20px",
//                 border: "1px solid #ccc",
//                 outline: "none"
//               }}
//             />
//             <button 
//               onClick={handleSend} 
//               style={{
//                 marginLeft: "8px",
//                 background: "#4CAF50",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "20px",
//                 padding: "8px 12px",
//                 cursor: "pointer"
//               }}
//             >
//               ➤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Briefcase, Target, FileText, Zap, BarChart2, Smile } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m your Internship & Placement Assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  // Simple rule-based answers
const handleBotResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();
    if (msg.includes("internship") || msg.includes("intern")) {
        return (
            <>
                <Briefcase size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                Internships are a great way to gain real-world experience and boost your resume. Start applying in your 2nd or 3rd year, focus on building projects, networking, and check the 'Jobs' section for new opportunities. Tailor your resume for each application and prepare for interviews by practicing common questions.
            </>
        );
    } else if (
        msg.includes("placement") ||
        msg.includes("campus") ||
        msg.includes("job") ||
        msg.includes("company") ||
        msg.includes("recruitment")
    ) {
        return (
            <>
                <Target size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                Campus placements usually begin in your final year. Maintain a strong CGPA (7.5+ is good), work on your communication skills, and practice Data Structures & Algorithms (DSA), aptitude, and coding interviews. Participate in mock interviews, build a solid LinkedIn profile, and research companies visiting your campus.
            </>
        );
    } else if (msg.includes("resume") || msg.includes("cv")) {
        return (
            <>
                <FileText size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                Resume tip: Keep it concise (1 page), highlight your key skills, projects, internships, and achievements. Use action verbs, quantify your impact, and avoid generic statements. Proofread for errors and tailor your resume for each role.
            </>
        );
    } else if (
        msg.includes("skills") ||
        msg.includes("tech") ||
        msg.includes("technology") ||
        msg.includes("soft skill")
    ) {
        return (
            <>
                <Zap size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                In-demand skills for placements: DSA, Web Development, Python, SQL, DBMS, Cloud basics, and strong communication & teamwork. For internships, focus on learning new technologies, problem-solving, and adaptability.
            </>
        );
    } else if (msg.includes("cgpa") || msg.includes("grade") || msg.includes("marks")) {
        return (
            <>
                <BarChart2 size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                A CGPA above 7.5 is preferred by most companies, but skills, projects, and internships matter more. Keep learning and improving!
            </>
        );
    } else if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        return (
            <>
                <Smile size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                Hello! How can I help you with internships, placements, resume, or skills today?
            </>
        );
    } else {
        return (
            <>
                <Smile size={16} style={{ verticalAlign: "middle", marginRight: 4 }} />
                Sorry, I don’t have an answer for that yet. Try asking about internships, placements, resume, CGPA, or skills.
            </>
        );
    }
};

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Bot reply after delay
    setTimeout(() => {
      const botReply = handleBotResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 600);
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#1e3a8a",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            border: "none",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "320px",
            height: "420px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#1e3a8a",
              color: "white",
              padding: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Placement Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              backgroundColor: "#f9fafb",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.sender === "user" ? "#1e3a8a" : "#e5e7eb",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "10px 14px",
                    borderRadius: "16px",
                    maxWidth: "70%",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #e5e7eb",
              padding: "8px",
              backgroundColor: "white",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "20px",
                padding: "8px 12px",
                fontSize: "14px",
                outline: "none",
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "8px",
                backgroundColor: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
