EventFlow: College Event Management System

EventFlow is a full-stack web application designed to manage college events. It provides a clean, responsive interface for students to browse and register for upcoming events, and a secure admin dashboard for staff to manage event listings and view participant data.

This project was built as a part of a college assignment, demonstrating a complete understanding of frontend and backend web development, from static HTML to a dynamic, database-driven MERN-stack (MongoDB, Express, React/Node.js) application.

Features

Student / Public-Facing:

Dynamic Home Page: Features a "Featured Events" carousel that loads events directly from the database.

Dynamic Event Listings: A dedicated "Events" page that fetches and displays all upcoming events from the backend.

Search & Filter: Users can search for events by name or filter by category (Academic, Cultural, etc.).

Dynamic Registration Form: The event dropdown in the registration form is dynamically populated from the database.

Form Validation: The registration form features robust, client-side JavaScript validation.

Responsive Design: The entire site is fully responsive for mobile, tablet, and desktop devices using Bootstrap.

Administrator-Facing:

Secure Admin Login: A separate login page for administrators (/admin-login.html).

Protected Dashboard: The admin dashboard is protected and cannot be accessed without a successful login (using sessionStorage).

Event CRUD: Full Create, Read, Update, and Delete functionality for all events.

View Participants: Admin can view a complete list of all students who have registered for any event, sorted by date.

Technologies Used

Frontend:

HTML5

CSS3 (with custom "glassmorphism" design)

Bootstrap 5

JavaScript (ES6+)

Splide.js (for carousels)

AOS (Animate on Scroll)

Backend:

Node.js

Express.js

Database:

MongoDB

Mongoose (for Object Data Modeling)

MongoDB Atlas (for cloud database hosting)

How to Run Locally

To run this project on your local machine, you will need Node.js and a free MongoDB Atlas account.

1. Backend Setup

Navigate to the backend folder:

cd backend


Install the required packages:

npm install


Open the backend/server.js file.

Find the MONGO_URI constant on line 12.

Replace the placeholder string with your own MongoDB Atlas connection string.

Start the backend server:

node server.js


The server will be running at https://event-flow-ekfv.onrender.com.

2. Frontend Setup

There is no build step for the frontend.

Ensure your backend server is running.

Open the root project folder in VS Code.

Right-click on index.html and select "Open with Live Server".

The website will open in your browser.

3. Admin Credentials

To access the admin dashboard:

Navigate to admin-login.html.

Username: admin

Password: admin123

Project Structure

/
|-- index.html              (Dynamic Home Page)
|-- events.html             (Dynamic Event List Page)
|-- registration.html       (Dynamic Registration Form)
|-- about.html              (Static Page)
|-- contact.html            (Static Page)
|-- admin-login.html        (Admin Login)
|-- admin-dashboard.html    (Admin CRUD Dashboard)
|-- styles.css              (Main Stylesheet)
|-- backend/
|   |-- server.js           (The Node.js/Express Server)
|   |-- package.json
|
|-- README.md               (This file)
