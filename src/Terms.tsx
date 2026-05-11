import React from 'react';

export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-[var(--text-main)] font-body">
            <h1 className="text-3xl font-black font-headline mb-6 text-[var(--accent)]">Terms of Service</h1>
            <p className="mb-8 text-[var(--text-muted)] font-bold">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-8">
                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">1. Acceptance of Terms</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        By accessing and using Better Calculators, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>
                </section>

                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">2. Use License</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        Permission is granted to temporarily use the materials (information or software) on Better Calculators for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                </section>

                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">3. Disclaimer</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        The calculators and information provided by Better Calculators are for educational and informational purposes only. They do not constitute financial advice. We make no warranties, expressed or implied, about the accuracy, completeness, or reliability of the calculations. Always consult with a qualified financial advisor before making any financial decisions.
                    </p>
                </section>

                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">4. Limitations</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        In no event shall Better Calculators or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
                    </p>
                </section>
            </div>
            
            <div className="mt-12 text-center">
                <a href="/" className="inline-flex items-center gap-2 text-[var(--accent)] font-bold hover:scale-105 transition-transform">
                    &larr; Back to Home
                </a>
            </div>
        </div>
    );
}
