const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// dotenv config
dotenv.config();

// rest object
const app = express();
app.use(cors());

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/admin', require('./routes/adminRoutes'))

// port
const port = process.env.PORT || 8080;

// connect database
connectDB().then(() => {
    app.listen(port, () => {
        console.log("connected to DB");
        console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white);
    });
});
