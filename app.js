const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const db = require("./config/db");
const formRoutes = require("./routes/form");
const adminRoutes = require("./routes/admin");
const landingRoutes = require("./routes/landing");
const path = require('path');

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware for Admin Authentication
app.use(
    session({
        secret: "admin-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware to Check Admin Authentication
function isAuthenticated(req, res, next) {
    if (req.session.admin) {
        return next();
    }
    res.redirect("/admin/login");
}

// Routes
app.use("/form", formRoutes);
app.use("/admin", adminRoutes);
app.use("/", landingRoutes);


console.log("DB_USER:", process.env.DB_USER); // Debugging
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Exists" : "Not Found"); // Debugging


// Start Server
// app.listen(3000, () => console.log("Server running on port 3000"));
