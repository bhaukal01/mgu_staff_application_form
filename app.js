const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session Middleware (Use a proper store in production)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

// Build Step (Placeholder)
async function buildStep() {
    console.log("Starting the build step...");

    try {
        console.log("Build step logic can be added here if needed.");
        console.log("Build step completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error during the build step:", error);
        process.exit(1);
    }
}

// Run build step if '--build' flag is provided
if (process.argv.includes("--build")) {
    buildStep();
} else {
    // Load routes
    const formRoutes = require("./routes/form");
    const adminRoutes = require("./routes/admin");
    const landingRoutes = require("./routes/landing");

    app.use("/form", formRoutes);
    app.use("/admin", adminRoutes);
    app.use("/", landingRoutes);

    // Start server
    app.listen(port, () => console.log(`Server running on port ${port}`));
}
