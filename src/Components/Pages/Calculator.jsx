import { useState } from 'react';
import { FiDollarSign, FiPercent, FiCalendar } from 'react-icons/fi';

const Calculator = () => {
    const [homePrice, setHomePrice] = useState(500000);
    const [downPayment, setDownPayment] = useState(20);
    const [interestRate, setInterestRate] = useState(3.5);
    const [loanTerm, setLoanTerm] = useState(30);

// Calculation logic
const calculatePayment = () => {
    const principal = homePrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
        (Math.pow(1 + monthlyRate, payments) - 1)
    ).toFixed(2);
};

return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border max-w-3xl mx-auto my-8 border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
            <h3 className="font-bold text-lg flex items-center gap-2"> <FiDollarSign className="text-white" /> Mortgage Calculator </h3>
        </div>

      {/* Calculator Body */}
        <div className="p-5 space-y-4">
            {/* Home Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                        type="number"
                        value={homePrice}
                        onChange={(e) => setHomePrice(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Down Payment */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"> Down Payment ({downPayment}%) </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"> % </span>
                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <input
                    type="range"
                    min="5"
                    max="50"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Interest Rate */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"> Interest Rate ({interestRate}%) </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"> 
                        <FiPercent size={14} /> </span>
                    <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Loan Term */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"> Loan Term ({loanTerm} years) </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <FiCalendar size={14} /></span>
                    <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="15">15 years</option>
                        <option value="20">20 years</option>
                        <option value="30">30 years</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center">
                    <span className="font-medium">Monthly Payment:</span>
                    <span className="text-2xl font-bold text-blue-600"> ${calculatePayment()} </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                    <p>Principal & Interest only</p>
                    <p>Taxes and insurance not included</p>
                </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                Get Pre-Approved</button>
        </div>
    </div>
);
};

export default Calculator;