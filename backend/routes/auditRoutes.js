const express = require('express')

const router = express.Router()

const generateAudit =
  require('../services/auditEngine')

router.post(
  '/analyze',
  async (req, res) => {

    try {

      const report =
        await generateAudit(
          req.body
        )

      res.json(report)

    } catch (error) {

      console.error(error)

      res.status(500).json({

        error:
          'Audit generation failed',
      })
    }
  }
)

module.exports = router