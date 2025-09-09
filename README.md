# 811 Ticket Manager App
 
A simple full-stack web app to manage 811 tickets with a clean **Sky
Blue & White Theme**. Users can add tickets via a popup form, view
active tickets in a dashboard, and see alerts for tickets expiring soon.
 
------------------------------------------------------------------------
 
## ✅ Features
 
-   Add new 811 tickets (ticket number, project address, expiration
    date).
-   List of active tickets in a table.
-   Tickets flagged in red if they expire within 7 days.
-   Popup modal form to add new tickets.
-   Sky Blue & White themed UI.
-   Email alert system (configurable).
-   Hosted demo (can deploy to Heroku / AWS / Vercel).
 
------------------------------------------------------------------------
 
## 🚀 Technologies Used
 
-   Backend: Node.js, Express, MongoDB, Nodemailer
-   Frontend: React, Axios, React Modal
-   Font Awesome for icons
-   Styling: Custom CSS with Sky Blue theme
 
------------------------------------------------------------------------
 
## ⚙️ Project Structure
 
    /811-ticket-app
    ├── /backend          # Express API server
    ├── /frontend         # React frontend app
    ├── .gitignore
    └── README.md
 
------------------------------------------------------------------------
 
## 🧱 Environment Variables
 
Create a `.env` file in `/backend` with the following variables:
 
``` bash
MONGO_URI=<Your MongoDB Connection URI>
EMAIL_USER=<Your Email Address (for sending alerts)>
EMAIL_PASS=<Your Email Password or App Password>
```
 
------------------------------------------------------------------------
 
## 🏃‍♂️ How to Run Locally
 
### ✅ Backend (Server)
 
1.  Navigate to backend folder:
 
    ``` bash
    cd backend
    ```
 
2.  Install dependencies:
 
    ``` bash
    npm install
    ```
 
3.  Create `.env` file with your MongoDB and email credentials as
    mentioned above.
 
4.  Start the backend server:
 
    ``` bash
    node server.js
    ```
 
-   The backend server will run at: `http://localhost:5000`
 
------------------------------------------------------------------------
 
### ✅ Frontend (Client)
 
1.  Navigate to frontend folder:
 
    ``` bash
    cd frontend
    ```
 
2.  Install dependencies:
 
    ``` bash
    npm install
    ```
 
3.  Start the React app:
 
    ``` bash
    npm start
    ```
 
-   The frontend will run at: `http://localhost:3000`
 
------------------------------------------------------------------------
 
## ✅ API Endpoints (Server)
 
  Method   Route             Description
  -------- ----------------- ------------------------------
  POST     /api/tickets      Add a new ticket
  GET      /api/tickets      Get all tickets
  POST     /api/send-alert   Send an email alert manually
 
------------------------------------------------------------------------
 
## ✅ How It Works
 
### 1️⃣ Adding a Ticket
 
-   User clicks "Add New Ticket" button → Popup modal opens.
-   Inputs ticket number, project address, expiration date → Submits
    form → Ticket is saved to MongoDB via backend API.
 
### 2️⃣ Viewing Tickets
 
-   Tickets are fetched from backend on app load.
-   Tickets expiring within 7 days are highlighted in red.
 
### 3️⃣ Alerts
 
-   Backend runs a background check every hour to find tickets expiring
    soon.
-   Optionally send email alerts manually via `/api/send-alert`
    endpoint.
 
------------------------------------------------------------------------
 
## 🎨 Design Theme
 
-   Sky Blue primary color (`#87CEEB`).
-   Clean white background.
-   Uses Font Awesome icons (loaded via CDN).
 
Example icon usage:
 
``` html
<i className="fas fa-ticket-alt"></i>
```
 
------------------------------------------------------------------------
 
## ✅ Deployment
 
-   Frontend → Vercel / Netlify / Heroku.
-   Backend → Heroku or AWS.
-   Set environment variables properly on the hosting platform.
 
------------------------------------------------------------------------
 
## ⚡ Notes
 
-   Ensure MongoDB connection works (use Atlas or local MongoDB).
-   Email requires app-specific password for Gmail.
-   Backend and frontend run independently during development.
 
------------------------------------------------------------------------
 
## 📄 License
 
MIT License
