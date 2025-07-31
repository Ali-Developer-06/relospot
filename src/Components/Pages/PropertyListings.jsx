import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import properties from '../../Data/Properties.json';
import { FiMapPin, FiFilter, FiX } from 'react-icons/fi';

const PropertyListings = () => {
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        beds: '',
        baths: '',
        tags: []
    });

    const [filteredProperties, setFilteredProperties] = useState(properties);

    // Apply filters whenever filter state changes
    useEffect(() => {
        applyFilters();
    }, [filters]);

    const applyFilters = () => {
        const filtered = properties.filter(property => {
            // Location filter (case insensitive)
            const matchesLocation = !filters.location || 
                property.location.toLowerCase().includes(filters.location.toLowerCase());

            // Price range filter
            const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
            const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
            const matchesPrice = property.price >= minPrice && property.price <= maxPrice;

            // Bedrooms filter
            const matchesBeds = !filters.beds || property.beds >= parseInt(filters.beds);

            // Bathrooms filter
            const matchesBaths = !filters.baths || property.baths >= parseInt(filters.baths);

            // Features/Tags filter
            const matchesTags = !filters.tags?.length || filters.tags.every(tag => property.tags.includes(tag));
            return matchesLocation && matchesPrice && matchesBeds && matchesBaths && matchesTags;
        });

        setFilteredProperties(filtered);
    }

return (
    <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            {/* Search Input */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by city, neighborhood or ZIP"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={filters.location}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                    {filters.location && (
                        <button 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setFilters({...filters, location: ''})}>
                            <FiX className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
                <button 
                    className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg transition-colors"
                    onClick={() => setShowFilters(!showFilters)}>
                    <FiFilter />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
                <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <div className="grid grid-cols-2 gap-3">
                                <select 
                                    className="w-full p-2 border rounded-lg"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}>
                                    <option value="">Min</option>
                                    <option value="100000">$100k</option>
                                    <option value="300000">$300k</option>
                                    <option value="500000">$500k</option>
                                </select>
                                <select 
                                    className="w-full p-2 border rounded-lg"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}>
                                    <option value="">Max</option>
                                    <option value="500000">$500k</option>
                                    <option value="1000000">$1M</option>
                                    <option value="2000000">$2M</option>
                                </select>
                            </div>
                        </div>

                        {/* Bedrooms */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
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

                        {/* Bathrooms */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                            <select 
                                className="w-full p-2 border rounded-lg"
                                value={filters.baths}
                                onChange={(e) => setFilters({...filters, baths: e.target.value})}>
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                            </select>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                            <div className="flex flex-wrap gap-2">
                                {['Pool', 'Waterfront'].map(feature => (
                                    <button
                                        key={feature}
                                        className={`px-3 py-1 text-sm rounded-full ${
                                            filters.tags?.includes(feature) 
                                                ? 'bg-green-100 text-green-700 border border-green-300' 
                                                : 'bg-gray-100 text-gray-700 border border-gray-300'
                                        }`}
                                        onClick={() => {
                                            const newTags = filters.tags?.includes(feature)
                                                ? filters.tags.filter(t => t !== feature)
                                                : [...(filters.tags || []), feature];
                                            setFilters({...filters, tags: newTags});
                                        }}>
                                        {feature}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button 
                            className="text-gray-600 hover:text-gray-900 px-4 py-2"
                            onClick={() => setFilters({
                                location: '',
                                minPrice: '',
                                maxPrice: '',
                                beds: '',
                                baths: '',
                                tags: []
                            })}>
                            Reset All
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold">{property.title}</h3>
                            <p className="text-lg font-bold text-green-700">${property.price.toLocaleString()}</p>
                        </div>
                        <p className="text-gray-600 mt-1">{property.location}</p>

                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                            <span>{property.beds} beds</span>
                            <span>{property.baths} baths</span>
                            <span>{property.sqft} sqft</span>
                        </div>

                        {property.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {property.tags.map(tag => (
                                    <span key={tag} className="bg-green-100 text-green-700 font-medium text-xs px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <button 
                            onClick={() => navigate(`/property/${property.id}`)}
                            className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {filteredProperties.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties match your search criteria</p>
                <button 
                    className="mt-4 text-green-700 hover:underline"
                    onClick={() => setFilters({
                        location: '',
                        minPrice: '',
                        maxPrice: '',
                        beds: '',
                        baths: '',
                        tags: []
                    })}>
                    Clear all filters
                </button>
            </div>
        )}
    </div>
);
};

export default PropertyListings;