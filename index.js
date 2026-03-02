const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

const app = express();

// 1. Defined BEFORE CORS middleware to ensure it fails for the assignment
app.get('/roll-no-cors/:num', (req, res) => {
    const num = parseInt(req.params.num);
    const rolls = [];
    for (let i = 0; i < num; i++) {
        rolls.push(crypto.randomInt(1, 7)); 
    }
    res.json({ rolls });
});

// 2. Enable CORS for your Static Web App
app.use(cors({
    origin: 'https://happy-tree-01d1df610.4.azurestaticapps.net' 
}));

app.use(express.json());

// 3. Serve the 'public' folder so your HTML/CSS loads
app.use(express.static(path.join(__dirname, 'public')));

// 4. Standard Roll API
app.get('/roll/:num', (req, res) => {
    const num = parseInt(req.params.num);
    if (!num || num < 1 || num > 100) {
        return res.status(400).json({ error: 'Invalid number' });
    }
    const rolls = [];
    for (let i = 0; i < num; i++) {
        rolls.push(crypto.randomInt(1, 7));
    }
    const total = rolls.reduce((sum, value) => sum + value, 0);
    res.json({ rolls, total });
});

// 5. Wake up endpoint
app.get('/api/ping', (req, res) => {
    res.send('ping response');
});

// 6. The Azure Port requirement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});