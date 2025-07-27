import { useState } from 'react';
import { FiMapPin, FiDollarSign, FiCalendar, FiX, FiUser, FiMail, FiPhone, FiFileText } from 'react-icons/fi';

const Jobs = () => {
    const allJobs = [
        {
            id: 1,
            title: "Licensed Real Estate Agent",
            company: "Prestige Properties",
            salary: "$90,000 - $150,000/yr",
            location: "Miami, FL",
            type: "Commission",
            posted: "New",
            description: "Join our elite team serving high-net-worth clients. Minimum 3 years experience required.",
            logo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&h=100&q=60"
        },
        {
            id: 2,
            title: "Commercial Property Manager",
            company: "Urban Spaces Group",
            salary: "$75,000 + Bonuses",
            location: "Austin, TX",
            type: "Full-time",
            posted: "2 days ago",
            description: "Manage Class A office buildings. CAM certification preferred.",
            logo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&h=100&q=60"
        },
        {
            id: 3,
            title: "Real Estate Marketing Specialist",
            company: "Luxury Listings Inc",
            salary: "$65,000 - $85,000/yr",
            location: "Remote",
            type: "Part-time",
            posted: "1 week ago",
            description: "Digital marketing for luxury properties. Social media experience required.",
            logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&h=100&q=60"
        }
    ];

    // State management
    const [jobs, setJobs] = useState(allJobs);
    const [filters, setFilters] = useState({
        searchTerm: '',
        jobType: 'all',
        salaryRange: 'all'
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplication, setShowApplication] = useState(false);
    const [application, setApplication] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null
    });

    // Filter jobs based on criteria
    const applyFilters = () => {
        let filtered = allJobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                job.company.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesType = filters.jobType === 'all' || job.type === filters.jobType;
            const matchesSalary = filters.salaryRange === 'all' || 
                                (filters.salaryRange === 'low' && job.salary.includes("$50k")) ||
                                (filters.salaryRange === 'mid' && job.salary.includes("$80k")) ||
                                (filters.salaryRange === 'high' && job.salary.includes("$120k"));
            return matchesSearch && matchesType && matchesSalary;
        });
        setJobs(filtered);
    };

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
                        Search
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
                            <div>
                                <label className="block text-sm font-medium mb-2">Job Type</label>
                                    <select 
                                        className="w-full p-2 border rounded-lg"
                                        value={filters.jobType}
                                        onChange={(e) => setFilters({...filters, jobType: e.target.value})}>
                                            <option value="all">All Types</option>
                                            <option value="Commission">Commission</option>
                                            <option value="Full-time">Part-time</option>
                                            <option value="Contract">Full-time</option>
                                    </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Salary Range</label>
                                <select 
                                    className="w-full p-2 border rounded-lg"
                                    value={filters.salaryRange}
                                    onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}>
                                        <option value="all">All Ranges</option>
                                        <option value="low">$50k - $80k</option>
                                        <option value="mid">$80k - $120k</option>
                                        <option value="high">$120k+</option>
                                </select>
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
                            <p className="text-gray-600">Showing {jobs.length} jobs</p>
                        </div>
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
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                    {job.type}
                                                </span>
                                            </div>
                                            <div className="mt-3 flex flex-wrap gap-4">
                                                <div className="flex items-center text-gray-600">
                                                    <FiMapPin className="mr-2 text-green-700" />
                                                    <span>{job.location}</span>
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