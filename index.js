const express = require('express')
const crypto = require('crypto')

const app = express()

// Serve files from the public folder (like index.html)
app.use(express.static('public'))

// Roll N dice
app.get('/roll/:num', (req, res) => {
  const num = parseInt(req.params.num)

  // Check if the number is valid
  if (!num || num < 1 || num > 100) {
    return res.status(400).json({ error: 'Invalid number' })
  }

  const rolls = []

  for (let i = 0; i < num; i++) {
    rolls.push(crypto.randomInt(1, 7)) // gives 1–6
  }

  const total = rolls.reduce((sum, value) => sum + value, 0)

  res.json({ rolls, total })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})