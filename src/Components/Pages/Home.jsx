import React from 'react';
import { FiSearch, FiMapPin, FiHeart } from 'react-icons/fi';

const Home = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Condo in Miami, FL",
      price: "$750,000",
      beds: 3,
      baths: 2,
      sqft: "2,100 sqft",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Suburban Home in Austin, TX",
      price: "$450,000",
      beds: 4,
      baths: 3,
      sqft: "2,800 sqft",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "Modern Townhouse in Seattle, WA",
      price: "$620,000",
      beds: 3,
      baths: 2.5,
      sqft: "1,950 sqft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-6">
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
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <FiSearch className="mr-1" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                  <button className="text-gray-400 hover:text-red-500"><FiHeart /></button>
                </div>
                <p className="text-blue-600 font-bold text-lg mt-2">{property.price}</p>
                <div className="flex mt-4 text-gray-600">
                  <span className="mr-4">{property.beds} Beds</span>
                  <span className="mr-4">{property.baths} Baths</span>
                  <span>{property.sqft}</span>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                View Details</button>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">US Estates</h2>
              <p className="text-gray-400">America's most trusted real estate platform since 2015.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Listings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +1 (555) 123-4567</li>
                <li>✉️ support@usestates.com</li>
                <li>🏢 123 Main St, Austin, TX</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-lg outline-none w-full"/>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 US Estates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;