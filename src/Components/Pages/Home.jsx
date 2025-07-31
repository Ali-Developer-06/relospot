import { useState } from 'react';
import jobsData from '../../Data/Jobs.json';
import { useNavigate } from 'react-router-dom';
import propertiesData from '../../Data/Properties.json';
import { FiHeart, FiSearch, FiMapPin, FiHome, FiBriefcase, FiCalendar } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [savedItems, setSavedItems] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    jobType: '',
    salaryRange: '',
    searchQuery: ''
  });

  // Combined filtering function
  const filterItems = () => {
    if (activeTab === 'properties') {
      return propertiesData.filter(property => {
        const matchesLocation = !filters.location || 
          property.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesType = !filters.propertyType || 
          property.tags.includes(filters.propertyType);
        const matchesPrice = !filters.priceRange || (
          (filters.priceRange === '$200K - $500K' && property.price >= 200000 && property.price <= 500000) ||
          (filters.priceRange === '$500K - $1M' && property.price > 500000 && property.price <= 1000000) ||
          (filters.priceRange === '$1M+' && property.price > 1000000)
        );
        const matchesSearch = !filters.searchQuery ||
          property.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

        return matchesLocation && matchesType && matchesPrice && matchesSearch;
      });
    } else {
      return jobsData.filter(job => {
        const matchesLocation = !filters.location || 
          job.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesType = !filters.jobType || 
          job.jobType === filters.jobType;
        const matchesSalary = !filters.salaryRange || (
          (filters.salaryRange === '$50K - $80K' && job.salary.includes('$50')) ||
          (filters.salaryRange === '$80K - $120K' && job.salary.includes('$80')) ||
          (filters.salaryRange === '$120K+' && job.salary.includes('$120'))
        );
        const matchesSearch = !filters.searchQuery ||
          job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.searchQuery.toLowerCase());

        return matchesLocation && matchesType && matchesSalary && matchesSearch;
      });
    }
  };

  const filteredItems = filterItems();

  const toggleSaved = (id) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-white py-20 px-6 bg-green-700">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {activeTab === 'properties' ? 'Find Your Dream Home' : 'Discover Real Estate Careers'}
          </h1>
          <p className="text-xl mb-8">
            {activeTab === 'properties' 
              ? 'Search from 1M+ listings nationwide' 
              : '10K+ job opportunities waiting'}
          </p>

          {/* Tab Switch */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-green-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('properties')}
                className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'properties' ? 'bg-white text-green-700' : 'text-white'}`}>
                <FiHome className="mr-2" /> Properties
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'jobs' ? 'bg-white text-green-700' : 'text-white'}`}>
                <FiBriefcase className="mr-2" /> Jobs
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row">
            <div className="flex-1 flex items-center p-2 border-b md:border-b-0 md:border-r">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder={activeTab === 'properties' ? "Search properties..." : "Search jobs..."}
                className="w-full outline-none text-gray-700"
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
              />
            </div>
            <div className="flex-1 flex items-center p-2 border-b md:border-b-0 md:border-r">
              <FiMapPin className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-gray-700"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            {activeTab === 'properties' ? (
              <select
                className="p-2 border-b md:border-b-0 md:border-r text-gray-700"
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}>
                <option value="">All Types</option>
                <option>Single Family</option>
                <option>Condo</option>
                <option>Townhouse</option>
              </select>
            ) : (
              <select
                className="p-2 border-b md:border-b-0 md:border-r text-gray-700"
                value={filters.jobType}
                onChange={(e) => setFilters({...filters, jobType: e.target.value})}>
                <option value="">All Job Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            )}
            <select
              className="p-2 text-gray-700"
              value={activeTab === 'properties' ? filters.priceRange : filters.salaryRange}
              onChange={(e) => setFilters({
                ...filters,
                [activeTab === 'properties' ? 'priceRange' : 'salaryRange']: e.target.value
              })}>
              <option value="">All Ranges</option>
              {activeTab === 'properties' ? (
                <>
                  <option>$200K - $500K</option>
                  <option>$500K - $1M</option>
                  <option>$1M+</option>
                </>
              ) : (
                <>
                  <option>$50K - $80K</option>
                  <option>$80K - $120K</option>
                  <option>$120K+</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {activeTab === 'properties' ? 'Featured Properties' : 'Featured Jobs'}
        </h2>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {activeTab === 'properties' ? 'properties' : 'jobs'} match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div key={`${activeTab}-${item.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {activeTab === 'properties' ? (
                  <>
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <button 
                          onClick={() => toggleSaved(`property-${item.id}`)}
                          className={`p-1 ${savedItems.includes(`property-${item.id}`) ? 'text-red-500' : 'text-gray-400'}`}>
                          <FiHeart className={savedItems.includes(`property-${item.id}`) ? 'fill-current' : ''} />
                        </button>
                      </div>
                      <p className="text-green-700 font-bold text-lg mt-2">${item.price.toLocaleString()}</p>
                      <div className="flex mt-4 text-gray-600">
                        <span className="mr-4">{item.beds} Beds</span>
                        <span className="mr-4">{item.baths} Baths</span>
                        <span>{item.sqft.toLocaleString()} sqft</span>
                      </div>
                      <div className="mt-3 flex items-center text-gray-500">
                        <FiMapPin className="mr-1" />
                        <span>{item.location}</span>
                      </div>
                      <button
                        onClick={() => navigate('/properties')}
                        className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                        View Details
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <button 
                        onClick={() => toggleSaved(`job-${item.id}`)}
                        className={`p-1 ${savedItems.includes(`job-${item.id}`) ? 'text-red-500' : 'text-gray-400'}`}>
                        <FiHeart className={savedItems.includes(`job-${item.id}`) ? 'fill-current' : ''} />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">{item.company}</p>
                    <p className="text-green-700 font-medium mt-2">{item.salary}</p>
                    <div className="flex items-center text-gray-500 mt-3">
                      <FiMapPin className="mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mt-2">
                      <FiCalendar className="mr-1" />
                      <span>{item.posted}</span>
                    </div>
                    <button 
                      onClick={() => navigate('/jobs')}
                      className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🏡", title: "Verified Listings", desc: "100% authentic properties and jobs" },
              { icon: "📊", title: "Market Leader", desc: "Largest real estate network in US" },
              { icon: "🤝", title: "Trusted Partners", desc: "Professional brokers and employers" }
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

      {/* Trending Markets Section */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Trending Markets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Austin, TX", stats: "12K+ Properties | 1K+ Jobs", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35" },
            { name: "Miami, FL", stats: "8K+ Properties | 800+ Jobs", img: "https://images.unsplash.com/photo-1511268559489-34b624fbfcf5" },
            { name: "Seattle, WA", stats: "6K+ Properties | 600+ Jobs", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b" },
            { name: "Denver, CO", stats: "5K+ Properties | 500+ Jobs", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df" }
          ].map((city, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={city.img} alt={city.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <div>
                  <h3 className="text-white text-2xl font-bold">{city.name}</h3>
                  <p className="text-white">{city.stats}</p>
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