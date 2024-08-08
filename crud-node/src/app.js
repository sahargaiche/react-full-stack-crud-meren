const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying another port...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
};

startServer(PORT);
