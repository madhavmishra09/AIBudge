import { useState } from 'react'
import { Link } from 'react-router-dom'

const questions = [
  {
    id: 'toolType',
    title: 'What type of AI tools do you use most?',
    hint: 'Pick the category that best matches your current stack.',
    options: [
      'Coding / Development',
      'Design / Creative',
      'Analytics / Reporting',
      'General productivity',
    ],
  },
  {
    id: 'billingFrequency',
    title: 'How often do you pay for AI services?',
    hint: 'This helps estimate how much you can save over time.',
    options: ['Daily', 'Weekly', 'Monthly', 'Quarterly / Annually'],
  },
  {
    id: 'monthlyBudget',
    title: 'What is your approximate monthly AI spend?',
    hint: 'If you are unsure, choose the closest range.',
    options: ['$0–100', '$100–500', '$500–1K', '$1K+'],
  },
  {
    id: 'teamSize',
    title: 'How many people use AI tools in your team?',
    hint: 'This determines the scale of your stack and savings.',
    options: ['1–5', '6–20', '21–50', '50+'],
  },
  {
    id: 'biggestGoal',
    title: 'What is your biggest AI goal right now?',
    hint: 'This helps tailor your optimization path.',
    options: ['Cut costs', 'Boost productivity', 'Find better tools', 'Automate more'],
  },
]

function QuestionOptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-200 shadow-sm hover:border-purple-400 hover:bg-purple-50 ${
        selected
          ? 'border-purple-500 bg-purple-100 text-purple-900 shadow-md'
          : 'border-gray-200 bg-white text-gray-700'
      }`}
    >
      {label}
    </button>
  )
}

export default function SpendInputForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})

  const currentQuestion = questions[currentQuestionIndex]
  const selectedValue = currentQuestion ? responses[currentQuestion.id] : null
  const completed = currentQuestionIndex >= questions.length
  const progress = Math.round((Math.min(currentQuestionIndex, questions.length) / questions.length) * 100)

  const handleOptionClick = (value) => {
    if (!currentQuestion) return
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = () => {
    if (!selectedValue) return
    setCurrentQuestionIndex((index) => Math.min(index + 1, questions.length))
  }

  const handleBack = () => {
    setCurrentQuestionIndex((index) => Math.max(index - 1, 0))
  }

  const handleRestart = () => {
    setResponses({})
    setCurrentQuestionIndex(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-16 px-4">
      <div className="mx-auto max-w-4xl rounded-[36px] border border-purple-200 bg-white/90 p-8 shadow-[0_25px_80px_rgba(133,90,255,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 pb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">AI Spend Audit</p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Tell us about your AI usage</h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Answer the questions below one at a time using reusable button choices. This makes the form faster, clearer, and easier to complete.
          </p>
        </div>

        <div className="mb-8 rounded-full bg-purple-100 p-1">
          <div className="h-2 rounded-full bg-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {completed ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-purple-200 bg-purple-50 p-8">
              <h2 className="text-2xl font-semibold text-purple-900">You’re all set!</h2>
              <p className="mt-3 text-gray-700">
                We captured your answers.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {questions.map((question) => (
                <div key={question.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{question.title}</h3>
                  <p className="mt-3 text-gray-600">{responses[question.id] || 'No answer selected'}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-2xl border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Start over
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4 rounded-[32px] border border-purple-200 bg-white p-8 shadow-sm">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <h2 className="text-2xl font-semibold text-gray-900">{currentQuestion.title}</h2>
                <p className="text-gray-600">{currentQuestion.hint}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {currentQuestion.options.map((option) => (
                  <QuestionOptionButton
                    key={option}
                    label={option}
                    selected={selectedValue === option}
                    onClick={() => handleOptionClick(option)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition ${
                  currentQuestionIndex === 0
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-purple-300 bg-white text-purple-700 hover:bg-purple-50'
                }`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedValue}
                className={`rounded-2xl px-6 py-3 text-sm font-semibold text-white transition ${
                  selectedValue
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-purple-200 text-purple-400 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
