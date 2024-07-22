const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/schedule', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and model
const scheduleSchema = new mongoose.Schema({
    type: String,
    periods: [{
        period: String,
        start: String,
        end: String
    }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

// API to get schedules
app.get('/api/schedules', async (req, res) => {
    const schedules = await Schedule.find({});
    res.json(schedules);
});

// API to update schedules
app.post('/api/schedules', async (req, res) => {
    const { type, periods } = req.body;
    await Schedule.findOneAndUpdate({ type }, { periods }, { upsert: true });
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
