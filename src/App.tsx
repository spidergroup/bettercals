import React, { useState, useMemo } from 'react';
import { Bell, Home, Landmark, ChevronUp, Download, LayoutDashboard, Calculator, Wallet, User, Menu, X, RotateCcw, Sun, Moon } from 'lucide-react';

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

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const [homePrice, setHomePrice] = useState(500000);
    const [downPayment, setDownPayment] = useState(100000);
    const [loanTerm, setLoanTerm] = useState(30);
    const [interestRate, setInterestRate] = useState(5.0);

    const [propertyTax, setPropertyTax] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [hoaFees, setHoaFees] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAllPayments, setShowAllPayments] = useState(false);
    const [extraPayments, setExtraPayments] = useState<{ [key: number]: number }>({});
    
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
                        <a className="text-[var(--accent)] border-b-2 border-[var(--accent)] font-headline tracking-tight font-bold text-base transition-colors py-1" href="#">Better Mortgage Calculator</a>
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
                        <a className="text-[var(--accent)] font-headline text-2xl font-bold transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Mortgage Calculator</a>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col max-w-[1200px] mx-auto">
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h1 className="text-sm font-bold text-[var(--text-muted)] font-label">
                            Better Mortgage Calculator is an easy-to-use, smarter tool that lets you instantly see your estimated monthly mortgage payments—no input required. Get quick, accurate insights and plan your home financing with confidence in seconds.
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <section className="space-y-3 bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-main)] shadow-[var(--card-shadow)] flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-[var(--accent)] font-headline font-bold">
                                    <Home className="w-5 h-5" />
                                    <span className="text-lg">Core Loan Details</span>
                                </div>
                                <button 
                                    onClick={handleReset}
                                    className="flex items-center gap-1.5 text-xs font-black text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-widest bg-[var(--bg-input)] px-3 py-1 rounded-lg border border-[var(--border-main)] hover:border-[var(--accent)]/30"
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
                                    {(showAllPayments ? amortizationSchedule : amortizationSchedule.slice(0, 3)).map((row) => (
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
                                                                setExtraPayments(prev => ({ ...prev, [row.period]: num }));
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
                                onClick={() => setShowAllPayments(!showAllPayments)}
                                className="text-sm font-black text-[var(--accent)] hover:scale-105 transition-all"
                            >
                                {showAllPayments ? 'Show Less' : `View All ${numberOfPayments} Payments`}
                            </button>
                        </div>
                    </div>
                </main>
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
