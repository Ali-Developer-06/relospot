import { useState, useEffect } from 'react';
import properties from '../../Data/Properties.json';
import { useNavigate, useParams } from 'react-router-dom';
import { FiMapPin, FiHome, FiDollarSign, FiLayers, FiX, FiCheck } from 'react-icons/fi';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();    
    const [showPurchaseForm, setShowPurchaseForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [purchaseForm, setPurchaseForm] = useState({
        name: '',
        email: '',
        phone: '',
        paymentMethod: 'credit',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        bankAccount: '',
        bankRouting: '',
        agreeTerms: false
    });

    const property = properties.find(p => p.id === parseInt(id));

    // Smooth scroll prevention when modal is open
    useEffect(() => {
        if (showPurchaseForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showPurchaseForm]);

    const handlePurchaseSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Purchase submitted:', {
                propertyId: property.id,
                buyerInfo: {
                    name: purchaseForm.name,
                    email: purchaseForm.email
                },
                paymentMethod: purchaseForm.paymentMethod,
                amount: property.price
            });
            
            alert('Purchase completed successfully!');
            setShowPurchaseForm(false);
        } catch (error) {
            console.error('Purchase error:', error);
            alert('There was an error processing your purchase');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPurchaseForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const formatCardNumber = (value) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (value) => {
        return value.replace(/^(\d{2})(\d)/g, '$1/$2');
    };

    if (!property) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Property not found</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-4 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors">
                    Back to Listings
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/properties')}
                className="flex items-center gap-2 text-green-700 mb-6 hover:text-green-900 transition-colors">
                ← Back to Properties
            </button>

            {/* Property Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="md:flex">
                    {/* Property Image */}
                    <div className="md:w-1/2">
                        <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-96 md:h-full object-cover"
                        />
                    </div>
                    
                    {/* Property Details */}
                    <div className="p-6 md:p-8 md:w-1/2">
                        <div className="flex flex-col h-full">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                                <p className="text-2xl text-green-700 mt-2 font-medium">${property.price.toLocaleString()}</p>
                                <p className="text-gray-600 mt-1 flex items-center">
                                    <FiMapPin className="mr-2" /> {property.location}
                                </p>
                                
                                <div className="flex flex-wrap gap-4 mt-6">
                                    <div className="flex items-center text-gray-700">
                                        <FiHome className="mr-2 text-green-600" />
                                        {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FiLayers className="mr-2 text-green-600" />
                                        {property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FiDollarSign className="mr-2 text-green-600" />
                                        {property.sqft.toLocaleString()} sqft
                                    </div>
                                </div>
                                
                                {property.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {property.tags.map(tag => (
                                            <span key={tag} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {property.description || 'No detailed description available for this property.'}
                                </p>
                            </div>

                            <div className="mt-auto pt-6">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-medium text-lg mb-3">Make an Offer</h3>
                                    <button 
                                        onClick={() => setShowPurchaseForm(true)}
                                        className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors font-medium">
                                        Purchase Property
                                    </button>
                                    <p className="text-sm text-gray-500 mt-3 text-center">
                                        Secure transaction · No hidden fees
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* Enhanced Purchase Form Modal */}
{showPurchaseForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-8">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Purchase Agreement</h2>
            <p className="text-green-700 font-medium mt-1">
              {property.title} - ${property.price.toLocaleString()}
            </p>
          </div>
          <button 
            onClick={() => setShowPurchaseForm(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Form Container */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          <form onSubmit={handlePurchaseSubmit} className="space-y-5">
            {/* Personal Information */}
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={purchaseForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={purchaseForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={purchaseForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1 pt-4">
              <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg flex items-center justify-center transition-colors ${
                    purchaseForm.paymentMethod === 'credit' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPurchaseForm({...purchaseForm, paymentMethod: 'credit'})}>
                  <div className={`mr-2 text-lg ${
                    purchaseForm.paymentMethod === 'credit' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    💳
                  </div>
                  <span className="font-medium">Credit Card</span>
                </button>
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg flex items-center justify-center transition-colors ${
                    purchaseForm.paymentMethod === 'bank' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPurchaseForm({...purchaseForm, paymentMethod: 'bank'})}>
                  <div className={`mr-2 text-lg ${
                    purchaseForm.paymentMethod === 'bank' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    🏦
                  </div>
                  <span className="font-medium">Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Credit Card Fields */}
            {purchaseForm.paymentMethod === 'credit' && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700">Card Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={formatCardNumber(purchaseForm.cardNumber)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '');
                      if (/^\d*$/.test(value) && value.length <= 16) {
                        setPurchaseForm({...purchaseForm, cardNumber: value});
                      }
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={purchaseForm.cardExpiry}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
                          setPurchaseForm({...purchaseForm, cardExpiry: value});
                        }
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC*</label>
                    <input
                      type="text"
                      name="cardCvc"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={purchaseForm.cardCvc}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value) && value.length <= 4) {
                          setPurchaseForm({...purchaseForm, cardCvc: value});
                        }
                      }}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Fields */}
            {purchaseForm.paymentMethod === 'bank' && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700">Bank Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number*</label>
                  <input
                    type="text"
                    name="bankAccount"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={purchaseForm.bankAccount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number*</label>
                  <input
                    type="text"
                    name="bankRouting"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={purchaseForm.bankRouting}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 flex items-start">
                  <span className="mr-2">ℹ️</span>
                  <p>Please ensure your bank details are correct. Transfers typically take 1-3 business days to process.</p>
                </div>
              </div>
            )}

            {/* Terms and Submit */}
            <div className="pt-2">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  className="mt-1 mr-2"
                  checked={purchaseForm.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-green-700 hover:underline font-medium">terms and conditions</a> and authorize this payment of ${property.price.toLocaleString()}
                </label>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowPurchaseForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                  <FiCheck className="mr-2" />
                  Confirm Purchase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
    );
};

export { PropertyDetails };