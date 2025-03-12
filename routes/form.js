const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("form");
});

router.post("/submit", (req, res) => {
    const {
        first_name,
        second_name,
        email,
        age_14plus,
        discord_username,
        discord_id,
        mc_account_type,
        mc_ign,
        discord_activity,
        game_activity,
        vc_ability,
        working_elsewhere,
        staff_experience,
    } = req.body;

    const sql = `INSERT INTO staff_applications 
      (first_name, second_name, email, age_14plus, discord_username, discord_id, mc_account_type, mc_ign, discord_activity, game_activity, vc_ability, working_elsewhere, staff_experience) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            first_name,
            second_name,
            email,
            age_14plus === "on",
            discord_username,
            discord_id,
            mc_account_type,
            mc_ign,
            discord_activity,
            game_activity,
            vc_ability,
            working_elsewhere === "on",
            staff_experience,
        ],
        (err, result) => {
            if (err) throw err;
            res.send("Application Submitted!");
        }
    );
});

module.exports = router;
