import { useLocation, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const PurchaseForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const property = state?.property;
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'credit',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      bankAccount: '',
      bankRouting: '',
      agreeTerms: false
    });

    if (!property) {
      return (
        <div className="container mx-auto p-4 text-center">
          <p>Property information not found</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 text-green-600 hover:underline"
          >
            Go to Home
          </button>
        </div>
      );
    }
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Prepare the data based on payment method
      const purchaseData = {
        propertyId: property.id,
        buyerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        paymentInfo: formData.paymentMethod === 'credit' ? {
          method: 'credit',
          cardNumber: formData.cardNumber.replace(/\s/g, ''),
          expiry: formData.cardExpiry,
          cvc: formData.cardCvc
        } : {
          method: 'bank',
          account: formData.bankAccount,
          routing: formData.bankRouting
        },
        termsAccepted: formData.agreeTerms
      };
      onSubmit(purchaseData);
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="container mx-auto p-4">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 text-green-600 hover:underline">
            ← Back to Property
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Purchase Agreement</h2>
                <p className="text-gray-600">{property.title}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                <FiX size={24} />
              </button>
            </div>
  
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Buyer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Buyer Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                    <input
                      type="text"
                      name="address"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
  
              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleChange}
                      className="hidden peer"
                    />
                    <label 
                      htmlFor="credit"
                      className="block p-3 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border ${formData.paymentMethod === 'credit' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}></div>
                        <span>Credit Card</span>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleChange}
                      className="hidden peer"
                    />
                    <label 
                      htmlFor="bank"
                      className="block p-3 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border ${formData.paymentMethod === 'bank' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}></div>
                        <span>Bank Transfer</span>
                      </div>
                    </label>
                  </div>
                </div>
  
                {/* Credit Card Fields */}
                {formData.paymentMethod === 'credit' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                          e.target.value = formatted.trim();
                          handleChange(e);
                        }}
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
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 2) {
                              value = value.substring(0, 2) + '/' + value.substring(2, 4);
                            }
                            e.target.value = value;
                            handleChange(e);
                          }}
                          maxLength={5}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC*</label>
                        <input
                          type="text"
                          name="cardCvc"
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          value={formData.cardCvc}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            e.target.value = value.substring(0, 4);
                            handleChange(e);
                          }}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Bank Transfer Fields */}
                {formData.paymentMethod === 'bank' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number*</label>
                      <input
                        type="text"
                        name="bankAccount"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.bankAccount}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          e.target.value = value;
                          handleChange(e);
                        }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number*</label>
                      <input
                        type="text"
                        name="bankRouting"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.bankRouting}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          e.target.value = value;
                          handleChange(e);
                        }}
                        required
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                      <p>Please ensure your bank details are correct. Transfers typically take 1-3 business days.</p>
                    </div>
                  </div>
                )}
              </div>
  
              {/* Terms and Submit */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    I agree to the <a href="/terms" className="text-green-600 hover:underline">Terms and Conditions</a> and authorize this purchase of ${property.price.toLocaleString()}. I understand this is a legally binding agreement.
                  </label>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors">
                    Confirm Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default PurchaseForm;