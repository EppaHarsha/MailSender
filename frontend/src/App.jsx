import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [senderName, setSenderName] = useState('')
  const [receiverEmail, setReceiverEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const sendMail = async () => {
    try {
      const res = await axios.post('http://localhost:3000/send', {
        senderName,
        receiverEmail,
        subject,
        message
      })
      setStatus(res.data.message)
    } catch (err) {
      setStatus("❌ Failed to send email. Please check your credentials.")
    }
  }

  return (
    <div className="App">
      <h2>📬 Mail Sender App</h2>
      <input type="text" placeholder="Sender Name" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
      <input type="email" placeholder="Recipient Email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      
      <button onClick={sendMail}>Send Email</button>
      <p>{status}</p>
    </div>
  )
}

export default App
