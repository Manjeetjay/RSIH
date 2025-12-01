import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import crypto from 'crypto';
import { sendTeamCredentials } from '../utils/emailService.js';

export const registerTeam = async (req, res) => {
  const {
    name,
    member1_name, member1_email, member1_phone, member1_branch, member1_stream, member1_year,
    member2_name, member2_email, member2_phone, member2_branch, member2_stream, member2_year,
    member3_name, member3_email, member3_phone, member3_branch, member3_stream, member3_year,
    member4_name, member4_email, member4_phone, member4_branch, member4_stream, member4_year
  } = req.body;

  const spocId = req.user.id;

  try {
    // Basic validation (check if team name exists for this SPOC?)
    // For now, just insert
    const newTeam = await pool.query(
      `INSERT INTO teams (
        name, spoc_id,
        member1_name, member1_email, member1_phone, member1_branch, member1_stream, member1_year,
        member2_name, member2_email, member2_phone, member2_branch, member2_stream, member2_year,
        member3_name, member3_email, member3_phone, member3_branch, member3_stream, member3_year,
        member4_name, member4_email, member4_phone, member4_branch, member4_stream, member4_year
      ) VALUES (
        $1, $2,
        $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26
      ) RETURNING *`,
      [
        name, spocId,
        member1_name, member1_email, member1_phone, member1_branch, member1_stream, member1_year,
        member2_name, member2_email, member2_phone, member2_branch, member2_stream, member2_year,
        member3_name, member3_email, member3_phone, member3_branch, member3_stream, member3_year,
        member4_name, member4_email, member4_phone, member4_branch, member4_stream, member4_year
      ]
    );

    // Also create a user login for the team leader (Member 1)
    // Generate random password
    const randomPassword = crypto.randomBytes(4).toString('hex'); // 8 char hex string
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    await pool.query(
      "INSERT INTO users (name, email, password, role, verified) VALUES ($1, $2, $3, 'TEAM_LEADER', true) ON CONFLICT (email) DO NOTHING",
      [member1_name, member1_email, hashedPassword]
    );

    // Send credentials via email
    await sendTeamCredentials(member1_email, member1_name, randomPassword);

    res.status(201).json(newTeam.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyTeams = async (req, res) => {
  const spocId = req.user.id;
  try {
    const teams = await pool.query("SELECT * FROM teams WHERE spoc_id = $1", [spocId]);
    res.json(teams.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM teams WHERE id = $1", [id]);
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkTeamSubmission = async (req, res) => {
  const { teamId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM submissions WHERE team_id=$1", [teamId]);
    if (result.rows.length === 0)
      return res.json({ submitted: false });
    res.json({ submitted: true, submission: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyCollege = async (req, res) => {
  const spocId = req.user.id;
  try {
    const result = await pool.query("SELECT * FROM colleges WHERE spoc_id=$1", [spocId]);
    if (result.rows.length === 0) {
      // If no college found, maybe return institution_name from user table?
      // Or just return empty
      return res.status(404).json({ message: "College not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTeamsByCollege = async (req, res) => {
  const { collegeId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM teams WHERE college_id=$1", [collegeId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
