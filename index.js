const API_BASE = "https://web-dice-roller-nodejs-fhggc7e2hyakdcep.centralus-01.azurewebsites.net";

//Asynchronous "Wake Up" call
async function wakeUpServer() {
    try {
        const response = await fetch(`${API_BASE}/api/ping`);
        const text = await response.text();
        if (text === 'ping response') {
            document.getElementById("status").textContent = "Status: Server Awake";
        }
    } catch (err) {
        document.getElementById("status").textContent = "Status: Server Offline";
    }
}

//Call remote RESTful APIs for all random numbers
async function rollDice() {
    // We fetch 5 rolls from the server in one go
    const response = await fetch(`${API_BASE}/roll/5`);
    const data = await response.json();

    // Map the server-generated numbers to your UI inputs
    document.getElementById("d1").value = data.rolls[0];
    document.getElementById("d2").value = data.rolls[1];
    document.getElementById("d3").value = data.rolls[2];
    document.getElementById("d4").value = data.rolls[3];
    document.getElementById("d5").value = data.rolls[4];
}

//Demonstrate a CORS failure condition
async function testCorsFailure() {
    try {
        // Calling the route that lacks CORS headers
        const response = await fetch(`${API_BASE}/roll-no-cors/5`);
        const data = await response.json();
        document.getElementById("cors-out").textContent = "Success (Unexpected)";
    } catch (error) {
        document.getElementById("cors-out").textContent = "CORS ERROR: Request Blocked (Intentional)";
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});