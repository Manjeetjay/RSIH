import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// ✅ Login for all users
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role === "SPOC" && !user.verified)
      return res.status(403).json({ message: "SPOC not yet verified by Admin." });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Register for all users (SPOC, Team Leader, Admin)
export const registerUser = async (req, res) => {
  const { name, email, password, role, phone, institution_name } = req.body;
  const identification_doc = req.file ? `/uploads/docs/${req.file.filename}` : null;

  try {
    // Check if user exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let query = "";
    let values = [];

    if (role === 'SPOC') {
      query = `INSERT INTO users (name, email, password, role, phone, institution_name, identification_doc, verified) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, false) RETURNING *`;
      values = [name, email, hashedPassword, role, phone, institution_name, identification_doc];
    } else {
      // Default for others (Team Leader usually created by SPOC, but if public reg allowed)
      // Admin also created here if needed, but usually seeded.
      query = `INSERT INTO users (name, email, password, role, verified) 
               VALUES ($1, $2, $3, $4, true) RETURNING *`;
      values = [name, email, hashedPassword, role];
    }

    const newUser = await pool.query(query, values);

    res.status(201).json({
      message: role === 'SPOC'
        ? "SPOC registered successfully. Awaiting admin verification."
        : "User registered successfully."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
