const express = require("express");
const router = express.Router(); // Define router

router.get("/", (req, res) => {
    res.render("landing"); // Replace with your actual response
});

module.exports = router; // Export the router
