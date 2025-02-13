import { useEffect, useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { ChatFields } from "../../../../back/src/models/Chat";

interface WhatsAppChatDialogProps {
  open: boolean;
  onClose: () => void;
  phone: string;
}

const URL_LOCAL = "http://localhost:3000";

const WhatsAppChatDialog: React.FC<WhatsAppChatDialogProps> = ({ open, onClose, phone }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatFields[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phone) {
      axios.get(`${URL_LOCAL}/api/wapps/history/${phone}`).then((res) => {
        const sortedHistory = res.data.sort((a: ChatFields, b: ChatFields) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setChatHistory(sortedHistory);
      });
    }
  }, [phone]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, open]);

  const sendMessage = async () => {
    try {
      await axios.post(`${URL_LOCAL}/api/wapps/send`, { phone, message });

      const chatPayload = {
        Admin: "Admin",
        Notes: "",
        userId: "reczp8vKETHvOgCVk",
        userName: "Admin",
        message: message,
        messageType: "text",
        direction: "sent",
        mediaUrl: "",
        labels: ["tech"],
        Phone: phone,
      };

      await axios.post(`${URL_LOCAL}/api/chats/new`, chatPayload);

      const response = await axios.get(`${URL_LOCAL}/api/wapps/history/${phone}`);
      const sortedHistory = response.data.sort((a: ChatFields, b: ChatFields) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      setChatHistory(sortedHistory);
      toast.success("Message sent!");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      sx={{ "& .MuiDialog-paper": { resize: "both", overflow: "auto", width: 400, height: 500 } }}
    >
      <Toaster />
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        WhatsApp con {phone}
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="overflow-y-auto h-60 border p-2 bg-gray-100 rounded-lg" ref={chatContainerRef}>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`p-1 my-1 flex ${msg.userName === "Admin" ? "justify-end" : "justify-start"}`}>
              <span className={`${msg.userName === "Admin" ? "bg-green-400" : "bg-blue-400"} text-white px-2 py-1 rounded-lg text-base max-w-[80%]`}>
                {msg.message}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 1, px: 3, pb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" color="primary" onClick={sendMessage} fullWidth>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WhatsAppChatDialog;



// import { useEffect, useRef, useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import axios from "axios";
// import { Toaster, toast } from "sonner";
// import { ChatFields } from "../../../../back/src/models/Chat";

// interface WhatsAppChatDialogProps {
//   open: boolean;
//   onClose: () => void;
//   phone: string;
// }

// const URL_LOCAL = "http://localhost:3000";

// const WhatsAppChatDialog: React.FC<WhatsAppChatDialogProps> = ({ open, onClose, phone }) => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatFields[]>([]);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (phone) {
//       axios.get(`${URL_LOCAL}/api/wapps/history/${phone}`).then((res) => {
//         const sortedHistory = res.data.sort((a: ChatFields, b: ChatFields) =>
//           new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//         );
//         setChatHistory(sortedHistory);
//       });
//     }
//   }, [phone]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   const sendMessage = async () => {
//     try {
//       await axios.post(`${URL_LOCAL}/api/wapps/send`, { phone, message });

//       const chatPayload = {
//         Admin: "Admin",
//         Notes: "",
//         userId: "reczp8vKETHvOgCVk",
//         userName: "Admin",
//         message: message,
//         messageType: "text",
//         direction: "sent",
//         mediaUrl: "",
//         labels: ["tech"],
//         Phone: phone,
//       };

//       await axios.post(`${URL_LOCAL}/api/chats/new`, chatPayload);

//       const response = await axios.get(`${URL_LOCAL}/api/wapps/history/${phone}`);
//       const sortedHistory = response.data.sort((a: ChatFields, b: ChatFields) =>
//         new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//       );

//       setChatHistory(sortedHistory);
//       toast.success("Message sent!");
//       setMessage("");
//     } catch (error) {
//       toast.error("Failed to send message");
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ "& .MuiDialog-paper": { resize: "both", overflow: "auto" } }}>
//       <Toaster />
//       <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         WhatsApp con {phone}
//         <IconButton onClick={onClose}>
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <div className="overflow-y-auto h-60 border p-2 bg-gray-100 rounded-lg" ref={chatContainerRef}>
//           {chatHistory.map((msg, index) => (
//             <div key={index} className={`p-1 my-1 flex ${msg.userName === "Admin" ? "justify-end" : "justify-start"}`}>
//               <span className={`${msg.userName === "Admin" ? "bg-green-400" : "bg-blue-400"} text-white px-2 py-1 rounded-lg text-base max-w-[80%]`}>
//                 {msg.message}
//               </span>
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//       <DialogActions sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 1, px: 3, pb: 2 }}>
//         <TextField
//           variant="outlined"
//           placeholder="Type a message..."
//           fullWidth
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <Button variant="contained" color="primary" onClick={sendMessage} fullWidth>
//           Enviar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default WhatsAppChatDialog;
