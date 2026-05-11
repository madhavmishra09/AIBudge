const toolMatrix = {

  ChatGPT: {

    pricing: {
      Plus: 1999,
      Pro: 10699,
    },

    workflows: {
      'Software Development': 8,
      'Content & Research': 8,
      'Business Operations': 9,
      'General Productivity': 10,
      'Data & Analytics': 7,
    },

    overlaps: [
      'Claude',
      'Gemini',
    ],

    strengths: [
      'general productivity',
      'reasoning',
      'coding',
    ],

    scalingRisk: 'Medium',
  },

  Claude: {

    pricing: {
      Pro: 1700,
      Max: 10000,
    },

    workflows: {
      'Software Development': 6,
      'Content & Research': 10,
      'Business Operations': 8,
      'General Productivity': 7,
      'Data & Analytics': 6,
    },

    overlaps: [
      'ChatGPT',
    ],

    strengths: [
      'research',
      'long context reasoning',
    ],

    scalingRisk: 'High',
  },

  Gemini: {

    pricing: {
      Plus: 399,
      Pro: 1950,
    },

    workflows: {
      'Software Development': 6,
      'Content & Research': 7,
      'Business Operations': 9,
      'General Productivity': 9,
      'Data & Analytics': 7,
    },

    overlaps: [
      'ChatGPT',
    ],

    strengths: [
      'cost efficiency',
      'lightweight workflows',
    ],

    scalingRisk: 'Low',
  },

  Cursor: {

    pricing: {
      Pro: 1700,
    },

    workflows: {
      'Software Development': 10,
      'Content & Research': 4,
      'Business Operations': 3,
      'General Productivity': 4,
      'Data & Analytics': 6,
    },

    overlaps: [
      'GitHub Copilot',
    ],

    strengths: [
      'agentic coding',
      'IDE integration',
    ],

    scalingRisk: 'Medium',
  },

  'GitHub Copilot': {

    pricing: {
      Business: 1600,
    },

    workflows: {
      'Software Development': 7,
      'Content & Research': 2,
      'Business Operations': 2,
      'General Productivity': 2,
      'Data & Analytics': 3,
    },

    overlaps: [
      'Cursor',
    ],

    strengths: [
      'autocomplete',
    ],

    scalingRisk: 'Low',
  },
}

module.exports = toolMatrix