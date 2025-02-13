import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { ChatFields } from './../../../back/src/models/Chat'

const URL_LOCAL = 'http://localhost:3000'
const URL_PROD = 'https://h4-02-vocaltech.onrender.com'

const WhatsAppChat = () => {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatFields[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (phone) {
      axios.get(`${URL_PROD}/api/wapps/history/${phone}`).then((res) => {
        // Sort chat history by timestamp (oldest first)
        const sortedHistory = res.data.sort(
          (a: ChatFields, b: ChatFields) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
        setChatHistory(sortedHistory)
      })
    }
  }, [phone])

  useEffect(() => {
    // Scroll to the bottom when chatHistory updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        console.log('chatContainerRef.current.scrollTop', chatContainerRef.current.scrollTop);   
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    try {
      // Send message via WhatsApp API
      await axios.post(`${URL_PROD}/api/wapps/send`, { phone, message })
      // Prepare chat object
      const chatPayload = {
        Admin: 'Admin',
        Notes: '',
        userId: 'reczp8vKETHvOgCVk', // Hardcoded for now, replace with real user ID later
        userName: 'Admin',
        message: message,
        messageType: 'text',
        direction: 'sent',
        mediaUrl: '',
        labels: ['tech'],
        Phone: phone
      }

      // Save message in Airtable chat history
      await axios.post(`${URL_PROD}/api/chats/new`, chatPayload)
      // Fetch latest chat history after sending a message
      const response = await axios.get(`${URL_PROD}/api/wapps/history/${phone}`)
      const sortedHistory = response.data.sort(
        (a: ChatFields, b: ChatFields) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )

      setChatHistory(sortedHistory)
      // Update chat history state
      // setChatHistory([...chatHistory, chatPayload]);

      toast.success('Message sent!')
      setMessage('')
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  return (
    <div className='p-4 w-80 border rounded-lg shadow-lg bg-white'>
      <h2 className='text-lg font-semibold'>WhatsApp Chat</h2>
      <input
        type='text'
        placeholder='Enter phone number'
        className='border p-2 w-full my-2'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="overflow-y-auto h-40 border p-1 bg-gray-100 rounded-lg"
      ref={chatContainerRef}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-1 my-1 flex ${
              msg.userName === 'Admin' ? 'justify-end' : 'justify-start'
            }`}
          >
            <span
              className={`${
                msg.userName === 'Admin' ? 'bg-green-400' : 'bg-blue-400'
              } text-white px-2 py-1 rounded-lg text-base max-w-[80%]`}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <input
        type='text'
        placeholder='Type message'
        className='border p-2 w-full my-2'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <button className="bg-green-500 text-white w-full py-2 rounded" onClick={sendMessage}>
        Send
      </button> */}
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-anaranjado text-white px-4 py-2 rounded-lg hover:bg-anaranjado_oscuro '
          onClick={sendMessage}
        >
          {' '}
          Enviar
        </button>
      </div>
    </div>
  )
}

export default WhatsAppChat
