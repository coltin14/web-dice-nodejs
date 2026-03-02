const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

const app = express();


// Defined before CORS
app.get('/roll-no-cors/:num', (req, res) => {
    const num = parseInt(req.params.num);
    const rolls = [];
    for (let i = 0; i < num; i++) {
        rolls.push(crypto.randomInt(1, 7)); 
    }
    res.json({ rolls });
});

// Enable CORS 
app.use(cors({
    origin: 'https://happy-tree-01d1df610.4.azurestaticapps.net' 
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//Standard Roll API
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

//Wake up endpoint
app.get('/api/ping', (req, res) => {
    res.send('ping response');
});

//The Azure Port 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});