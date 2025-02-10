// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Toaster, toast } from 'sonner';
// // import { ChatFields } from './../../../back/src/models/Chat';

// interface ChatFields {
// Admin: string;
// Notes: string;
// Assignee: string;
// messageId: string;
// userId: string;
// userName: string;
// message: string;
// messageType: 'text' | 'image'| 'audio' | 'video'| 'document' | 'location'| 'sticker';
// timestamp: Date;
// direction: 'sent' | 'received';
// status: 'delivered' | 'read'| 'failed';
// mediaUrl: string;
// chatSessionId: string;
// responseToMessageId: string;
// labels: 'tech' | 'vocal';
// }

// interface Message {
//   Phone: string;
//   Message: string;
//   SentBy: string; // "Admin" for sent, "User" for received



// }

// const URL_LOCAL = "http://localhost:3000";
// const TEST_PHONE = "1234567890"; // Replace with your WhatsApp test phone number

// const WhatsAppChat = () => {
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatFields[]>([]);

//   // Function to fetch chat history
//   const fetchChatHistory = async () => {
//     if (!phone) return;

//     try {
//       const res = await axios.get(`${URL_LOCAL}/api/wapps/history/${phone}`);
//       setChatHistory(res.data);
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     }
//   };

//   // Fetch chat history on phone change & poll every 5 seconds
//   useEffect(() => {
//     fetchChatHistory();
//     const interval = setInterval(fetchChatHistory, 5000);
//     return () => clearInterval(interval);
//   }, [phone]);

//   // Send message and update history
//   const sendMessage = async () => {
//     if (!phone || !message.trim()) return;

//     try {
//       await axios.post(`${URL_LOCAL}/api/wapps/send`, { phone, message });
//       toast.success("Message sent!");

//       // Append sent message to chat
//       setChatHistory(prev => [...prev, { Phone: phone, message: message, userName: "Admin" }]);
//       setMessage("");
      
//       // Fetch updated history to capture replies
//       setTimeout(fetchChatHistory, 3000); // Slight delay to allow response processing
//     } catch (error) {
//       toast.error("Failed to send message");
//     }
//   };

//   return (
//     <div className="p-4 w-80 border rounded-lg shadow-lg bg-white">
//       <h2 className="text-lg font-semibold">WhatsApp Chat</h2>
//       <input
//         type="text"
//         placeholder="Enter phone number"
//         className="border p-2 w-full my-2"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
      
//       <div className="overflow-y-auto h-40 border p-1 bg-gray-100 rounded-lg">
//         {chatHistory.map((msg, index) => (
//           <div key={index} className={`p-1 my-1 flex ${msg.userName === "Admin" ? "justify-end" : "justify-start"}`}>
//             <span className={`${msg.userName === "Admin" ? "bg-green-400" : "bg-blue-400"} text-white px-2 py-1 rounded-lg text-base max-w-[80%]`}>
//               {msg.message}
//             </span>
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         placeholder="Type message"
//         className="border p-2 w-full my-2"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-anaranjado text-white px-4 py-2 rounded-lg hover:bg-anaranjado_oscuro"
//           onClick={sendMessage}
//         >
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WhatsAppChat;

//******************* version to review ***** */
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { ChatFields } from "./../../../back/src/models/Chat";

interface Message {
  Phone: string;
  Message: string;
  SentBy: string;
}

const URL_LOCAL = "http://localhost:3000";
const URL_PROD = "https://h4-02-vocaltech.onrender.com";

const WhatsAppChat = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatFields[]>([]);

  useEffect(() => {
    if (phone) {
      axios.get(`${URL_LOCAL}/api/wapps/history/${phone}`).then((res) => setChatHistory(res.data));
    }
  }, [phone]);

  const sendMessage = async () => {
    try {
        // Send message via WhatsApp API
      await axios.post(`${URL_LOCAL}/api/wapps/send`, { phone, message });
    // Prepare chat object
    const chatPayload = {
        Admin: "Admin",
        Notes: "",
        userId: "reczp8vKETHvOgCVk", // Hardcoded for now, replace with real user ID later
        userName: "Admin",
        message: message,
        messageType: "text",
        direction: "sent",
        mediaUrl: "",
        labels: ["tech"],
        Phone: phone
      };
  
      // Save message in Airtable chat history
      await axios.post(`${URL_LOCAL}/api/chats/new`, chatPayload);

    // Update chat history state
    // setChatHistory([...chatHistory, chatPayload]);

      toast.success("Message sent!");
      setMessage("");
    
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-80 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold">WhatsApp Chat</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        className="border p-2 w-full my-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {/* <div className="overflow-y-auto h-40 border p-2 bg-gray-100">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`p-2 my-1 ${msg.SentBy === "Admin" ? "text-right" : "text-left"}`}>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg">{msg.Message}</span>
          </div>
        ))}
      </div> */}
      <div className="overflow-y-auto h-40 border p-1 bg-gray-100 rounded-lg">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`p-1 my-1 flex ${msg.userName === "Admin" ? "justify-end" : "justify-start"}`}>
            <span className={`${msg.userName === "Admin" ? "bg-green-400" : "bg-blue-400"} text-white px-2 py-1 rounded-lg text-base max-w-[80%]`}>{msg.message}</span>
          </div>
        ))}
      </div>      
      <input
        type="text"
        placeholder="Type message"
        className="border p-2 w-full my-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <button className="bg-green-500 text-white w-full py-2 rounded" onClick={sendMessage}>
        Send
      </button> */}
          <div className="flex justify-end">
              <button
                  type='submit'
                  className='bg-anaranjado text-white px-4 py-2 rounded-lg hover:bg-anaranjado_oscuro '
                  onClick={sendMessage}
              > Enviar
              </button>
          </div>
    </div>
  );
};

export default WhatsAppChat;
