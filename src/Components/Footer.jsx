import React from 'react'

const Footer = () => {
    return (
        <>
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
                                <input type="email" placeholder="Your Email" className="bg-gray-700 text-white px-4 py-2 rounded-l-lg outline-none w-full"/>
                                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2023 US Estates. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer