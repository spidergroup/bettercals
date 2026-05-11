import React, { useState, useMemo } from 'react';
import { Bell, Home, Landmark, ChevronUp, Download, LayoutDashboard, Calculator, Wallet, User, Menu, X, RotateCcw, Sun, Moon, Car } from 'lucide-react';

function SliderInput({ label, value, onChange, min, max, step = 1, prefix, suffix, widthClass = "w-40" }: any) {
    const [inputValue, setInputValue] = useState(value.toLocaleString());

    React.useEffect(() => {
        setInputValue(value.toLocaleString());
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '');
        setInputValue(e.target.value);
        const parsed = parseFloat(rawValue);
        if (!isNaN(parsed)) onChange(parsed);
    };

    const handleBlur = () => {
        const rawValue = inputValue.replace(/,/g, '');
        let parsed = parseFloat(rawValue);
        if (isNaN(parsed)) parsed = min;
        if (parsed < min) parsed = min;
        if (parsed > max) parsed = max;
        onChange(parsed);
        setInputValue(parsed.toLocaleString());
    }

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[var(--text-label)] font-label">{label}</label>
                <div className="relative">
                    {prefix && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-bold text-sm">{prefix}</span>}
                    <input
                        className={`${prefix ? 'pl-6' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'} py-1 bg-[var(--bg-input)] border border-[var(--border-main)] rounded-lg text-right font-headline font-black text-[var(--input-text)] ${widthClass} text-sm focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none`}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />
                    {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[10px] font-bold">{suffix}</span>}
                </div>
            </div>
            <input
                className="w-full accent-[var(--accent)] h-1.5"
                max={max}
                min={min}
                step={step}
                type="range"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
        </div>
    );
}

function RecurringExpenseInput({ label, value, onChange, min, max }: any) {
    const [inputValue, setInputValue] = useState(value.toLocaleString());

    React.useEffect(() => {
        setInputValue(value.toLocaleString());
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '');
        setInputValue(e.target.value);
        const parsed = parseFloat(rawValue);
        if (!isNaN(parsed)) onChange(parsed);
    };

    const handleBlur = () => {
        const rawValue = inputValue.replace(/,/g, '');
        let parsed = parseFloat(rawValue);
        if (isNaN(parsed)) parsed = min;
        if (parsed < min) parsed = min;
        if (parsed > max) parsed = max;
        onChange(parsed);
        setInputValue(parsed.toLocaleString());
    }

    return (
        <div className="space-y-1 bg-[var(--bg-input)] p-3 rounded-xl border border-[var(--border-main)]">
            <label className="text-[10px] font-black text-[var(--text-label)] uppercase tracking-widest font-label">{label}</label>
            <div className="relative flex items-center">
                <span className="text-[var(--text-muted)] font-black text-sm mr-1">$</span>
                <input
                    className="w-full bg-transparent border-none text-base font-headline font-black text-[var(--text-main)] p-0 focus:ring-0 outline-none"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </div>
            <input
                className="w-full mt-1 accent-[var(--accent)] h-1.5"
                max={max}
                min={min}
                type="range"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
        </div>
    );
}

const DonutChart = ({ principal, principalAndInterest, taxesAndFees }: any) => {
    const total = principalAndInterest + taxesAndFees;
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const piPercentage = total > 0 ? (principalAndInterest / total) : 0;
    const strokeDasharray = `${piPercentage * circumference} ${circumference}`;

    return (
        <div className="relative w-32 h-32 mx-auto my-2">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase">Principal</span>
                <span className="text-sm font-black text-[var(--text-main)]">${principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r={radius} stroke="var(--donut-track)" strokeWidth="6"></circle>
                <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r={radius}
                    stroke="var(--accent)"
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                    strokeWidth="6"
                    className="transition-all duration-500 ease-out"
                ></circle>
            </svg>
        </div>
    );
}

const TotalCostDonutChart = ({ principal, totalInterest }: { principal: number, totalInterest: number }) => {
    const total = principal + totalInterest;
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const piPercentage = total > 0 ? (principal / total) : 0;
    const strokeDasharray = `${piPercentage * circumference} ${circumference}`;

    return (
        <div className="relative w-32 h-32 mx-auto my-2">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase">Total Cost</span>
                <span className="text-sm font-black text-[var(--text-main)]">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r={radius} stroke="#f43f5e" strokeWidth="6" className="opacity-20"></circle>
                <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r={radius}
                    stroke="var(--accent)"
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                    strokeWidth="6"
                    className="transition-all duration-500 ease-out"
                ></circle>
            </svg>
        </div>
    );
}

const AmortizationTable = ({ schedule, extraPayments, setExtraPayments, showAll, setShowAll, numberOfPayments, formatMonthYear, formatCurrencyWithCents }: any) => {
    return (
        <div className="mt-12 border border-[var(--border-main)] shadow-[var(--card-shadow)] p-6 rounded-2xl bg-[var(--bg-card)]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-black font-headline tracking-tight text-[var(--text-main)]">Amortization Schedule</h2>
                    <p className="text-[var(--text-muted)] text-xs font-medium">Repayment roadmap breakdown</p>
                </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-main)]">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-[var(--table-header-bg)] border-b border-[var(--border-main)]">
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Period</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Date</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Starting</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Payment</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Principal</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Interest</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Extra</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0">Total Principal</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label border-r border-[var(--border-main)]/50 last:border-r-0 text-center">Total Interest</th>
                            <th className="px-3 py-3 text-xs font-black text-[var(--table-header-text)] uppercase tracking-widest font-label text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-main)]">
                        {(showAll ? schedule : schedule.slice(0, 3)).map((row: any) => (
                            <tr key={row.period} className="hover:bg-[var(--accent)]/5 transition-colors">
                                <td className="px-3 py-3 font-bold text-sm text-[var(--text-muted)] border-r border-[var(--border-main)] last:border-r-0">{row.period}</td>
                                <td className="px-3 py-3 font-bold text-sm text-[var(--text-main)] border-r border-[var(--border-main)] last:border-r-0">{formatMonthYear(row.date)}</td>
                                <td className="px-3 py-3 text-sm text-[var(--text-muted)] border-r border-[var(--border-main)] last:border-r-0">{formatCurrencyWithCents(row.startingBalance)}</td>
                                <td className="px-3 py-3 font-black text-sm text-[var(--text-main)] border-r border-[var(--border-main)] last:border-r-0">{formatCurrencyWithCents(row.payment)}</td>
                                <td className="px-3 py-3 text-[var(--table-principal)] font-bold text-sm border-r border-[var(--border-main)] last:border-r-0">{formatCurrencyWithCents(row.principalPayment)}</td>
                                <td className="px-3 py-3 text-[var(--table-interest)] font-bold text-sm border-r border-[var(--border-main)] last:border-r-0">{formatCurrencyWithCents(row.interestPayment)}</td>
                                <td className="px-3 py-3 border-r border-[var(--border-main)] last:border-r-0">
                                    <div className="relative min-w-[80px]">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-bold text-xs">$</span>
                                        <input
                                            className="w-full pl-5 pr-2 py-1 text-right text-sm font-black text-[var(--text-main)] bg-[var(--bg-input)] border border-[var(--border-main)] rounded-lg focus:ring-1 focus:ring-[var(--accent)]/30 outline-none"
                                            type="text"
                                            value={extraPayments[row.period] ?? ""}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9.]/g, '');
                                                if (val === "") {
                                                    const newExtras = { ...extraPayments };
                                                    delete newExtras[row.period];
                                                    setExtraPayments(newExtras);
                                                    return;
                                                }
                                                const num = parseFloat(val);
                                                if (!isNaN(num)) {
                                                    setExtraPayments({ ...extraPayments, [row.period]: num });
                                                }
                                            }}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </td>
                                <td className="px-3 py-3 font-bold text-sm text-[var(--table-principal)] border-r border-[var(--border-main)] last:border-r-0">{formatCurrencyWithCents(row.totalPrincipal)}</td>
                                <td className="px-3 py-3 font-bold text-sm text-[var(--table-interest)] text-center border-r border-[var(--border-main)] last:border-r-0">{formatCurrencyWithCents(row.totalInterest)}</td>
                                <td className="px-3 py-3 font-black text-sm text-right text-[var(--text-main)]">{formatCurrencyWithCents(row.endingBalance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm font-black text-[var(--accent)] hover:scale-105 transition-all"
                >
                    {showAll ? 'Show Less' : `View All ${numberOfPayments} Payments`}
                </button>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] overflow-hidden mb-3">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-[var(--accent)]/5 transition-colors focus:outline-none group"
            >
                <span className="font-headline font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{question}</span>
                <ChevronUp className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-4 text-sm font-medium text-[var(--text-muted)] border-t border-[var(--border-main)]/50 pt-4">
                    {answer}
                </div>
            </div>
        </div>
    );
};

function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return defaultValue;
            }
        }
        return defaultValue;
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default function App() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? 'light' : 'dark';
    });

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const [activeTab, setActiveTab] = usePersistentState<'mortgage' | 'auto'>('bc_activeTab', 'mortgage');

    React.useEffect(() => {
        let title = "";
        let description = "";

        if (activeTab === 'mortgage') {
            title = "Better Mortgage Calculator | Instant Monthly Payment Estimates";
            description = "Use the Better Mortgage Calculator to instantly see your estimated monthly mortgage payments with no input required. Fast, simple, and accurate home loan insights.";
        } else {
            title = "Better Auto Loan Calculator | Instant Monthly Car Payment Estimates";
            description = "Estimate your monthly car payments with the Better Auto Loan Calculator. Enter your vehicle price and loan terms for fast, accurate auto financing insights.";
        }

        document.title = title;
        
        const updateMeta = (selector: string, content: string) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute('content', content);
        };

        updateMeta('meta[name="description"]', description);
        updateMeta('meta[property="og:title"]', title);
        updateMeta('meta[property="og:description"]', description);
        updateMeta('meta[name="twitter:title"]', title);
        updateMeta('meta[name="twitter:description"]', description);

    }, [activeTab]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const [homePrice, setHomePrice] = usePersistentState('bc_homePrice', 500000);
    const [downPayment, setDownPayment] = usePersistentState('bc_downPayment', 100000);
    const [loanTerm, setLoanTerm] = usePersistentState('bc_loanTerm', 30);
    const [interestRate, setInterestRate] = usePersistentState('bc_interestRate', 5.0);

    const [propertyTax, setPropertyTax] = usePersistentState('bc_propertyTax', 0);
    const [insurance, setInsurance] = usePersistentState('bc_insurance', 0);
    const [hoaFees, setHoaFees] = usePersistentState('bc_hoaFees', 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAllPayments, setShowAllPayments] = useState(false);
    const [extraPayments, setExtraPayments] = usePersistentState<{ [key: number]: number }>('bc_extraPayments', {});
    
    // Auto Loan States
    const [autoPrice, setAutoPrice] = usePersistentState('bc_autoPrice', 48000);
    const [autoDownPayment, setAutoDownPayment] = usePersistentState('bc_autoDownPayment', 6200);
    const [autoLoanTerm, setAutoLoanTerm] = usePersistentState('bc_autoLoanTerm', 72);
    const [autoInterestRate, setAutoInterestRate] = usePersistentState('bc_autoInterestRate', 7.0);
    const [autoTradeInValue, setAutoTradeInValue] = usePersistentState('bc_autoTradeInValue', 0);
    const [autoAmountOwed, setAutoAmountOwed] = usePersistentState('bc_autoAmountOwed', 0);
    const [autoSalesTax, setAutoSalesTax] = usePersistentState('bc_autoSalesTax', 5.0);
    const [autoRegistrationFees, setAutoRegistrationFees] = usePersistentState('bc_autoRegistrationFees', 300);
    const [autoInsurance, setAutoInsurance] = usePersistentState('bc_autoInsurance', 200);
    const [autoExtraPayments, setAutoExtraPayments] = usePersistentState<{ [key: number]: number }>('bc_autoExtraPayments', {});
    const [showAllAutoPayments, setShowAllAutoPayments] = useState(false);

    const handleReset = () => {
        setHomePrice(500000);
        setDownPayment(100000);
        setLoanTerm(30);
        setInterestRate(5.0);
        setPropertyTax(0);
        setInsurance(0);
        setHoaFees(0);
        setExtraPayments({});
        setShowAllPayments(false);
    };

    const handleAutoReset = () => {
        setAutoPrice(48000);
        setAutoDownPayment(6200);
        setAutoLoanTerm(72);
        setAutoInterestRate(7.0);
        setAutoTradeInValue(0);
        setAutoAmountOwed(0);
        setAutoSalesTax(5.0);
        setAutoRegistrationFees(300);
        setAutoInsurance(200);
        setAutoExtraPayments({});
        setShowAllAutoPayments(false);
    };

    const principal = Math.max(0, homePrice - downPayment);
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPrincipalAndInterest = useMemo(() => {
        if (monthlyInterestRate === 0) return principal / numberOfPayments;
        if (numberOfPayments === 0) return 0;
        return principal *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }, [principal, monthlyInterestRate, numberOfPayments]);

    const monthlyTaxesAndFees = propertyTax + insurance + hoaFees;
    const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyTaxesAndFees;

    const amortizationSchedule = useMemo(() => {
        const schedule = [];
        let balance = principal;
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);

        let totalInterestAccumulated = 0;

        for (let i = 1; i <= 600; i++) {
            const interestPayment = balance * monthlyInterestRate;
            let principalPayment = monthlyPrincipalAndInterest - interestPayment;

            const extraPrincipal = extraPayments[i] || 0;
            const startingBalance = balance;

            let totalPrincipalForMonth = principalPayment + extraPrincipal;
            if (totalPrincipalForMonth > balance) {
                totalPrincipalForMonth = balance;
                if (principalPayment > balance) principalPayment = balance;
            }

            balance -= totalPrincipalForMonth;
            totalInterestAccumulated += interestPayment;

            schedule.push({
                period: i,
                date: new Date(currentDate),
                startingBalance: startingBalance,
                payment: monthlyPrincipalAndInterest + extraPrincipal,
                principalPayment: totalPrincipalForMonth,
                interestPayment,
                extraPayment: extraPrincipal,
                totalPrincipal: principal - Math.max(0, balance),
                totalInterest: totalInterestAccumulated,
                endingBalance: Math.max(0, balance)
            });

            currentDate.setMonth(currentDate.getMonth() + 1);
            if (balance <= 0.01) break;
            if (i >= 600) break;
        }
        return schedule;
    }, [principal, monthlyInterestRate, numberOfPayments, monthlyPrincipalAndInterest, extraPayments]);

    // --- AUTO LOAN CALCULATIONS ---
    const autoTradeInEquity = autoTradeInValue - autoAmountOwed;
    const autoTaxableAmount = Math.max(0, autoPrice - autoTradeInValue);
    const autoSalesTaxAmount = autoTaxableAmount * (autoSalesTax / 100);
    const autoPrincipal = Math.max(0, autoPrice - autoDownPayment - autoTradeInEquity + autoSalesTaxAmount + autoRegistrationFees);
    const autoMonthlyInterestRate = autoInterestRate / 100 / 12;
    const autoNumberOfPayments = autoLoanTerm;

    const autoMonthlyPrincipalAndInterest = useMemo(() => {
        if (autoMonthlyInterestRate === 0) return autoPrincipal / autoNumberOfPayments;
        if (autoNumberOfPayments === 0) return 0;
        return autoPrincipal *
            (autoMonthlyInterestRate * Math.pow(1 + autoMonthlyInterestRate, autoNumberOfPayments)) /
            (Math.pow(1 + autoMonthlyInterestRate, autoNumberOfPayments) - 1);
    }, [autoPrincipal, autoMonthlyInterestRate, autoNumberOfPayments]);

    const autoTotalMonthlyPayment = autoMonthlyPrincipalAndInterest + autoInsurance;

    const autoAmortizationSchedule = useMemo(() => {
        const schedule = [];
        let balance = autoPrincipal;
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);

        let totalInterestAccumulated = 0;

        for (let i = 1; i <= 600; i++) {
            const interestPayment = balance * autoMonthlyInterestRate;
            let principalPayment = autoMonthlyPrincipalAndInterest - interestPayment;

            const extraPrincipal = autoExtraPayments[i] || 0;
            const startingBalance = balance;

            let totalPrincipalForMonth = principalPayment + extraPrincipal;
            if (totalPrincipalForMonth > balance) {
                totalPrincipalForMonth = balance;
                if (principalPayment > balance) principalPayment = balance;
            }

            balance -= totalPrincipalForMonth;
            totalInterestAccumulated += interestPayment;

            schedule.push({
                period: i,
                date: new Date(currentDate),
                startingBalance: startingBalance,
                payment: autoMonthlyPrincipalAndInterest + extraPrincipal,
                principalPayment: totalPrincipalForMonth,
                interestPayment,
                extraPayment: extraPrincipal,
                totalPrincipal: autoPrincipal - Math.max(0, balance),
                totalInterest: totalInterestAccumulated,
                endingBalance: Math.max(0, balance)
            });

            currentDate.setMonth(currentDate.getMonth() + 1);
            if (balance <= 0.01) break;
            if (i >= autoNumberOfPayments) break;
        }
        return schedule;
    }, [autoPrincipal, autoMonthlyInterestRate, autoNumberOfPayments, autoMonthlyPrincipalAndInterest, autoExtraPayments]);

    const formatCurrencyWithCents = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const formatMonthYear = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const downPaymentPercentage = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(0) : 0;
    const [dollars, cents] = formatCurrencyWithCents(totalMonthlyPayment).split('.');

    const lastScheduleItem = amortizationSchedule[amortizationSchedule.length - 1];
    const totalInterestPaid = lastScheduleItem ? lastScheduleItem.totalInterest : 0;
    const totalPrincipalPaid = lastScheduleItem ? lastScheduleItem.totalPrincipal : 0;

    const autoLastScheduleItem = autoAmortizationSchedule[autoAmortizationSchedule.length - 1];
    const autoTotalInterestPaid = autoLastScheduleItem ? autoLastScheduleItem.totalInterest : 0;
    const autoTotalPrincipalPaid = autoLastScheduleItem ? autoLastScheduleItem.totalPrincipal : 0;
    const [autoDollars, autoCents] = formatCurrencyWithCents(autoTotalMonthlyPayment).split('.');

    return (
        <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-body pb-20 md:pb-0 transition-colors duration-300">
            <header className="w-full top-0 sticky z-50 bg-[var(--bg-header)] backdrop-blur-md flex justify-between items-center px-8 py-3 border-b border-[var(--border-main)]">
                <div className="flex items-center gap-8">
                    <a className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95" href="/">
                        <div className="flex items-center gap-3">
                            <div title="Better Calculators" className="bg-[var(--logo-bg)] w-10 h-10 flex items-center justify-center rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[var(--logo-overlay)] transform -skew-x-12 translate-x-1/2"></div>
                                <span className="text-xl font-black text-[var(--logo-text)] font-headline tracking-tighter relative z-10">BC</span>
                            </div>
                        </div>
                    </a>
                    <nav className="hidden md:flex gap-6 items-center">
                        <button onClick={() => setActiveTab('mortgage')} className={`${activeTab === 'mortgage' ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} font-headline tracking-tight font-bold text-base transition-colors py-1`}>Better Mortgage Calculator</button>
                        <button onClick={() => setActiveTab('auto')} className={`${activeTab === 'auto' ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} font-headline tracking-tight font-bold text-base transition-colors py-1`}>Better Auto Loan Calculator</button>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-all hover:scale-110 active:scale-95"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                    <button className="md:hidden text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors" onClick={() => setIsMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 z-[60] bg-[var(--bg-main)]/95 backdrop-blur-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-between items-center mb-12">
                        <div title="Better Calculators" className="bg-[var(--logo-bg)] w-10 h-10 flex items-center justify-center rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-[var(--logo-overlay)] transform -skew-x-12 translate-x-1/2"></div>
                            <span className="text-xl font-black text-[var(--logo-text)] font-headline tracking-tighter relative z-10">BC</span>
                        </div>
                        <button onClick={() => setIsMenuOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-8">
                        <button onClick={() => { setActiveTab('mortgage'); setIsMenuOpen(false); }} className={`${activeTab === 'mortgage' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} font-headline text-2xl font-bold transition-colors text-left`}>Mortgage Calculator</button>
                        <button onClick={() => { setActiveTab('auto'); setIsMenuOpen(false); }} className={`${activeTab === 'auto' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} font-headline text-2xl font-bold transition-colors text-left`}>Auto Loan Calculator</button>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col max-w-[1200px] mx-auto">
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h1 className="sr-only">
                            {activeTab === 'mortgage' ? 'Better Mortgage Calculator' : 'Better Auto Loan Calculator'}
                        </h1>
                        <p className="text-sm font-bold text-[var(--text-muted)] font-label">
                            {activeTab === 'mortgage' 
                                ? "Better Mortgage Calculator is an easy-to-use, smarter tool that lets you instantly see your estimated monthly mortgage payments—no input required. Get quick, accurate insights and plan your home financing with confidence in seconds."
                                : "Estimate your monthly car payments instantly with the Better Auto Loan Calculator. Simply enter your vehicle price, trade-in value, and financing terms to calculate exactly how much you will pay each month and over the total life of your auto loan. Plan your next vehicle purchase with confidence."}
                        </p>
                    </div>

                    {activeTab === 'mortgage' && (
                        <>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <section className="space-y-3 bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)] flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-[var(--accent)] font-headline font-bold">
                                    <Home className="w-5 h-5" />
                                    <span className="text-lg">Core Loan Details</span>
                                </div>
                                <button 
                                    onClick={handleReset}
                                    className="flex items-center gap-1.5 text-xs font-black text-[#f5a669] hover:bg-[#f5a669] hover:text-white transition-all uppercase tracking-widest bg-[var(--bg-input)] px-3 py-1 rounded-lg border border-[var(--border-main)] hover:border-[#f5a669]"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Reset
                                </button>
                            </div>

                            <SliderInput
                                label="Home Price"
                                value={homePrice}
                                onChange={setHomePrice}
                                min={100000}
                                max={2000000}
                                step={1000}
                                prefix="$"
                            />

                            <SliderInput
                                label={`Down Payment (${downPaymentPercentage}%)`}
                                value={downPayment}
                                onChange={(val: number) => setDownPayment(Math.round(val))}
                                min={0}
                                max={homePrice}
                                step={homePrice * 0.01}
                                prefix="$"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SliderInput
                                    label="Loan Term"
                                    value={loanTerm}
                                    onChange={setLoanTerm}
                                    min={5}
                                    max={30}
                                    step={5}
                                    suffix="Yrs"
                                    widthClass="w-28"
                                />
                                <SliderInput
                                    label="Interest Rate"
                                    value={interestRate}
                                    onChange={setInterestRate}
                                    min={1}
                                    max={15}
                                    step={0.1}
                                    suffix="%"
                                    widthClass="w-28"
                                />
                            </div>
                        </section>

                        <section className="space-y-3 bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)] flex flex-col">
                            <div className="flex items-center gap-2 text-[var(--text-muted)] font-headline font-bold mb-2">
                                <Landmark className="w-5 h-5" />
                                <span className="text-lg">Monthly Recurring Expenses</span>
                            </div>
                            <div className="flex flex-col gap-4 flex-1 justify-around">
                                <RecurringExpenseInput label="Property Tax" value={propertyTax} onChange={setPropertyTax} min={0} max={Math.floor((homePrice * 0.03) / 12)} />
                                <RecurringExpenseInput label="Insurance" value={insurance} onChange={setInsurance} min={0} max={Math.floor((homePrice * 0.03) / 12)} />
                                <RecurringExpenseInput label="HOA Fees" value={hoaFees} onChange={setHoaFees} min={0} max={Math.floor((homePrice * 0.03) / 12)} />
                            </div>
                        </section>

                        <div className="bg-[var(--bg-card)] p-5 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-main)] flex flex-col justify-between">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1 block">Monthly Payment</span>
                                <div className="text-4xl font-extrabold text-[var(--accent)] font-headline tracking-tighter">
                                    {dollars}<span className="text-xl opacity-60">.{cents}</span>
                                </div>
                                <p className="text-[var(--text-muted)] text-[10px] font-bold">Total monthly commitment</p>
                            </div>

                            <DonutChart principal={principal} principalAndInterest={monthlyPrincipalAndInterest} taxesAndFees={monthlyTaxesAndFees} />

                            <div className="space-y-1.5 mt-2">
                                <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
                                        <span className="text-xs font-bold text-[var(--text-main)]">Principal & Interest</span>
                                    </div>
                                    <span className="font-black text-sm text-[var(--accent)]">{formatCurrencyWithCents(monthlyPrincipalAndInterest)}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[var(--text-muted)] opacity-50"></div>
                                        <span className="text-xs font-bold text-[var(--text-main)]">Taxes & Fees</span>
                                    </div>
                                    <span className="font-black text-sm text-[var(--text-muted)]">{formatCurrencyWithCents(monthlyTaxesAndFees)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--bg-card)] p-5 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-main)] flex flex-col justify-between">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1 block">Lifetime Loan Cost</span>
                                <div className="text-2xl font-extrabold text-[var(--text-main)] font-headline tracking-tighter">
                                    {formatCurrencyWithCents(totalPrincipalPaid + totalInterestPaid)}
                                </div>
                                <p className="text-[var(--text-muted)] text-[10px] font-bold">Total over {loanTerm} years at {interestRate}%</p>
                            </div>

                            <TotalCostDonutChart principal={totalPrincipalPaid} totalInterest={totalInterestPaid} />

                            <div className="space-y-1.5 mt-2">
                                <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
                                        <span className="text-xs font-bold text-[var(--text-main)]">Total Principal</span>
                                    </div>
                                    <span className="font-black text-sm text-[var(--accent)]">{formatCurrencyWithCents(totalPrincipalPaid)}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                        <span className="text-xs font-bold text-[var(--text-main)]">Total Interest</span>
                                    </div>
                                    <span className="font-black text-sm text-rose-500">{formatCurrencyWithCents(totalInterestPaid)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                        <AmortizationTable 
                            schedule={amortizationSchedule}
                            extraPayments={extraPayments}
                            setExtraPayments={setExtraPayments}
                            showAll={showAllPayments}
                            setShowAll={setShowAllPayments}
                            numberOfPayments={numberOfPayments}
                            formatMonthYear={formatMonthYear}
                            formatCurrencyWithCents={formatCurrencyWithCents}
                        />

                        <div className="mt-12 mb-8 max-w-3xl mx-auto w-full">
                            <h3 className="text-xl font-black font-headline text-[var(--text-main)] mb-6 text-center">Frequently Asked Questions</h3>
                            <FAQItem 
                                question="How do I use this mortgage calculator?" 
                                answer="Simply adjust the Home Price, Down Payment, Loan Term, and Interest Rate using the sliders. The calculator automatically estimates your monthly principal and interest. You can also add property taxes, insurance, and HOA fees for a more accurate total monthly commitment."
                            />
                            <FAQItem 
                                question="What is an amortization schedule?" 
                                answer="An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off at the end of its term."
                            />
                            <FAQItem 
                                question="How do extra payments work?" 
                                answer="Entering a value in the 'Extra' column applies that amount directly to your principal balance for that specific month. This reduces the total interest you will pay over the life of the loan and can help you pay off your mortgage months or even years earlier."
                            />
                        </div>
                    </>
                    )}

                    {activeTab === 'auto' && (
                        <>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                <section className="space-y-3 bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)] flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-[var(--accent)] font-headline font-bold">
                                            <Car className="w-5 h-5" />
                                            <span className="text-lg">Core Loan Details</span>
                                        </div>
                                        <button 
                                            onClick={handleAutoReset}
                                            className="flex items-center gap-1.5 text-xs font-black text-[#f5a669] hover:bg-[#f5a669] hover:text-white transition-all uppercase tracking-widest bg-[var(--bg-input)] px-3 py-1 rounded-lg border border-[var(--border-main)] hover:border-[#f5a669]"
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            Reset
                                        </button>
                                    </div>

                                    <SliderInput label="Auto Price" value={autoPrice} onChange={setAutoPrice} min={1000} max={200000} step={500} prefix="$" />
                                    <SliderInput label={`Down Payment (${autoPrice > 0 ? ((autoDownPayment / autoPrice) * 100).toFixed(1) : 0}%)`} value={autoDownPayment} onChange={(val: number) => setAutoDownPayment(Math.round(val))} min={0} max={autoPrice} step={100} prefix="$" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <SliderInput label="Loan Term" value={autoLoanTerm} onChange={setAutoLoanTerm} min={12} max={96} step={12} suffix="Mos" widthClass="w-28" />
                                        <SliderInput label="Interest Rate" value={autoInterestRate} onChange={setAutoInterestRate} min={1} max={20} step={0.1} suffix="%" widthClass="w-28" />
                                    </div>
                                </section>

                                <section className="space-y-3 bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)] flex flex-col">
                                    <div className="flex items-center gap-2 text-[var(--text-muted)] font-headline font-bold mb-2">
                                        <Wallet className="w-5 h-5" />
                                        <span className="text-lg">Trade-in & Fees</span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-1 justify-around">
                                        <SliderInput label="Trade-in Value" value={autoTradeInValue} onChange={setAutoTradeInValue} min={0} max={100000} step={500} prefix="$" />
                                        <SliderInput label="Owed on Trade-in" value={autoAmountOwed} onChange={setAutoAmountOwed} min={0} max={100000} step={500} prefix="$" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <SliderInput label="Sales Tax" value={autoSalesTax} onChange={setAutoSalesTax} min={0} max={15} step={0.1} suffix="%" widthClass="w-24" />
                                            <SliderInput label="Reg. Fees" value={autoRegistrationFees} onChange={setAutoRegistrationFees} min={0} max={5000} step={50} prefix="$" widthClass="w-24" />
                                        </div>
                                        <SliderInput label="Est. Monthly Insurance" value={autoInsurance} onChange={setAutoInsurance} min={0} max={1000} step={10} prefix="$" />
                                    </div>
                                </section>

                                <div className="bg-[var(--bg-card)] p-5 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-main)] flex flex-col justify-between">
                                    <div className="text-center">
                                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1 block">Monthly Payment</span>
                                        <div className="text-4xl font-extrabold text-[var(--accent)] font-headline tracking-tighter">
                                            {autoDollars}<span className="text-xl opacity-60">.{autoCents}</span>
                                        </div>
                                        <p className="text-[var(--text-muted)] text-[10px] font-bold">Total monthly commitment</p>
                                    </div>

                                    <DonutChart principal={autoPrincipal} principalAndInterest={autoMonthlyPrincipalAndInterest} taxesAndFees={autoInsurance} />

                                    <div className="space-y-1.5 mt-2">
                                        <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
                                                <span className="text-xs font-bold text-[var(--text-main)]">Principal & Interest</span>
                                            </div>
                                            <span className="font-black text-sm text-[var(--accent)]">{formatCurrencyWithCents(autoMonthlyPrincipalAndInterest)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)] opacity-50"></div>
                                                <span className="text-xs font-bold text-[var(--text-main)]">Insurance</span>
                                            </div>
                                            <span className="font-black text-sm text-[var(--text-muted)]">{formatCurrencyWithCents(autoInsurance)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[var(--bg-card)] p-5 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-main)] flex flex-col justify-between">
                                    <div className="text-center">
                                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1 block">Lifetime Cost</span>
                                        <div className="text-2xl font-extrabold text-[var(--text-main)] font-headline tracking-tighter">
                                            {formatCurrencyWithCents(autoTotalPrincipalPaid + autoTotalInterestPaid)}
                                        </div>
                                        <p className="text-[var(--text-muted)] text-[10px] font-bold">Total over {autoLoanTerm} months at {autoInterestRate}%</p>
                                    </div>

                                    <TotalCostDonutChart principal={autoTotalPrincipalPaid} totalInterest={autoTotalInterestPaid} />

                                    <div className="space-y-1.5 mt-2">
                                        <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
                                                <span className="text-xs font-bold text-[var(--text-main)]">Total Principal</span>
                                            </div>
                                            <span className="font-black text-sm text-[var(--accent)]">{formatCurrencyWithCents(autoTotalPrincipalPaid)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-main)]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                                <span className="text-xs font-bold text-[var(--text-main)]">Total Interest</span>
                                            </div>
                                            <span className="font-black text-sm text-rose-500">{formatCurrencyWithCents(autoTotalInterestPaid)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AmortizationTable 
                                schedule={autoAmortizationSchedule}
                                extraPayments={autoExtraPayments}
                                setExtraPayments={setAutoExtraPayments}
                                showAll={showAllAutoPayments}
                                setShowAll={setShowAllAutoPayments}
                                numberOfPayments={autoNumberOfPayments}
                                formatMonthYear={formatMonthYear}
                                formatCurrencyWithCents={formatCurrencyWithCents}
                            />

                            <div className="mt-12 mb-8 max-w-3xl mx-auto w-full">
                                <h3 className="text-xl font-black font-headline text-[var(--text-main)] mb-6 text-center">Frequently Asked Questions</h3>
                                <FAQItem 
                                    question="How do I use the auto loan calculator?" 
                                    answer="Enter the vehicle price and adjust your down payment. You can also input your trade-in value, how much you still owe on it, and local sales tax and registration fees. The calculator instantly shows your estimated monthly car payment."
                                />
                                <FAQItem 
                                    question="How does my trade-in affect the loan?" 
                                    answer="If your trade-in is worth more than you owe on it, the difference (trade-in equity) is applied as a credit towards your new vehicle. This reduces the total amount you need to borrow and can lower your sales tax in many states."
                                />
                                <FAQItem 
                                    question="Should I include insurance in my calculation?" 
                                    answer="While insurance is not part of the auto loan itself, it is a required monthly cost of owning a vehicle. Including an estimate helps you understand the true monthly commitment of your purchase."
                                />
                            </div>
                        </>
                    )}
                </main>

                <footer className="w-full mt-12 py-8 border-t border-[var(--border-main)] text-center text-xs text-[var(--text-muted)] font-medium">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
                        <a href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact Us</a>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Better Calculators. All rights reserved.</p>
                </footer>
            </div>

            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--bg-card)] border-t border-[var(--border-main)] flex justify-around p-3 z-50 shadow-lg">
                <button className="flex flex-col items-center gap-0.5 text-[var(--text-muted)]">
                    <LayoutDashboard className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Home</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-[var(--accent)]">
                    <Calculator className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Calc</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-[var(--text-muted)]">
                    <Wallet className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Loans</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-[var(--text-muted)]">
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Profile</span>
                </button>
            </nav>
        </div>
    );
}
