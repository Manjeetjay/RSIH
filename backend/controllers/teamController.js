import { pool } from "../config/db.js";

export const getMyTeam = async (req, res) => {
  const userId = req.user.id;
  try {
    // Find team where user is member1 (leader)
    const userRes = await pool.query("SELECT email FROM users WHERE id = $1", [userId]);
    const userEmail = userRes.rows[0].email;

    const team = await pool.query("SELECT * FROM teams WHERE member1_email = $1", [userEmail]);
    if (team.rows.length === 0) return res.status(404).json({ message: "Team not found" });
    res.json(team.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPS = async (req, res) => {
  try {
    const ps = await pool.query("SELECT * FROM problem_statements");
    res.json(ps.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitIdea = async (req, res) => {
  const { ps_id, title, description, abstract, yt_link } = req.body;
  const userId = req.user.id;

  try {
    let ppt_url = null;

    // Upload PPT file to Supabase if provided
    if (req.file) {
      try {
        const { uploadToSupabase } = await import('../utils/supabaseUpload.js');
        ppt_url = await uploadToSupabase(
          req.file.buffer,
          req.file.originalname,
          'team-presentations'
        );
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload presentation file' });
      }
    }

    // Find team_id based on user email
    const userRes = await pool.query("SELECT email FROM users WHERE id = $1", [userId]);
    const userEmail = userRes.rows[0].email;

    const teamRes = await pool.query("SELECT id FROM teams WHERE member1_email = $1", [userEmail]);

    if (teamRes.rows.length === 0) {
      return res.status(404).json({ error: "Team not found for this user" });
    }
    const team_id = teamRes.rows[0].id;

    // Check if team already submitted?
    const existingSub = await pool.query("SELECT * FROM submissions WHERE team_id = $1", [team_id]);
    if (existingSub.rows.length > 0) {
      return res.status(400).json({ error: "Team has already submitted an idea." });
    }

    const newSubmission = await pool.query(
      `INSERT INTO submissions (team_id, ps_id, title, description, abstract, ppt_url, yt_link) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [team_id, ps_id, title, description, abstract, ppt_url, yt_link]
    );
    res.status(201).json(newSubmission.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMySubmissions = async (req, res) => {
  const userId = req.user.id;
  try {
    const userRes = await pool.query("SELECT email FROM users WHERE id = $1", [userId]);
    const userEmail = userRes.rows[0].email;

    const teamRes = await pool.query("SELECT id FROM teams WHERE member1_email = $1", [userEmail]);
    if (teamRes.rows.length === 0) return res.json(null); // No team, no submission

    const team_id = teamRes.rows[0].id;
    const sub = await pool.query("SELECT * FROM submissions WHERE team_id = $1", [team_id]);

    if (sub.rows.length === 0) return res.json(null);
    res.json(sub.rows[0]); // Return single submission object
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
