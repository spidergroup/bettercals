import React, { useState, useMemo } from 'react';
import { Bell, Home, Landmark, ChevronUp, Download, LayoutDashboard, Calculator, Wallet, User, Menu, X, RotateCcw } from 'lucide-react';

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
                <label className="text-xs font-bold text-slate-300 font-label">{label}</label>
                <div className="relative">
                    {prefix && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">{prefix}</span>}
                    <input
                        className={`${prefix ? 'pl-6' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'} py-1 bg-slate-950 border border-slate-800 rounded-lg text-right font-headline font-black text-emerald-400 ${widthClass} text-sm focus:ring-2 focus:ring-emerald-400/20 focus:outline-none`}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />
                    {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">{suffix}</span>}
                </div>
            </div>
            <input
                className="w-full accent-emerald-400 h-1.5"
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
        <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/50">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-label">{label}</label>
            <div className="relative flex items-center">
                <span className="text-slate-600 font-black text-sm mr-1">$</span>
                <input
                    className="w-full bg-transparent border-none text-base font-headline font-black text-white p-0 focus:ring-0 outline-none"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </div>
            <input
                className="w-full mt-1 accent-emerald-400 h-1.5"
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
                <span className="text-[10px] font-black text-slate-500 uppercase">Principal</span>
                <span className="text-sm font-black text-white">${principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r={radius} stroke="#1e293b" strokeWidth="6"></circle>
                <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r={radius}
                    stroke="#34d399"
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
                <span className="text-[10px] font-black text-slate-500 uppercase">Total Cost</span>
                <span className="text-sm font-black text-white">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r={radius} stroke="#f43f5e" strokeWidth="6"></circle>
                <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r={radius}
                    stroke="#34d399"
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
        <div className="bg-slate-950 text-slate-100 min-h-screen font-body pb-20 md:pb-0">
            <header className="w-full top-0 sticky z-50 bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-8 py-3 border-b border-slate-800">
                <div className="flex items-center gap-8">
                    <a className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95" href="/">
                        <div className="flex items-center gap-3">
                            <div title="Better Calculators" className="bg-emerald-400 w-10 h-10 flex items-center justify-center rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-emerald-900/20 transform -skew-x-12 translate-x-1/2"></div>
                                <span className="text-xl font-black text-emerald-950 font-headline tracking-tighter relative z-10">BC</span>
                            </div>
                        </div>
                    </a>
                    <nav className="hidden md:flex gap-6 items-center">
                        <a className="text-emerald-400 border-b-2 border-emerald-400 font-headline tracking-tight font-bold text-base transition-colors py-1" href="#">Better Mortgage Calculator</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-slate-400 hover:text-emerald-400 transition-colors" onClick={() => setIsMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 z-[60] bg-slate-950/95 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-between items-center mb-12">
                        <div title="Better Calculators" className="bg-emerald-400 w-10 h-10 flex items-center justify-center rounded-xl">
                            <span className="text-xl font-black text-emerald-950 font-headline tracking-tighter">BC</span>
                        </div>
                        <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-emerald-400 transition-colors">
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-8">
                        <a className="text-emerald-400 font-headline text-2xl font-bold transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Mortgage Calculator</a>
                    </nav>


                </div>
            </div>

            <div className="flex flex-col max-w-[1200px] mx-auto">
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h1 className="text-sm font-bold text-slate-400 font-label">
                            Better Mortgage Calculator is an easy-to-use, smarter tool that lets you instantly see your estimated monthly mortgage payments—no input required. Get quick, accurate insights and plan your home financing with confidence in seconds.
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <section className="space-y-3 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xl flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-emerald-400 font-headline font-bold">
                                    <Home className="w-5 h-5" />
                                    <span className="text-lg">Core Loan Details</span>
                                </div>
                                <button 
                                    onClick={handleReset}
                                    className="flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest bg-slate-950/50 px-3 py-1 rounded-lg border border-slate-800 hover:border-emerald-400/30"
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

                        <section className="space-y-3 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xl flex flex-col">
                            <div className="flex items-center gap-2 text-slate-300 font-headline font-bold mb-2">
                                <Landmark className="w-5 h-5" />
                                <span className="text-lg">Monthly Recurring Expenses</span>
                            </div>
                            <div className="flex flex-col gap-4 flex-1 justify-around">
                                <RecurringExpenseInput label="Property Tax" value={propertyTax} onChange={setPropertyTax} min={0} max={Math.floor((homePrice * 0.03) / 12)} />
                                <RecurringExpenseInput label="Insurance" value={insurance} onChange={setInsurance} min={0} max={Math.floor((homePrice * 0.03) / 12)} />
                                <RecurringExpenseInput label="HOA Fees" value={hoaFees} onChange={setHoaFees} min={0} max={Math.floor((homePrice * 0.03) / 12)} />
                            </div>
                        </section>

                        <div className="bg-slate-900 p-5 rounded-2xl shadow-2xl border border-slate-800 ring-1 ring-slate-800 flex flex-col justify-between">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 block">Monthly Payment</span>
                                <div className="text-4xl font-extrabold text-emerald-400 font-headline tracking-tighter">
                                    {dollars}<span className="text-xl opacity-60">.{cents}</span>
                                </div>
                                <p className="text-slate-400 text-[10px] font-bold">Total monthly commitment</p>
                            </div>

                            <DonutChart principal={principal} principalAndInterest={monthlyPrincipalAndInterest} taxesAndFees={monthlyTaxesAndFees} />

                            <div className="space-y-1.5 mt-2">
                                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                        <span className="text-xs font-bold text-slate-200">Principal & Interest</span>
                                    </div>
                                    <span className="font-black text-sm text-emerald-400">{formatCurrencyWithCents(monthlyPrincipalAndInterest)}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                        <span className="text-xs font-bold text-slate-200">Taxes & Fees</span>
                                    </div>
                                    <span className="font-black text-sm text-slate-400">{formatCurrencyWithCents(monthlyTaxesAndFees)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-5 rounded-2xl shadow-2xl border border-slate-800 ring-1 ring-slate-800 flex flex-col justify-between">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 block">Lifetime Loan Cost</span>
                                <div className="text-2xl font-extrabold text-white font-headline tracking-tighter">
                                    {formatCurrencyWithCents(totalPrincipalPaid + totalInterestPaid)}
                                </div>
                                <p className="text-slate-400 text-[10px] font-bold">Total over {loanTerm} years at {interestRate}%</p>
                            </div>

                            <TotalCostDonutChart principal={totalPrincipalPaid} totalInterest={totalInterestPaid} />

                            <div className="space-y-1.5 mt-2">
                                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                        <span className="text-xs font-bold text-slate-200">Total Principal</span>
                                    </div>
                                    <span className="font-black text-sm text-emerald-400">{formatCurrencyWithCents(totalPrincipalPaid)}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                        <span className="text-xs font-bold text-slate-200">Total Interest</span>
                                    </div>
                                    <span className="font-black text-sm text-rose-500">{formatCurrencyWithCents(totalInterestPaid)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 border border-slate-800 shadow-2xl p-6 rounded-2xl bg-slate-900">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-black font-headline tracking-tight text-white">Amortization Schedule</h2>
                                <p className="text-slate-500 text-xs font-medium">Repayment roadmap breakdown</p>
                            </div>

                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-800">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-slate-950 border-b border-slate-800">
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Period</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Date</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Starting</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Payment</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Principal</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Interest</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Extra</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0">Total Principal</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label border-r border-slate-800/50 last:border-r-0 text-center">Total Interest</th>
                                        <th className="px-3 py-3 text-xs font-black text-emerald-400 uppercase tracking-widest font-label text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {(showAllPayments ? amortizationSchedule : amortizationSchedule.slice(0, 3)).map((row) => (
                                        <tr key={row.period} className="hover:bg-slate-800/40 transition-colors">
                                            <td className="px-3 py-3 font-bold text-sm text-slate-500 border-r border-slate-800 last:border-r-0">{row.period}</td>
                                            <td className="px-3 py-3 font-bold text-sm text-slate-200 border-r border-slate-800 last:border-r-0">{formatMonthYear(row.date)}</td>
                                            <td className="px-3 py-3 text-sm text-slate-400 border-r border-slate-800 last:border-r-0">{formatCurrencyWithCents(row.startingBalance)}</td>
                                            <td className="px-3 py-3 font-black text-sm text-slate-100 border-r border-slate-800 last:border-r-0">{formatCurrencyWithCents(row.payment)}</td>
                                            <td className="px-3 py-3 text-emerald-400 font-bold text-sm border-r border-slate-800 last:border-r-0">{formatCurrencyWithCents(row.principalPayment)}</td>
                                            <td className="px-3 py-3 text-rose-400 font-bold text-sm border-r border-slate-800 last:border-r-0">{formatCurrencyWithCents(row.interestPayment)}</td>
                                            <td className="px-3 py-3 border-r border-slate-800 last:border-r-0">
                                                <div className="relative min-w-[80px]">
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-xs">$</span>
                                                    <input
                                                        className="w-full pl-5 pr-2 py-1 text-right text-sm font-black text-slate-200 bg-slate-950 border border-slate-800 rounded-lg focus:ring-1 focus:ring-emerald-400/30 outline-none"
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
                                            <td className="px-3 py-3 font-bold text-sm text-emerald-300 border-r border-slate-800 last:border-r-0">{formatCurrencyWithCents(row.totalPrincipal)}</td>
                                            <td className="px-3 py-3 font-bold text-sm text-rose-400 text-center border-r border-slate-800 last:border-r-0">{formatCurrencyWithCents(row.totalInterest)}</td>
                                            <td className="px-3 py-3 font-black text-sm text-right text-slate-200">{formatCurrencyWithCents(row.endingBalance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => setShowAllPayments(!showAllPayments)}
                                className="text-sm font-black text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                {showAllPayments ? 'Show Less' : `View All ${numberOfPayments} Payments`}
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 flex justify-around p-3 z-50">
                <button className="flex flex-col items-center gap-0.5 text-slate-500">
                    <LayoutDashboard className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Home</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-emerald-400">
                    <Calculator className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Calc</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-slate-500">
                    <Wallet className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Loans</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-slate-500">
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase">Profile</span>
                </button>
            </nav>
        </div>
    );
}
