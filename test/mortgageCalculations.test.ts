
/**
 * Mortgage Calculation Verification Test
 * Standard Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
 */

function calculateMonthlyPayment(principal: number, interestRate: number, loanTerm: number) {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyInterestRate === 0) return principal / numberOfPayments;
    if (numberOfPayments === 0) return 0;
    
    return principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
}

function runTests() {
    console.log("--- Mortgage Calculator Logic Verification ---");

    const tests = [
        {
            name: "Standard 30-Year Fixed (400k loan, 5%)",
            principal: 400000,
            rate: 5.0,
            term: 30,
            expected: 2147.29
        },
        {
            name: "15-Year Fixed (240k loan, 7.5%)",
            principal: 240000,
            rate: 7.5,
            term: 15,
            expected: 2224.51
        },
        {
            name: "Low Interest (100k loan, 2%, 10yr)",
            principal: 100000,
            rate: 2.0,
            term: 10,
            expected: 920.13
        }
    ];

    let passedCount = 0;

    tests.forEach(t => {
        const actual = calculateMonthlyPayment(t.principal, t.rate, t.term);
        const diff = Math.abs(actual - t.expected);
        const passed = diff < 0.05; // Allowing for slight rounding differences in benchmarks

        if (passed) passedCount++;

        console.log(`\n[${passed ? 'PASS' : 'FAIL'}] ${t.name}`);
        console.log(`  Expected: $${t.expected}`);
        console.log(`  Actual:   $${actual.toFixed(2)}`);
    });

    console.log(`\n--- Results: ${passedCount}/${tests.length} Passed ---`);
}

runTests();
