import { useState, useEffect } from 'react';
import allJobs from '../../Data/Jobs.json'
import { FiMapPin, FiDollarSign, FiCalendar, FiX, FiUser, FiMail, FiPhone, FiFileText, FiSearch } from 'react-icons/fi';

const Jobs = () => {
    const [jobs, setJobs] = useState(allJobs);
    const [filters, setFilters] = useState({
        searchTerm: '',
        jobType: 'all',
        salaryRange: 'all',
        userLocation: null,
        locationInput: '',
        radius: 50
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplication, setShowApplication] = useState(false);
    const [application, setApplication] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null
    });
    const [geocodingError, setGeocodingError] = useState('');
    const [isGeocoding, setIsGeocoding] = useState(false);

    // Calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + 
                   Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515;
        return dist;
    };

    // Geocode city name to coordinates
    const geocodeLocation = async (city) => {
        setIsGeocoding(true);
        setGeocodingError('');
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
            );
            const data = await response.json();
            if (data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
            }
            throw new Error("Location not found");
        } catch (error) {
            setGeocodingError("Could not find location. Try a nearby major city.");
            return null;
        } finally {
            setIsGeocoding(false);
        }
    };

    // Handle location search
    const handleLocationSearch = async () => {
        if (!filters.locationInput.trim()) {
            setFilters({ ...filters, userLocation: null });
            applyFilters();
            return;
        }
        const coords = await geocodeLocation(filters.locationInput);
        if (coords) {
            setFilters({ ...filters, userLocation: coords });
            setGeocodingError('');
        }
    };

    // Filter jobs based on all criteria
    const applyFilters = () => {
        let filtered = allJobs.filter(job => {
            // Search term filter
            const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                                job.company.toLowerCase().includes(filters.searchTerm.toLowerCase());
            
            // Job type filter
            const matchesType = filters.jobType === 'all' || job.type === filters.jobType;
            
            // Salary range filter (simplified)
            const matchesSalary = filters.salaryRange === 'all' || 
                                    (filters.salaryRange === 'low' && parseInt(job.salary.replace(/\D/g, '')) < 80000) ||
                                    (filters.salaryRange === 'mid' && parseInt(job.salary.replace(/\D/g, '')) >= 80000 && 
                                        parseInt(job.salary.replace(/\D/g, '')) < 120000) ||
                                    (filters.salaryRange === 'high' && parseInt(job.salary.replace(/\D/g, '')) >= 120000);
            
            // Distance filter
            let matchesDistance = true;
            if (filters.userLocation && job.coordinates) {
                const distance = calculateDistance(
                    filters.userLocation.lat,
                    filters.userLocation.lng,
                    job.coordinates.lat,
                    job.coordinates.lng
                );
                matchesDistance = distance <= filters.radius;
            }

            return matchesSearch && matchesType && matchesSalary && matchesDistance;
        });
        setJobs(filtered);
    };

    // Auto-apply filters when relevant states change
    useEffect(() => {
        applyFilters();
    }, [filters.searchTerm, filters.jobType, filters.salaryRange, filters.userLocation]);

    // Handle application submission
    const handleApply = (e) => {
        e.preventDefault();
        console.log('Application submitted:', { job: selectedJob, applicant: application });
        setShowApplication(false);
        setApplication({ name: '', email: '', phone: '', resume: null });
        alert('Application submitted successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-green-700 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Real Estate Careers</h1>
                    <p className="text-xl mb-8">Find your perfect role in the property industry</p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg flex">
                        <input
                            type="text"
                            placeholder="Job title, company, or keywords"
                            className="flex-1 p-4 outline-none text-gray-800"
                            value={filters.searchTerm}
                            onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                        />
                        <button 
                            className="bg-green-800 text-white px-6 rounded-r-lg hover:bg-green-900 transition-colors"
                            onClick={applyFilters}>
                            <FiSearch size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto py-12 px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                            <h3 className="font-bold text-lg mb-4">Filter Jobs</h3>
                            <div className="space-y-6">
                                {/* Job Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Job Type</label>
                                    <select 
                                        className="w-full p-2 border rounded-lg"
                                        value={filters.jobType}
                                        onChange={(e) => setFilters({...filters, jobType: e.target.value})}>
                                        <option value="all">All Types</option>
                                        <option value="Commission">Commission</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                    </select>
                                </div>

                                {/* Salary Range Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Salary Range</label>
                                    <select 
                                        className="w-full p-2 border rounded-lg"
                                        value={filters.salaryRange}
                                        onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}>
                                        <option value="all">All Ranges</option>
                                        <option value="low">Under $80k</option>
                                        <option value="mid">$80k - $120k</option>
                                        <option value="high">$120k+</option>
                                    </select>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Near Location (50mi radius)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="City, State"
                                            className="flex-1 p-2 border rounded-lg"
                                            value={filters.locationInput}
                                            onChange={(e) => setFilters({ ...filters, locationInput: e.target.value })}
                                            onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                                        />
                                        <button
                                            type="button"
                                            className="bg-green-700 text-white px-3 rounded-lg hover:bg-green-800 disabled:opacity-50"
                                            onClick={handleLocationSearch}
                                            disabled={isGeocoding}>
                                            {isGeocoding ? '...' : 'Go'}
                                        </button>
                                    </div>
                                    {geocodingError && (
                                        <p className="text-red-500 text-sm mt-1">{geocodingError}</p>
                                    )}
                                    {filters.userLocation && !geocodingError && (
                                        <p className="text-green-700 text-sm mt-1">Filtering within 50 miles of {filters.locationInput}</p>
                                    )}
                                </div>

                                <button 
                                    className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
                                    onClick={applyFilters}>
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="lg:w-3/4">
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Available Positions</h2>
                                <p className="text-gray-600">{jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found</p>
                            </div>
                            
                            {jobs.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No jobs match your filters</p>
                                    <button 
                                        className="mt-4 text-green-700 hover:underline"
                                        onClick={() => {
                                            setFilters({
                                                searchTerm: '',
                                                jobType: 'all',
                                                salaryRange: 'all',
                                                userLocation: null,
                                                locationInput: '',
                                                radius: 50
                                            });
                                        }}>
                                        Clear all filters
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {jobs.map(job => (
                                        <div key={job.id} className="border-b pb-6 last:border-0">
                                            <div className="flex items-start gap-4">
                                                <img 
                                                    src={job.logo} 
                                                    alt={job.company}
                                                    className="w-16 h-16 object-contain border rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-xl font-semibold">{job.title}</h3>
                                                            <p className="text-green-700 font-medium">{job.company}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                                            job.type === 'Commission' ? 'bg-purple-100 text-purple-800' :
                                                            job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {job.type}
                                                        </span>
                                                    </div>
                                                    <div className="mt-3 flex flex-wrap gap-4">
                                                        <div className="flex items-center text-gray-600">
                                                            <FiMapPin className="mr-2 text-green-700" />
                                                            <span>{job.location}</span>
                                                            {filters.userLocation && job.coordinates && (
                                                                <span className="ml-2 text-sm text-gray-500">
                                                                    ({Math.round(calculateDistance(
                                                                        filters.userLocation.lat,
                                                                        filters.userLocation.lng,
                                                                        job.coordinates.lat,
                                                                        job.coordinates.lng
                                                                    ))} mi away)
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <FiDollarSign className="mr-2 text-green-700" />
                                                            <span>{job.salary}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <FiCalendar className="mr-2 text-green-700" />
                                                            <span>{job.posted}</span>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 text-gray-700">{job.description}</p>
                                                    <div className="mt-4 flex gap-3">
                                                        <button 
                                                            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                                                            onClick={() => {
                                                                setSelectedJob(job);
                                                                setShowApplication(true);
                                                            }}>
                                                            Apply Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {showApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Apply for {selectedJob?.title}</h2>
                                <button 
                                    onClick={() => setShowApplication(false)}
                                    className="text-gray-500 hover:text-gray-700">
                                    <FiX size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleApply} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                            value={application.name}
                                            onChange={(e) => setApplication({...application, name: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Email</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                            value={application.email}
                                            onChange={(e) => setApplication({...application, email: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Phone</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                            value={application.phone}
                                            onChange={(e) => setApplication({...application, phone: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Resume</label>
                                    <div className="relative">
                                        <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="file"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                            onChange={(e) => setApplication({...application, resume: e.target.files[0]})}
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;