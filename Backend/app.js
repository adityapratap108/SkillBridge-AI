const express = require('express');
const cors = require('cors');

const analyzeRoute = require('./routes/analyze');
const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",                                    
        "https://adityapratap108.github.io"                      
    ]
}));
app.use(express.json());

app.use('/analyze' , analyzeRoute);

module.exports = app;