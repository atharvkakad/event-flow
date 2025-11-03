const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
// This is your correct connection string
const MONGO_URI = 'mongodb+srv://atharvkakad_db_user:ZfYK4TLGwhodmOBt@cluster0.qkps2mu.mongodb.net/EventManagementDB?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB (Atlas) Connected successfully!'))
    .catch(err => {
        console.error('!! MongoDB Connection Error !!');
        console.error(err.message); // This will show the exact error
    });

// --- ======== SCHEMAS & MODELS ======== ---

// 1. Participant Schema (from Assignment 5)
const ParticipantSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    studentId: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    eventChoice: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now }
});
const Participant = mongoose.model('Participant', ParticipantSchema);

// 2. NEW: Event Schema (for Assignment 6)
const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true }, // Changed to Date type for better sorting
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true } // URL to an image
});
const Event = mongoose.model('Event', EventSchema);


// --- ======== API ROUTES (PUBLIC) ======== ---

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API!');
});

// (Assignment 5) Register a participant
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, studentId, email, phone, department, eventChoice } = req.body;
        let existingParticipant = await Participant.findOne({ email: email, eventChoice: eventChoice });
        if (existingParticipant) {
            return res.status(400).json({ message: 'You are already registered for this event.' });
        }
        const newParticipant = new Participant(req.body);
        await newParticipant.save();
        res.status(201).json({ message: 'Registration successful!', participant: newParticipant });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// NEW: (Assignment 4/6) Get all events for the public events.html page
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 }); // Find all events, sort by date
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});


// --- ======== API ROUTES (ADMIN) ======== ---

// (Assignment 6) Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // WARNING: This is NOT secure. For this project, this is fine.
    if (username === 'admin' && password === 'admin123') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// (Assignment 7) Admin: Get all registered participants
app.get('/api/admin/participants', async (req, res) => {
    // Note: In a real app, you would verify an admin token here
    try {
        const participants = await Participant.find().sort({ registrationDate: -1 });
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// (Assignment 6 - CRUD) Admin: Create an event
app.post('/api/admin/events', async (req, res) => {
    // Note: In a real app, you would verify an admin token here
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Event created', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// (Assignment 6 - CRUD) Admin: Update an event
app.put('/api/admin/events/:id', async (req, res) => {
    // Note: In a real app, you would verify an admin token here
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(4404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// (Assignment 6 - CRUD) Admin: Delete an event
app.delete('/api/admin/events/:id', async (req, res) => {
    // Note: In a real app, you would verify an admin token here
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});


// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

