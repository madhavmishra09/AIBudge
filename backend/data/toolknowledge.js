const toolKnowledge = {

  Cursor: {
    strengths: [
      'IDE integration',
      'coding workflows',
      'autocomplete',
      'agentic coding',
    ],

    overlaps: [
      'GitHub Copilot',
    ],

    bestFor: [
      'Software Development',
    ],

    pricingTier: 'premium',
  },

  'GitHub Copilot': {
    strengths: [
      'autocomplete',
      'coding assistance',
    ],

    overlaps: [
      'Cursor',
    ],

    bestFor: [
      'Software Development',
    ],

    pricingTier: 'mid',
  },

  Claude: {
    strengths: [
      'reasoning',
      'research',
      'long context analysis',
    ],

    overlaps: [
      'ChatGPT',
    ],

    bestFor: [
      'Content & Research',
      'Business Operations',
    ],

    pricingTier: 'premium',
  },

  ChatGPT: {
    strengths: [
      'general productivity',
      'coding',
      'writing',
    ],

    overlaps: [
      'Claude',
      'Gemini',
    ],

    bestFor: [
      'General Productivity',
      'Software Development',
    ],

    pricingTier: 'premium',
  },

  Gemini: {
    strengths: [
      'budget workflows',
      'general productivity',
    ],

    overlaps: [
      'ChatGPT',
    ],

    bestFor: [
      'General Productivity',
      'Business Operations',
    ],

    pricingTier: 'budget',
  },

}

module.exports = toolKnowledge