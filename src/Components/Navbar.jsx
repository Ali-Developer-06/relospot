import { useState } from 'react';
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiSearch, FiHeart, FiUser, FiMenu, FiX,FiBriefcase, FiMessageSquare } from 'react-icons/fi';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

const navItems = [
    { path: '/', name: 'Home', icon: <FiHome className="mr-1" /> },
    { path: '/properties', name: 'Properties', icon: <FiSearch className="mr-1" /> },
    { path: '/jobs', name: 'Jobs', icon: <FiBriefcase className="mr-1" /> },
    // { path: '/saved', name: 'Saved', icon: <FiHeart className="mr-1" /> },
    { path: '/contact', name: 'Contact', icon: <FiMessageSquare className="mr-1" /> },
    { path: '/auth', name: 'Account', icon: <FiUser className="mr-1" /> }
];

return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div
                className="cursor-pointer" 
                onClick={() => navigate('/')}
                >
                    <img src={logo} className='w-20' alt="" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6"> {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg transition-colors 
                    ${ isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                        if (item.path === '/auth') {
                        navigate('/auth', { state: { authType: 'login' }});
                        }}}>
                    {item.icon}{item.name}
                </NavLink>))}
            </nav>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden p-2 text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"> {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
                <div className="container mx-auto px-4 py-3 flex flex-col space-y-2"> {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                        setMobileMenuOpen(false);
                        if (item.path === '/auth') {
                            navigate('/auth', { state: { authType: 'login' } });
                        }}}
                        className={({ isActive }) => `flex items-center px-3 py-3 rounded-lg transition-colors
                        ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-100'}`}>
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                    </NavLink>
                    ))}
                </div>
            </div>
        )}
    </header>
);
};

export default Navbar;