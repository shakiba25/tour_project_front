// // File: ChatApp.jsx
// import { useEffect, useRef, useState } from "react";
// import "./ChatPage.css";

// export default function ChatApp() {
//   const [messages, setMessages] = useState([
//     { id: 1, role: "bot", text: "سلام! من اینجام تا کمکت کنم.", time: ts() },
//   ]);
//   const [value, setValue] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [dark, setDark] = useState(false);
//   const listRef = useRef(null);

//   // auto-scroll on new messages
//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [messages, typing]);

//   function ts() {
//     const d = new Date();
//     return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   }

//   function send() {
//     const text = value.trim();
//     if (!text) return;
//     const userMsg = { id: Date.now(), role: "user", text, time: ts() };
//     setMessages((m) => [...m, userMsg]);
//     setValue("");

//     // fake bot reply (replace with your API later)
//     setTyping(true);
//     setTimeout(() => {
//       const reply = {
//         id: Date.now() + 1,
//         role: "bot",
//         text: `پیام دریافت شد: "${text}"\nفعلاً من یک نمونه‌ی نمایشی‌ام ✨`,
//         time: ts(),
//       };
//       setMessages((m) => [...m, reply]);
//       setTyping(false);
//     }, 650);
//   }

//   function onKeyDown(e) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   }

//   return (
//     <div className={"app " + (dark ? "theme-dark" : "") }>
//       <div className="chat">
//         {/* Header */}
//         <header className="chat__header">
//           <div className="chat__title">
//             <span className="dot" />
//             <div>
//               <h1>گفت‌وگو</h1>
//               <p>آماده پاسخ‌گویی</p>
//             </div>
//           </div>
//           <div className="chat__actions">
//             <button className="icon-btn" title="تغییر تم" onClick={() => setDark((d) => !d)}>
//               {/* moon / sun */}
//               <svg viewBox="0 0 24 24" className="icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
//             </button>
//             <button className="btn" onClick={() => setMessages([{ id: 1, role: "bot", text: "سلام! از نو شروع کنیم.", time: ts() }])}>شروع تازه</button>
//           </div>
//         </header>

//         {/* Messages */}
//         <main ref={listRef} className="chat__messages" dir="rtl">
//           {messages.map((m) => (
//             <Message key={m.id} role={m.role} text={m.text} time={m.time} />
//           ))}
//           {typing && (
//             <Message role="bot" text={<Typing />} time="در حال نوشتن…" />
//           )}
//         </main>

//         {/* Composer */}
//         <footer className="chat__composer">
//           <button className="icon-btn" title="ضمیمه">
//             <svg viewBox="0 0 24 24" className="icon"><path d="M21.44 11.05l-8.49 8.49a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 1 1 5.66 5.66l-9.19 9.19a2 2 0 1 1-2.83-2.83l8.49-8.49"/></svg>
//           </button>
//           <textarea
//             className="input"
//             placeholder="پیامت رو بنویس… (Enter = ارسال / Shift+Enter = خط جدید)"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             onKeyDown={onKeyDown}
//             rows={1}
//           />
//           <button className="send-btn" onClick={send} disabled={!value.trim()}>
//             <svg viewBox="0 0 24 24" className="icon"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
//           </button>
//         </footer>
//       </div>
//     </div>
//   );
// }

// function Message({ role, text, time }) {
//   return (
//     <div className={"msg " + (role === "user" ? "msg--user" : "msg--bot") }>
//       <div className="msg__avatar" aria-hidden>
//         {role === "user" ? "شما" : "بات"}
//       </div>
//       <div className="msg__bubble">
//         <div className="msg__content">{text}</div>
//         <div className="msg__meta">{time}</div>
//       </div>
//     </div>
//   );
// }

// function Typing() {
//   return (
//     <span className="typing">
//       <i />
//       <i />
//       <i />
//     </span>
//   );
// }

// File: ChatApp.jsx
import { useEffect, useRef, useState } from "react";
import chatApi from "../api/chatAPI";
import "./ChatPage.css";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [dark, setDark] = useState(false);
  const [chatId, setChatId] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    // ساخت جلسه جدید هنگام لود صفحه
    chatApi
      .createChat()
      .then((res) => {
        setChatId(res.data.id);
        console.log("Chat created:", res.data.id);

        // پیام خوش‌آمدگویی اولیه
        const welcome = {
          id: Date.now(),
          role: "bot",
          text: "سلام! من اینجام تا کمکت کنم ✨",
          time: ts(),
        };
        setMessages([welcome]);
      })
      .catch((err) => {
        console.error("خطا در ساخت چت:", err);
      });
  }, []);

  // اسکرول خودکار پایین صفحه
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function ts() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function send() {
    // const text = value.trim();
    // if (!text) return;

    // const userMsg = { id: Date.now(), role: "user", text, time: ts() };
    // setMessages((m) => [...m, userMsg]);
    // setValue("");
    // setTyping(true);

    // // جواب ساده: اگر پیام "سلام" بود، جواب "درود!" می‌دهد، در غیر این صورت پاسخ پیش‌فرض
    // setTimeout(() => {
    //   const replyText = text === "سلام" ? "درود!" : "متوجه نشدم 🤔";
    //   const botReply = {
    //     id: Date.now() + 1,
    //     role: "bot",
    //     text: replyText,
    //     time: ts(),
    //   };
    //   setMessages((m) => [...m, botReply]);
    //   setTyping(false);
    // }, 3000); // شبیه سازی تأخیر پاسخ
    const text = value.trim();
    if (!text || !chatId) return;

    const userMsg = { id: Date.now(), role: "user", text, time: ts() };
    setMessages((m) => [...m, userMsg]);
    setValue("");
    setTyping(true);

    chatApi
      .sendMessage(chatId, text)
      .then((res) => {
        const botMsg = res.data.bot_msg;
        const reply = {
          id: botMsg.id,
          role: "bot",
          text: botMsg.content,
          time: ts(),
        };
        setMessages((m) => [...m, reply]);
      })
      .catch((err) => {
        console.error("خطا در پاسخ بات:", err);
        const errorReply = {
          id: Date.now() + 1,
          role: "bot",
          text: "❌ متاسفم، خطایی رخ داد.",
          time: ts(),
        };
        setMessages((m) => [...m, errorReply]);
      })
      .finally(() => {
        setTyping(false);
      });
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function resetChat() {
    setChatId(null);
    setMessages([]);
    setTyping(false);
    setValue("");

    chatApi
      .createChat()
      .then((res) => {
        setChatId(res.data.id);
        const welcome = {
          id: Date.now(),
          role: "bot",
          text: "شروع تازه! سوالت رو بپرس.",
          time: ts(),
        };
        setMessages([welcome]);
      })
      .catch((err) => {
        console.error("خطا در ساخت مجدد چت:", err);
      });
  }

  return (
    <div className={"app " + (dark ? "theme-dark" : "")}>
      <div className="chat">
        {/* Header */}
        <header className="chat__header">
          <div className="chat__title">
            <span className="dot" />
            <div>
              <h1>گفت‌وگو</h1>
              <p>پرسش‌هات رو بپرس</p>
            </div>
          </div>
          <div className="chat__actions">
            <button
              className="icon-btn"
              title="تغییر تم"
              onClick={() => setDark((d) => !d)}
            >
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <button className="btn" onClick={resetChat}>
              شروع تازه
            </button>
          </div>
        </header>

        {/* Messages */}
        <main ref={listRef} className="chat__messages" dir="rtl">
          {messages.map((m) => (
            <Message key={m.id} role={m.role} text={m.text} time={m.time} />
          ))}
          {typing && (
            <Message role="bot" text={<Typing />} />
          )}
        </main>

        {/* Composer */}
        <footer className="chat__composer">
          <textarea
            className="input"
            placeholder="پیامت رو بنویس… (Enter = ارسال / Shift+Enter = خط جدید)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
          />
          <button className="send-btn" onClick={send} disabled={!value.trim()}>
            <img src="/images/send.png" alt="send Icon" className="send-icon" />

          </button>
        </footer>
      </div>
    </div>
  );
}

// function Message({ role, text, time }) {
//   return (
//     <div className={"msg " + (role === "user" ? "msg--user" : "msg--bot")}>
//       <div className="msg__avatar" aria-hidden>
//         {role === "user" ? "شما" : "بات"}
//       </div>
//       <div className="msg__bubble">
//         <div className="msg__content">{text}</div>
//         <div className="msg__meta">{time}</div>
//       </div>
//     </div>
//   );
// }

function Message({ role, text, time }) {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(text); // یک چک ساده برای وجود تگ HTML

  return (
    <div className={"msg " + (role === "user" ? "msg--user" : "msg--bot")}>
      <div className="msg__avatar" aria-hidden>
        {role === "user" ? "شما" : "بات"}
      </div>
      <div className="msg__bubble">
        <div
          className="msg__content"
          dangerouslySetInnerHTML={
            role === "bot" && isHTML ? { __html: text } : undefined
          }
        >
          {role === "user" || !isHTML ? text : null}
        </div>
        <div className="msg__meta">{time}</div>
      </div>
    </div>
  );
}


function Typing() {
  return (
    <span className="typing">
      <span>در حال نوشتن</span>
      <i />
      <i />
      <i />
    </span>
  );
}

function resetChat() {
  setChatId(null);
  setMessages([]);
  setTyping(false);
  setValue("");

  // ساخت چت جدید در سرور
  chatApi
    .createChat()
    .then((res) => {
      const newChatId = res.data.id;
      setChatId(newChatId);

      // پیام خوش‌آمدگویی
      const welcome = {
        id: Date.now(),
        role: "bot",
        text: "شروع تازه! سوالت رو بپرس.",
        time: ts(),
      };
      setMessages([welcome]);
    })
    .catch((err) => {
      console.error("خطا در ساخت چت جدید:", err);
    });
}
