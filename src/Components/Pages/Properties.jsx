import { useState } from 'react';
import Calculator from './Calculator';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiFilter, FiHeart } from 'react-icons/fi';
import propertiesData from '../../Data/Properties.json';

const Properties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState(propertiesData);
    const [savedProperties, setSavedProperties] = useState([]);

    const toggleSaved = (id) => {
        if (savedProperties.includes(id)) {
            setSavedProperties(savedProperties.filter(item => item !== id));
        } else {
            setSavedProperties([...savedProperties, id]);
        }
    };

// State for filters
const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    beds: '',
    location: ''
});


// Apply filters
const applyFilters = () => {
    const results = featuredProperties.filter(property => {
        return (
            (filters.minPrice === '' || property.price >= Number(filters.minPrice)) &&
            (filters.maxPrice === '' || property.price <= Number(filters.maxPrice)) &&
            (filters.beds === '' || property.beds >= Number(filters.beds)) &&
            (filters.location === '' || property.location.toLowerCase().includes(filters.location.toLowerCase()))
        );
    });
    setFilteredProperties(results);
};

return (
    <div className="min-h-screen bg-gray-50">
        {/* Search and Filter Section */}
        <div className="bg-white shadow-sm py-6 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Location Search */}
                    <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-4 py-2">
                        <FiMapPin className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="bg-transparent w-full outline-none"
                            value={filters.location}
                            onChange={(e) => setFilters({...filters, location: e.target.value})}
                        />
                    </div>
                    {/* Filters Button */}
                    <button 
                        className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg"
                        onClick={applyFilters}>
                        <FiFilter />
                        Apply Filters
                    </button>
                </div>
                {/* Filter Options (Expanded) */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                        <select 
                            className="w-full p-2 border rounded-lg"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({...filters, minPrice: e.target.value})}>
                            <option value="">Any</option>
                            <option value="100000">$100,000</option>
                            <option value="300000">$300,000</option>
                            <option value="500000">$500,000</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                        <select 
                            className="w-full p-2 border rounded-lg"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}>
                            <option value="">Any</option>
                            <option value="500000">$500,000</option>
                            <option value="1000000">$1M</option>
                            <option value="2000000">$2M</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Beds</label>
                        <select 
                            className="w-full p-2 border rounded-lg"
                            value={filters.beds}
                            onChange={(e) => setFilters({...filters, beds: e.target.value})}>
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Property Listing */}
        <div className="container mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Properties</h2>
            <div  iv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                    <div key={property.id} 
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img 
                            src={property.image} 
                            alt={property.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                                <button 
                                    onClick={() => toggleSaved(property.id)}
                                    className={`p-1 ${savedProperties.includes(property.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                                    <FiHeart className={savedProperties.includes(property.id) ? 'fill-current' : ''} />
                                </button>
                            </div>
                            <p className="text-green-700 font-bold text-lg mt-2"> ${property.price.toLocaleString()} </p>
                            <div className="flex mt-4 text-gray-600">
                                <span className="mr-4">{property.beds} Beds</span>
                                <span className="mr-4">{property.baths} Baths</span>
                                <span>{property.sqft.toLocaleString()} sqft</span>
                            </div>
                            <div className="mt-3 flex items-center text-gray-500"> 
                                <FiMapPin className="mr-1" />
                                <span>{property.location}</span>
                            </div>
                            {property.tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {property.tags.map(tag => (
                                        <span key={tag} 
                                            className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

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