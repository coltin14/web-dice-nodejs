const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

// 1. THIS ROUTE HAS NO CORS (Defined before CORS middleware)
// This will trigger the CORS failure in the browser.
app.get('/roll-no-cors/:num', (req, res) => {
  const num = parseInt(req.params.num);
  const rolls = Array.from({ length: num }, () => crypto.randomInt(1, 7));
  res.json({ rolls });
});

// 2. ENABLE CORS for the official frontend
app.use(cors({
  origin: 'https://happy-tree-01d1df610.4.azurestaticapps.net' 
}));

app.use(express.json());
app.use(express.static('public'));

// 3. WAKE UP ENDPOINT
app.get('/api/ping', (req, res) => {
  res.json({ status: 'online', message: 'Server is awake!' });
});

// 4. PROTECTED ROLL ROUTE (Has CORS)
app.get('/roll/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!num || num < 1 || num > 100) {
    return res.status(400).json({ error: 'Invalid number' });
  }
  const rolls = Array.from({ length: num }, () => crypto.randomInt(1, 7));
  const total = rolls.reduce((sum, value) => sum + value, 0);
  res.json({ rolls, total });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));