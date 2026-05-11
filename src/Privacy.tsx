import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-[var(--text-main)] font-body">
            <h1 className="text-3xl font-black font-headline mb-6 text-[var(--accent)]">Privacy Policy</h1>
            <p className="mb-8 text-[var(--text-muted)] font-bold">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-8">
                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">1. Information We Collect</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        Better Calculators does not collect any personal information. All calculations are performed locally in your browser. We use local storage to save your input preferences to improve your experience upon returning to the site.
                    </p>
                </section>

                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">2. How We Use Your Information</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        Any data stored locally (like your last used calculator values) is used strictly to provide a seamless and fast user experience. We do not sell, rent, or share this data with any third parties.
                    </p>
                </section>

                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">3. Third-Party Services</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        We may use third-party services such as Google AdSense or Google Analytics, which use cookies to serve ads or analyze traffic to our website. These services have their own privacy policies and may track your browsing behavior across different websites.
                    </p>
                </section>

                <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)]">
                    <h2 className="text-xl font-bold font-headline mb-3 text-[var(--text-main)]">4. Changes to This Policy</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed font-medium">
                        We may update our Privacy Policy from time to time. We encourage you to review this page periodically for any changes.
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
