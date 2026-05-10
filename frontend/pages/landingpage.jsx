import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {

    const [displayText, setDisplayText] = useState("");

    const fullText = "Stop Overspending on AI Tools";

    useEffect(() => {

        let index = 0;

        const timer = setInterval(() => {

            if (index < fullText.length) {

                setDisplayText(
                    fullText.slice(0, index + 1)
                );

                index++;

            } else {

                clearInterval(timer);

            }

        }, 80);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="font-mont min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-purple-100">

            {/* Hero Section */}

            <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">

                {/* Background Glow */}

                <div className="absolute top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-300/20 blur-3xl" />

                <div className="relative z-10 max-w-5xl">

                    {/* Badge */}

                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-5 py-2 text-sm font-semibold text-purple-700 shadow-sm backdrop-blur">

                        <span className="h-2 w-2 rounded-full bg-green-500" />

                        AI Spend Optimization Platform

                    </div>

                    {/* Headline */}

                    <h1 className="text-5xl font-black leading-tight tracking-tight text-gray-900 md:text-7xl">

                        {displayText}

                        <span className="animate-pulse text-purple-500">
                            |
                        </span>

                    </h1>

                    {/* Subheadline */}

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">

                        Instantly audit your AI stack, uncover hidden savings,
                        detect overlapping subscriptions, and discover smarter,
                        lower-cost alternatives — free, fast, and founder-friendly.

                    </p>

                    {/* CTA Buttons */}

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                        <Link
                            to="/spend-input"
                            className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-400/40"
                        >

                            Run Your Free Audit →

                        </Link>

                        <a
                            href="#how-it-works"
                            className="rounded-2xl border border-purple-200 bg-white px-8 py-4 text-lg font-semibold text-purple-700 shadow-sm transition-all duration-300 hover:bg-purple-50"
                        >

                            See How It Works

                        </a>

                    </div>

                    {/* Trust Indicators */}

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500">

                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Free AI stack audit
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Detect overlapping subscriptions
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Personalized optimization insights
                        </div>

                    </div>

                    {/* Mock Dashboard */}

                    <div className="mt-20 rounded-[32px] border border-purple-200 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">

                        <div className="grid gap-4 md:grid-cols-3">

                            <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6 text-left">

                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                                    Estimated Savings
                                </p>

                                <h3 className="mt-4 text-4xl font-black text-gray-900">
                                    $427
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Monthly optimization potential
                                </p>

                            </div>

                            <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6 text-left">

                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                                    Overlap Score
                                </p>

                                <h3 className="mt-4 text-4xl font-black text-gray-900">
                                    42%
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Tool redundancy detected
                                </p>

                            </div>

                            <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6 text-left">

                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-500">
                                    Recommended Stack
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
                                        Cursor
                                    </div>

                                    <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
                                        Gemini
                                    </div>

                                </div>

                                <p className="mt-4 text-gray-600">
                                    Optimized for development workflows
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* How It Works */}

            <section
                id="how-it-works"
                className="px-4 py-24"
            >

                <div className="mx-auto max-w-6xl">

                    <div className="text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                            HOW IT WORKS
                        </p>

                        <h2 className="mt-4 text-4xl font-black text-gray-900">
                            Optimize Your AI Stack In Minutes
                        </h2>

                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">

                        <div className="rounded-[32px] border border-purple-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl font-black text-purple-700">
                                1
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-gray-900">
                                Analyze Your Stack
                            </h3>

                            <p className="mt-4 leading-8 text-gray-600">
                                Tell us which AI tools your team uses, your workflows,
                                and what you're optimizing for.
                            </p>

                        </div>

                        <div className="rounded-[32px] border border-purple-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl font-black text-purple-700">
                                2
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-gray-900">
                                Detect Overlap
                            </h3>

                            <p className="mt-4 leading-8 text-gray-600">
                                Our AI identifies redundant subscriptions,
                                unnecessary premium plans, and optimization opportunities.
                            </p>

                        </div>

                        <div className="rounded-[32px] border border-purple-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl font-black text-purple-700">
                                3
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-gray-900">
                                Get Smarter Recommendations
                            </h3>

                            <p className="mt-4 leading-8 text-gray-600">
                                Receive AI-generated recommendations for cheaper,
                                higher-efficiency tools tailored to your workflows.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Social Proof */}

            <section className="px-4 py-24 bg-white">

                <div className="mx-auto max-w-6xl">

                    <div className="text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                            SOCIAL PROOF
                        </p>

                        <h2 className="mt-4 text-4xl font-black text-gray-900">
                            Teams Are Already Cutting AI Costs
                        </h2>

                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2">

                        <blockquote className="rounded-[32px] border border-purple-100 bg-purple-50 p-8 shadow-sm">

                            <p className="text-2xl font-semibold leading-10 text-gray-900">
                                “Credex helped us cut $1,200/month from our AI bills.”
                            </p>

                            <cite className="mt-6 block text-sm font-semibold uppercase tracking-[0.24em] text-purple-600">
                                — Startup CTO
                            </cite>

                        </blockquote>

                        <blockquote className="rounded-[32px] border border-purple-100 bg-purple-50 p-8 shadow-sm">

                            <p className="text-2xl font-semibold leading-10 text-gray-900">
                                “Finally, a Mint for AI spend.”
                            </p>

                            <cite className="mt-6 block text-sm font-semibold uppercase tracking-[0.24em] text-purple-600">
                                — Indie Hacker
                            </cite>

                        </blockquote>

                    </div>

                </div>

            </section>

            {/* FAQ */}

            <section className="px-4 py-24 bg-gradient-to-b from-purple-50 to-white">

                <div className="mx-auto max-w-5xl">

                    <div className="text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                            FAQ
                        </p>

                        <h2 className="mt-4 text-4xl font-black text-gray-900">
                            Frequently Asked Questions
                        </h2>

                    </div>

                    <div className="mt-16 space-y-6">

                        {[
                            {
                                question: "Is this really free?",
                                answer:
                                    "Yes. The audit tool is completely free to use. Credex only earns when you choose to buy discounted credits after seeing your savings potential.",
                            },

                            {
                                question: "Do I need to sign up first?",
                                answer:
                                    "No. You get your audit results instantly. Email capture happens only if you want to save or share your report.",
                            },

                            {
                                question: "Which AI tools are supported?",
                                answer:
                                    "Major platforms like Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic, Gemini, and more. Pricing data is continuously updated from official sources.",
                            },

                            {
                                question: "Will my data be safe?",
                                answer:
                                    "Absolutely. Identifying information is stripped from shareable reports. Only optimization insights and savings analysis are shown.",
                            },

                            {
                                question: "What if I'm already optimized?",
                                answer:
                                    "The audit will tell you honestly. If your stack is already efficient, you'll still receive future optimization alerts as pricing and tooling evolve.",
                            },
                        ].map((faq, index) => (

                            <div
                                key={index}
                                className="rounded-[28px] border border-purple-100 bg-white p-8 shadow-sm"
                            >

                                <h3 className="text-xl font-bold text-gray-900">
                                    {faq.question}
                                </h3>

                                <p className="mt-4 leading-8 text-gray-600">
                                    {faq.answer}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        </div>

    )
}