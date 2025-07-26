import { useState } from 'react';
import propertiesData from '../../Data/Properties.json';
import { FiHeart, FiSearch, FiMapPin } from 'react-icons/fi';

const Home = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [savedProperties, setSavedProperties] = useState([]);

  const toggleSaved = (id) => {
    if (savedProperties.includes(id)) {
      setSavedProperties(savedProperties.filter(item => item !== id));
    } else {
      setSavedProperties([...savedProperties, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-white py-20 px-6 bg-green-700">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home in the USA</h1>
          <p className="text-xl mb-8">Search from 1M+ listings coast to coast</p>
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row">
            <div className="flex-1 flex items-center p-2 border-b md:border-b-0 md:border-r">
              <FiMapPin className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="City, State, or ZIP (e.g., Austin, TX)" 
                className="w-full outline-none text-gray-700"
              />
            </div>
            <select className="p-2 border-b md:border-b-0 md:border-r text-gray-700">
              <option>Property Type</option>
              <option>Single Family</option>
              <option>Condo</option>
              <option>Townhouse</option>
            </select>
            <select className="p-2 text-gray-700">
              <option>Price Range</option>
              <option>$200K - $500K</option>
              <option>$500K - $1M</option>
              <option>$1M+</option>
            </select>
            <button className="bg-green-700 text-white p-2 rounded-lg flex items-center justify-center">
              <FiSearch className="mr-1" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                    className={`p-1 ${savedProperties.includes(property.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <FiHeart className={savedProperties.includes(property.id) ? 'fill-current' : ''} />
                  </button>
                </div>
                <p className="text-green-700 font-bold text-lg mt-2">
                  ${property.price.toLocaleString()}
                </p>
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
                      <span key={tag} className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full text-xs">
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

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏡", 
                title: "MLS Verified", 
                desc: "Direct access to MLS listings"
              },
              {
                icon: "📊", 
                title: "Market Analytics", 
                desc: "Local price trends & forecasts"
              },
              {
                icon: "🤝", 
                title: "Realtor Network", 
                desc: "Trusted professionals nationwide"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Markets */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Trending Markets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Austin, TX", properties: "12K+", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            { name: "Miami, FL", properties: "8K+", img: "https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            { name: "Seattle, WA", properties: "6K+", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            { name: "Denver, CO", properties: "5K+", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
          ].map((city, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={city.img} alt={city.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <div>
                  <h3 className="text-white text-2xl font-bold">{city.name}</h3>
                  <p className="text-white">{city.properties} Properties</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;