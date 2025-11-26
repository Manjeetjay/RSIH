import { pool } from "../config/db.js";

export const getSettings = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM settings");
        const settings = {};
        result.rows.forEach(row => {
            settings[row.key] = row.value;
        });
        res.json(settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch settings" });
    }
};

export const updateSetting = async (req, res) => {
    const { key, value } = req.body;
    try {
        await pool.query(
            "INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2",
            [key, String(value)]
        );
        res.json({ message: "Setting updated", key, value });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update setting" });
    }
};
