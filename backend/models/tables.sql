-- Users Table (Admin, SPOC, Team Leader)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('ADMIN', 'SPOC', 'TEAM_LEADER')),
  verified BOOLEAN DEFAULT false,
  
  -- SPOC Specific Fields
  phone VARCHAR(20),
  institution_name VARCHAR(255),
  identification_doc VARCHAR(255), -- File path
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Problem Statements Table
CREATE TABLE problem_statements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('Software', 'Hardware')),
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams Table
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  spoc_id INT REFERENCES users(id) ON DELETE CASCADE,
  
  -- Member 1 (Leader)
  member1_name VARCHAR(100) NOT NULL,
  member1_email VARCHAR(100) NOT NULL,
  member1_phone VARCHAR(20) NOT NULL,
  member1_branch VARCHAR(100) NOT NULL,
  member1_stream VARCHAR(100) NOT NULL,
  member1_year VARCHAR(20) NOT NULL,

  -- Member 2
  member2_name VARCHAR(100) NOT NULL,
  member2_email VARCHAR(100) NOT NULL,
  member2_phone VARCHAR(20) NOT NULL,
  member2_branch VARCHAR(100) NOT NULL,
  member2_stream VARCHAR(100) NOT NULL,
  member2_year VARCHAR(20) NOT NULL,

  -- Member 3
  member3_name VARCHAR(100) NOT NULL,
  member3_email VARCHAR(100) NOT NULL,
  member3_phone VARCHAR(20) NOT NULL,
  member3_branch VARCHAR(100) NOT NULL,
  member3_stream VARCHAR(100) NOT NULL,
  member3_year VARCHAR(20) NOT NULL,

  -- Member 4
  member4_name VARCHAR(100) NOT NULL,
  member4_email VARCHAR(100) NOT NULL,
  member4_phone VARCHAR(20) NOT NULL,
  member4_branch VARCHAR(100) NOT NULL,
  member4_stream VARCHAR(100) NOT NULL,
  member4_year VARCHAR(20) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions Table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  team_id INT REFERENCES teams(id) ON DELETE CASCADE,
  ps_id INT REFERENCES problem_statements(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL, -- 1000 words limit checked in app
  abstract TEXT NOT NULL,    -- 500 words limit checked in app
  ppt_url VARCHAR(255) NOT NULL,
  yt_link VARCHAR(255),      -- Optional
  status VARCHAR(20) DEFAULT 'SUBMITTED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE settings (
  key VARCHAR(50) PRIMARY KEY,
  value TEXT
);

-- Insert default setting
INSERT INTO settings (key, value) VALUES ('show_submission_counts', 'false');
