const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/crafts', (req, res) => {
    const craftsPath = path.join(__dirname, 'crafts.json');
    fs.readFile(craftsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading crafts file:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const crafts = JSON.parse(data);
        res.json(crafts);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
