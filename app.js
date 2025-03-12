const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "default-secret",
        resave: false,
        saveUninitialized: true,
    })
);

// Routes
const formRoutes = require("./routes/form");
const adminRoutes = require("./routes/admin");
const landingRoutes = require("./routes/landing");

app.use("/form", formRoutes);
app.use("/admin", adminRoutes);
app.use("/", landingRoutes);

// Export for Vercel
module.exports = app;

// Start server only when running locally
if (require.main === module) {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}
