import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    const [displayText, setDisplayText] = useState("");
    const fullText = "Stop Overspending on AI Tools";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100); // Adjust speed here

        return () => clearInterval(timer);
    }, []);

    return<>
        <div className="font-mont min-h-screen bg-purple-50">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
                <h1 className="font-mont text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    {displayText}<span className="animate-pulse">|</span>
                </h1>
                <p className="font-mont text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                    Instantly audit your AI stack, uncover hidden savings, and get smarter alternatives — free, fast, and founder‑friendly.
                </p>
                <Link to="/spend-input" className="font-mont bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Run Your Free Audit →
                </Link>
            </section>

            {/* Social Proof */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-mont text-3xl font-bold text-gray-900 mb-12">What Our Users Say</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <blockquote className="font-mont bg-gray-50 p-6 rounded-lg shadow-md">
                            <p className="text-lg text-gray-700 mb-4">“Credex helped us cut $1,200/month from our AI bills.”</p>
                            <cite className="text-purple-600 font-semibold">— Startup CTO</cite>
                        </blockquote>
                        <blockquote className="font-mont bg-gray-50 p-6 rounded-lg shadow-md">
                            <p className="text-lg text-gray-700 mb-4">“Finally, a Mint for AI spend.”</p>
                            <cite className="text-purple-600 font-semibold">— Indie Hacker</cite>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-mont text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="font-mont text-xl font-semibold text-gray-900 mb-2">1. Is this really free?</h3>
                            <p className="font-mont text-gray-700">Yes. The audit tool is completely free to use. Credex only earns when you choose to buy discounted credits after seeing your savings potential.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="font-mont text-xl font-semibold text-gray-900 mb-2">2. Do I need to sign up first?</h3>
                            <p className="font-mont text-gray-700">No. You get your audit results instantly. Email capture happens only if you want to save or share your report.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="font-mont text-xl font-semibold text-gray-900 mb-2">3. Which AI tools are supported?</h3>
                            <p className="font-mont text-gray-700">Major platforms like Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic, Gemini, and more. We keep pricing data current and cited from official sources.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="font-mont text-xl font-semibold text-gray-900 mb-2">4. Will my data be safe?</h3>
                            <p className="font-mont text-gray-700">Absolutely. Identifying details (like company name or email) are stripped from public shareable reports. Only your tool usage and savings numbers are shown.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="font-mont text-xl font-semibold text-gray-900 mb-2">5. What if I’m already optimized?</h3>
                            <p className="font-mont text-gray-700">The audit will tell you honestly. If your stack is efficient, you’ll still get notified when new optimizations apply in the future.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}