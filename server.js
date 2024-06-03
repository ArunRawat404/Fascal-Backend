const express = require('express');
const dotenv = require('dotenv');
const connect = require('./config/db_config');
const cors = require('cors');
const auth_router = require("./routes/user_auth.js");
const movies_router = require("./routes/movie");
const lists_router = require("./routes/list");
const path = require('path');
const session = require('express-session');
const { isAuthenticated } = require("./middlewares/auth_middleware")

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Routes
app.use("/api/user", auth_router);
app.use('/api/movies', movies_router);
app.use('/api/lists', isAuthenticated, lists_router);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server is up and running on PORT ${PORT}`);
    await connect();
    console.log("DB connected");
});