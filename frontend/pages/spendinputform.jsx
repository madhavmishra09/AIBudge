import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 'workflow',
    multiSelect: true,
    title: 'Which workflows do you use AI for?',
    hint: 'Select all workflows where AI tools are actively used.',
    options: [
      'Software Development',
      'Content & Research',
      'Design & Creative Work',
      'Business Operations',
      'Data & Analytics',
      'General Productivity',
    ],
  },

  {
    id: 'subscriptionManagement',
    multiSelect: false,
    title: 'How are your AI subscriptions currently managed?',
    hint: 'Understanding ownership helps identify optimization opportunities.',
    options: [
      'Personally paid subscriptions',
      'Team-managed licenses',
      'Company-wide procurement',
      'Mixed setup',
    ],
  },

  {
    id: 'monthlySpend',
    multiSelect: false,
    title: 'What is your estimated monthly AI spend across all tools?',
    hint: 'Include subscriptions, API usage, and team licenses.',
    options: [
      '$0–100',
      '$100–500',
      '$500–1K',
      '$1K+',
    ],
  },

  {
    id: 'teamSize',
    multiSelect: false,
    title: 'How many people actively use AI tools in your organization?',
    hint: 'This helps us evaluate scaling efficiency and tool overlap.',
    options: [
      '1–5',
      '6–20',
      '21–50',
      '50+',
    ],
  },

  {
    id: 'optimizationGoal',
    multiSelect: true,
    title: 'What are you optimizing for right now?',
    hint: 'Select all outcomes that matter to your organization.',
    options: [
      'Reduce unnecessary AI spending',
      'Improve developer productivity',
      'Replace overlapping subscriptions',
      'Find higher ROI AI tools',
      'Scale AI usage efficiently',
      'Standardize our AI stack',
      'Other / tell us more',
    ],
  },

  {
    id: 'leastValuable',
    multiSelect: true,
    title: 'Which AI subscriptions feel the least valuable right now?',
    hint: 'Select any subscriptions that currently feel redundant or underutilized.',
    options: [
      'ChatGPT',
      'Claude',
      'Cursor',
      'GitHub Copilot',
      'Gemini',
      'Not sure yet',
    ],
  },
  {
    id: 'teamSatisfaction',
    multiSelect: false,

    title:
      'How satisfied is your team with your current AI stack?',

    hint:
      'This helps us measure whether your current spend is delivering enough value.',

    options: [
      'Very Satisfied',
      'Mostly Satisfied',
      'Mixed Experience',
      'Mostly Unsatisfied',
      'Very Unsatisfied',
    ],
  },
  {
    id: 'painPoints',
    multiSelect: true,

    title:
      'What are the biggest issues with your current AI stack?',

    hint:
      'Select all problems your team experiences regularly.',

    options: [
      'Too expensive',
      'Overlapping subscriptions',
      'Poor coding quality',
      'Weak reasoning quality',
      'Slow responses',
      'Too many unused features',
      'Difficult onboarding',
      'Inconsistent outputs',
      'Team adoption is low',
    ],
  },
  {
  id: 'highestCostTool',

  multiSelect: false,

  title:
    'Which AI tool currently costs your organization the most monthly?',

  hint:
    'This helps identify optimization opportunities and cost concentration.',

  options: [
    'ChatGPT',
    'Claude',
    'Cursor',
    'GitHub Copilot',
    'Gemini',
  ],
}
]

function QuestionOptionButton({
  label,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-200 shadow-sm hover:border-purple-400 hover:bg-purple-50 ${selected
        ? 'border-purple-500 bg-purple-100 text-purple-900 shadow-md'
        : 'border-gray-200 bg-white text-gray-700'
        }`}
    >
      {label}
    </button>
  )
}

export default function SpendInputForm() {

  const navigate = useNavigate()

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0)

  const [responses, setResponses] = useState({})

  const currentQuestion =
    questions[currentQuestionIndex]

  const selectedValue =
    currentQuestion
      ? responses[currentQuestion.id]
      : currentQuestion?.multiSelect
        ? []
        : null

  const insights = {
    Cursor:
      'Cursor already covers many coding assistant workflows.',

    Claude:
      'Claude performs especially well for reasoning-heavy tasks and research workflows.',

    ChatGPT:
      'ChatGPT is commonly used across multiple overlapping workflows.',

    Gemini:
      'Gemini often provides strong value for budget-conscious teams.',

    'Reduce unnecessary AI spending':
      'We will prioritize aggressive cost optimization opportunities.',

    'Replace overlapping subscriptions':
      'We will analyze redundancy across your AI subscriptions.',
  }

  const isOtherPurpose =
    currentQuestion?.id === 'optimizationGoal' &&
    selectedValue?.includes(
      'Other / tell us more'
    )

  const hasPurposeDetails =
    responses.purposeDetails?.trim().length > 0

  const canContinue = currentQuestion?.multiSelect
    ? selectedValue?.length > 0 &&
    (!isOtherPurpose || hasPurposeDetails)
    : Boolean(
      selectedValue &&
      (!isOtherPurpose ||
        hasPurposeDetails)
    )

  const completed =
    currentQuestionIndex >= questions.length

  const progress = Math.round(
    (
      Math.min(
        currentQuestionIndex,
        questions.length
      ) / questions.length
    ) * 100
  )

  const handleOptionClick = (value) => {

    if (!currentQuestion) return

    if (currentQuestion.multiSelect) {

      setResponses((prev) => {

        const currentSelections =
          prev[currentQuestion.id] || []

        const alreadySelected =
          currentSelections.includes(value)

        return {
          ...prev,

          [currentQuestion.id]: alreadySelected
            ? currentSelections.filter(
              (item) => item !== value
            )
            : [...currentSelections, value],
        }
      })

    } else {

      setResponses((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }))

    }
  }

  const handlePurposeDetailsChange = (value) => {
    setResponses((prev) => ({
      ...prev,
      purposeDetails: value,
    }))
  }

  const handleNext = () => {

    if (!canContinue) return

    setCurrentQuestionIndex((index) =>
      Math.min(index + 1, questions.length)
    )
  }

  const handleBack = () => {

    setCurrentQuestionIndex((index) =>
      Math.max(index - 1, 0)
    )
  }

  const handleRestart = () => {

    setResponses({})

    setCurrentQuestionIndex(0)
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-16 px-4">

      <div className="mx-auto max-w-4xl rounded-[36px] border border-purple-200 bg-white/90 p-8 shadow-[0_25px_80px_rgba(133,90,255,0.08)] backdrop-blur-xl">

        {/* Header */}

        <div className="flex flex-col gap-3 pb-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
            AI Spend Audit
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Optimize Your AI Stack
          </h1>

          <p className="mx-auto max-w-2xl text-gray-600">
            We analyze your AI stack, detect overlapping subscriptions,
            and identify opportunities to reduce costs while improving
            productivity.
          </p>

        </div>

        {/* Progress */}

        <div className="mb-8 rounded-full bg-purple-100 p-1">

          <div
            className="h-2 rounded-full bg-purple-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {completed ? (

          <div className="space-y-6">

            <div className="rounded-3xl border border-purple-200 bg-purple-50 p-8">

              <h2 className="text-2xl font-semibold text-purple-900">
                Your AI Optimization Profile Is Ready
              </h2>

              <p className="mt-3 text-gray-700">
                We can now analyze your stack, detect overlapping
                subscriptions, and recommend a more cost-efficient workflow.
              </p>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {questions.map((question) => (

                <div
                  key={question.id}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >

                  <h3 className="font-semibold text-gray-900">
                    {question.title}
                  </h3>

                  <p className="mt-3 text-gray-600">

                    {Array.isArray(
                      responses[question.id]
                    )
                      ? responses[
                        question.id
                      ]?.join(', ')
                      : responses[
                      question.id
                      ] || 'No answer selected'}

                  </p>

                </div>

              ))}

            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <button
                type="button"
                onClick={handleRestart}
                className="rounded-2xl border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Start Over
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/report', {
                    state: { responses },
                  })
                }
                className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                View Optimization Report
              </button>

            </div>

          </div>

        ) : (

          <div className="space-y-8">

            <div className="space-y-4 rounded-[32px] border border-purple-200 bg-white p-8 shadow-sm">

              <div className="space-y-3">

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                  Building Your AI Optimization Profile
                </p>

                <h2 className="text-2xl font-semibold text-gray-900">
                  {currentQuestion.title}
                </h2>

                <p className="text-gray-600">
                  {currentQuestion.hint}
                </p>

              </div>

              {/* Multi Select Hint */}

              {currentQuestion.multiSelect && (

                <div className="rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-800">
                  You can select multiple options.
                </div>

              )}

              {/* Options */}

              <div className="grid gap-4 md:grid-cols-2">

                {currentQuestion.options.map((option) => (

                  <QuestionOptionButton
                    key={option}
                    label={option}
                    selected={
                      currentQuestion.multiSelect
                        ? selectedValue?.includes(
                          option
                        )
                        : selectedValue === option
                    }
                    onClick={() =>
                      handleOptionClick(option)
                    }
                  />

                ))}

              </div>

              {/* Insights */}

              {Array.isArray(selectedValue)
                ? selectedValue.map((item) =>

                  insights[item] ? (

                    <div
                      key={item}
                      className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-900 shadow-sm"
                    >
                      {insights[item]}
                    </div>

                  ) : null
                )

                : insights[selectedValue] && (

                  <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-900 shadow-sm">
                    {insights[selectedValue]}
                  </div>

                )}

              {/* Additional Input */}

              {currentQuestion.id ===
                'optimizationGoal' && (

                  <div className="space-y-3 rounded-3xl border border-gray-200 bg-gray-50 p-4">

                    <label className="block text-sm font-semibold text-gray-900">
                      More About Your Goal
                    </label>

                    <textarea
                      rows="4"
                      value={
                        responses.purposeDetails || ''
                      }
                      onChange={(e) =>
                        handlePurposeDetailsChange(
                          e.target.value
                        )
                      }
                      disabled={!isOtherPurpose}
                      className="w-full rounded-3xl border border-gray-200 bg-white p-4 text-gray-900 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                      placeholder={
                        isOtherPurpose
                          ? 'Describe the specific optimization goal you want us to focus on.'
                          : 'Select “Other / tell us more” to describe a custom optimization goal.'
                      }
                    />

                  </div>

                )}

            </div>

            {/* Navigation */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <button
                type="button"
                onClick={handleBack}
                disabled={
                  currentQuestionIndex === 0
                }
                className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition ${currentQuestionIndex === 0
                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-purple-300 bg-white text-purple-700 hover:bg-purple-50'
                  }`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className={`rounded-2xl px-6 py-3 text-sm font-semibold text-white transition ${canContinue
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-purple-200 text-purple-400 cursor-not-allowed'
                  }`}
              >
                {currentQuestionIndex ===
                  questions.length - 1
                  ? 'Finish'
                  : 'Next Question'}
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}