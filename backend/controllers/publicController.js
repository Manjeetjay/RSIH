import { pool } from "../config/db.js";

export const getPublicPS = async (req, res) => {
    try {
        // Check if we should show submission counts
        const settingRes = await pool.query("SELECT value FROM settings WHERE key = 'show_submission_counts'");
        const showCounts = settingRes.rows.length > 0 && settingRes.rows[0].value === 'true';

        let query;
        if (showCounts) {
            query = `
        SELECT p.*, COUNT(s.id)::int as submission_count 
        FROM problem_statements p 
        LEFT JOIN submissions s ON p.id = s.ps_id 
        GROUP BY p.id
        ORDER BY p.id DESC
      `;
        } else {
            query = "SELECT * FROM problem_statements ORDER BY id DESC";
        }

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch problem statements" });
    }
};
