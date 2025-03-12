const express = require("express");
const db = require("../config/db");
const router = express.Router();
const session = require("express-session");

// Middleware to check if admin is logged in
function isAuthenticated(req, res, next) {
    if (req.session.admin) {
        return next();
    }
    res.redirect("/admin/login");
}

// Admin Login Page
router.get("/login", (req, res) => {
    res.render("admin_login");
});

// Handle Admin Login
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "SELECT * FROM admin_user WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                req.session.admin = username;
                res.redirect("/admin");
            } else {
                res.send("Invalid credentials.");
            }
        }
    );
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login");
    });
});

// Admin Dashboard - Show Applications
router.get("/", isAuthenticated, (req, res) => {
    db.query("SELECT * FROM staff_applications", (err, applications) => {
        if (err) throw err;
        res.render("admin_dashboard", { applications });
    });
});

// View Individual Application
router.get("/view/:id", isAuthenticated, (req, res) => {
    const appId = req.params.id;
    db.query("SELECT * FROM staff_applications WHERE id = ?", [appId], (err, result) => {
        if (err) throw err;
        res.render("admin_view", { application: result[0] });
    });
});

// Accept or Reject Application
router.post("/update/:id", isAuthenticated, (req, res) => {
    const appId = req.params.id;
    const status = req.body.status; // "Accepted" or "Rejected"

    db.query("UPDATE staff_applications SET status = ? WHERE id = ?", [status, appId], (err) => {
        if (err) throw err;
        res.redirect("/admin");
    });
});

router.get("/delete/:id", isAuthenticated, (req, res) => {
    const appId = req.params.id;

    db.query("DELETE FROM staff_applications WHERE id = ?", [appId], (err) => {
        if (err) {
            console.error("Error deleting application:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.redirect("/admin");
    });

});

module.exports = router;
