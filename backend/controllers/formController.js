const pool = require("../config/db");

const submitForm = async (req, res) => {
  try {
    const {
      tool,
      plan,
      monthlySpend,
      seats,
      teamSize,
      useCase,
      userId,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO form_responses
      (user_id, tool, plan, monthly_spend,
       seats, team_size, use_case)
       
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       
       RETURNING id`,
      [
        userId,
        tool,
        plan,
        monthlySpend,
        seats,
        teamSize,
        useCase,
      ]
    );

    res.status(201).json({
      message: "Form saved",
      id: result.rows[0].id,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Error saving form",
    });
  }
};

module.exports = {
  submitForm,
};