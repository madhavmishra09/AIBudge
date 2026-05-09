const pool = require("../config/db");

const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/auth");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, email, hashedPassword]
    );

    const token = generateToken({
      id: result.rows[0].id,
      email,
    });

    res.status(201).json({
      token,
      message: "User created successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const isMatch = await comparePassword(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.json({ token });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
};

module.exports = {
  signup,
  login,
};