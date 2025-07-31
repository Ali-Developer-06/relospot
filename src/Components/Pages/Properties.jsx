import Calculator from './Calculator';
import { useNavigate } from 'react-router-dom';
import PropertyListings from './PropertyListings';

const Properties = () => {
    const navigate = useNavigate();
return (
    <div className="min-h-screen bg-gray-50">

        {/* Property Listing */}
        <PropertyListings />

        {/* MortgageCalculator */}
        <Calculator />

        {/* Contact Realtor */}
        <div className="bg-green-700 text-white py-8 px-4">
            <div className="container mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Can't Find Your Dream Home?</h3>
                <p className="mb-6">Our agents will help you discover off-market properties</p>
                <button 
                    onClick={() => navigate('/contact')}
                    className="bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Contact Realtor
                </button>
            </div>
        </div>

    </div>
    );
};

export default Properties;