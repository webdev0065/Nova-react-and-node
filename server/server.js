// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://abhayrahar7_db_user:rACsHEwh27ZUPb5K@cluster0.2ekg8st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

const ticketSchema = new mongoose.Schema({
    ticketNumber: String,
    projectAddress: String,
    expirationDate: Date
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// API: Add Ticket
app.post('/api/tickets', async (req, res) => {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.json(ticket);
});

// API: Get All Tickets
app.get('/api/tickets', async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
});

// API: Email Alert Endpoint
app.post('/api/send-alert', async (req, res) => {
    const { email, ticketNumber } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `811 Ticket ${ticketNumber} Expiration Alert`,
        text: `Your 811 Ticket #${ticketNumber} is about to expire. Please take action.`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) return res.status(500).send(err.toString());
        res.json({ success: true, info });
    });
});

// Auto Check Expiration and Send Alerts (Mock Example)
setInterval(async () => {
    const now = new Date();
    const soon = new Date(now);
    soon.setDate(now.getDate() + 7);

    const expiringTickets = await Ticket.find({ expirationDate: { $lte: soon } });

    expiringTickets.forEach(ticket => {
        console.log(`Ticket ${ticket.ticketNumber} is expiring soon.`);
        // You could call the send email logic here if needed
    });
}, 60 * 60 * 1000); // Every 1 hour

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
