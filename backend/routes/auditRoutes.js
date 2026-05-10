const express = require("express");
const generateAudit = require("../services/auditEngine");

const router = express.Router();

router.post("/analyze", async (req, res) => {

  try {

    const audit = await generateAudit(req.body);

    res.json(audit);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Audit generation failed"
    });
  }
});

module.exports = router;