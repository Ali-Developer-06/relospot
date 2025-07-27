import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propertiesData from '../../Data/Properties.json';
import { FiHeart, FiShare2, FiTrash2, FiChevronRight, FiX, FiMapPin } from 'react-icons/fi';

const Saved = () => {
    const navigate = useNavigate();
    const [savedProperties, setSavedProperties] = useState(
        propertiesData.filter(property => property.tags.includes("Saved"))
    );
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);

    // Delete property
    const handleDelete = (id) => {
        setSavedProperties(savedProperties.filter(property => property.id !== id));
    };

    // Share property
    const handleShare = (property) => {
        navigator.clipboard.writeText(
            `Check out this property: ${property.title} - $${property.price.toLocaleString()}`
        );
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
    };

    // View details
    const handleViewDetails = (property) => {
        setSelectedProperty(property);
        setShowModal(true);
    };

return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm py-6">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800">Saved Properties</h1>
                <p className="text-gray-600">
                    {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
                </p>
            </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto py-8 px-4 my-8">
            {savedProperties.length > 0 ? (
            <div className="space-y-6">
                {savedProperties.map(property => (
                <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                        {/* Property Image */}
                        <div className="md:w-1/3">
                            <img 
                                src={property.image} 
                                alt={property.title}
                                className="w-full h-48 md:h-full object-cover"
                            />  
                        </div>
                        {/* Property Details */}
                        <div className="p-6 md:w-2/3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold">{property.title}</h3>
                                    <p className="text-green-700 font-bold text-lg mt-1"> ${property.price.toLocaleString()} </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleDelete(property.id)}
                                        className="p-2 text-gray-400 transition-colors"
                                        aria-label="Remove property">
                                        <FiTrash2 className='cursor-pointer'/>
                                    </button>
                                    <div className="relative">
                                        <button 
                                            onClick={() => handleShare(property)}
                                            className="p-2 text-gray-400 transition-colors"
                                            aria-label="Share property">
                                            <FiShare2 />
                                        </button>
                                        {showShareTooltip && (
                                        <div className="absolute top-full right-0 mt-1 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                            Link copied!
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-3 text-gray-600">
                                <span className="mr-4">{property.beds} Beds</span>
                                <span className="mr-4">{property.baths} Baths</span>
                                <span>{property.sqft.toLocaleString()} sqft</span>
                            </div>
                            <div className="mt-3 flex items-center text-gray-500">
                                <FiMapPin className="mr-1" />
                                <span>{property.location}</span>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <button 
                                    onClick={() => handleViewDetails(property)}
                                    className="flex items-center text-green-700 font-medium cursor-pointer">
                                    View Details <FiChevronRight className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            ) : (
            <div className="text-center py-12">
                <FiHeart className="mx-auto text-gray-300 text-5xl mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No saved properties yet</h3>
                <p className="text-gray-500 mb-6">Save properties you're interested in by clicking the heart icon</p>
                <button 
                    onClick={() => navigate('/properties')}
                    className="bg-green-700 text-white px-6 py-2 rounded-lg">
                    Browse Properties
                </button>
            </div>
        )}
        </div>

        {/* Property Details Modal */}
        {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">{selectedProperty.title}</h3>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="p-1 text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            <img 
                                src={selectedProperty.image} 
                                alt={selectedProperty.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="font-medium">${selectedProperty.price.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Price</div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="font-medium">{selectedProperty.beds}</div>
                                    <div className="text-xs text-gray-500">Beds</div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="font-medium">{selectedProperty.baths}</div>
                                    <div className="text-xs text-gray-500">Baths</div>
                                </div>
                            </div>
                        </div>
                      {/* Right Column */}
                        <div>
                            <h4 className="font-bold mb-2">Description</h4>
                            <p className="text-gray-700 mb-4">{selectedProperty.description || 'No description available'}</p>

                            {selectedProperty.tags && selectedProperty.tags.length > 0 && (
                                <>
                                    <h4 className="font-bold mb-2">Features</h4>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedProperty.tags.map((tag, index) => (
                                            <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="flex items-center text-gray-700 mb-4">
                                <FiMapPin className="mr-2" />
                                <span>{selectedProperty.location}</span>
                            </div>

                            <div className="flex space-x-3">
                                <button 
                                    onClick={() => navigate('/contact')}
                                    className="flex-1 bg-green-700 text-white py-2 rounded-lg">
                                    Contact Agent
                                </button>
                                <button 
                                    onClick={() => handleShare(selectedProperty)}
                                    className="flex items-center justify-center px-4 border border-gray-300 rounded-lg hover:bg-gray-100">
                                    <FiShare2 className="mr-2" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </div>
);
};

export default Saved;