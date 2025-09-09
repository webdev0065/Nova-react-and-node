// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [tickets, setTickets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await axios.get('https://nova-react-and-node.onrender.com/api/tickets');
    setTickets(res.data);
  };

  const submitTicket = async (e) => {
    e.preventDefault();
    await axios.post('https://nova-react-and-node.onrender.com/api/tickets', {
      ticketNumber,
      projectAddress,
      expirationDate
    });
    fetchTickets();
    setModalIsOpen(false);
    setTicketNumber('');
    setProjectAddress('');
    setExpirationDate('');
  };

  const isExpiringSoon = (date) => {
    const today = new Date();
    const expDate = new Date(date);
    const diff = (expDate - today) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#007acc' }}>811 Ticket Manager</h1>

      <button
        onClick={() => setModalIsOpen(true)}
        style={{
          backgroundColor: '#87CEEB',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Add New Ticket
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false); setTicketNumber('');
          setProjectAddress('');
          setExpirationDate('');
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '400px'
          }
        }}
      >
        <div style={{
          display: 'flex'
          ,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2>Add 811 Ticket</h2>
          </div>
          <div style={{ marginTop: '-12%', marginRight: '-6px' }} onClick={() => {
            setModalIsOpen(false); setTicketNumber('');
            setProjectAddress('');
            setExpirationDate('');
          }}>
            <i class="fa-solid fa-xmark"></i></div>
        </div>

        <form onSubmit={submitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
          <input
            placeholder="Ticket Number"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            required
            style={{
              padding: '10px', fontSize: '14px', border: '4px solid #36dcaf99',
              borderRadius: '10px'
            }}
          />
          <input
            placeholder="Project Address"
            value={projectAddress}
            onChange={(e) => setProjectAddress(e.target.value)}
            required
            style={{
              padding: '10px', fontSize: '14px', border: '4px solid #8bc34a',
              borderRadius: '10px'
            }}
          />
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
            style={{
              padding: '10px', fontSize: '14px', border: '4px solid #4ac3a299',
              borderRadius: '10px'
            }}
          />
          <button type="submit" style={{ backgroundColor: '#rgb(72 179 222)', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
            Add Ticket
          </button>

        </form>
        <button onClick={() => {
          setModalIsOpen(false); setTicketNumber('');
          setProjectAddress('');
          setExpirationDate('');
        }} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#007acc', cursor: 'pointer' }}>

        </button>
      </Modal>

      <h2 style={{ color: '#007acc' }}>Active Tickets</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#87CEEB', color: '#fff' }}>
            <th style={{ padding: '10px' }}>Ticket #</th>
            <th style={{ padding: '10px' }}>Address</th>
            <th style={{ padding: '10px' }}>Expiration Date</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', display: 'flex', alignContent: 'center' }}>{ticket.ticketNumber}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{ticket.projectAddress}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(ticket.expirationDate).toLocaleDateString()}</td>
              <td style={{ padding: '10px', textAlign: 'center', color: isExpiringSoon(ticket.expirationDate) ? 'red' : 'green' }}>
                {isExpiringSoon(ticket.expirationDate) ? 'Expiring Soon' : 'Active'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
