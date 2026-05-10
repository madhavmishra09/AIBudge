const axios = require("axios");
const buildAuditPrompt = require("../prompts/auditPrompt");

const generateAudit = async (formData) => {

  const prompt = buildAuditPrompt(formData);

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "mistral",
      prompt,
      stream: false,
    }
  );

  const rawOutput = response.data.response;

  return JSON.parse(rawOutput);
};

module.exports = generateAudit;