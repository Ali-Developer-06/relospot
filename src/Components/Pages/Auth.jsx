import { useState } from 'react';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const initialAuthType = location.state?.authType || 'login';
  const [isLogin, setIsLogin] = useState(initialAuthType === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        console.log('Login success:', formData.email);
        navigate('/'); // Redirect to home after login
      } else {
        console.log('Signup success:', formData.name);
        navigate('/'); // Redirect to home after signup
      }
      
    } catch (err) {
      setError(isLogin ? 'Invalid credentials' : 'Registration failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-1 text-gray-500 hover:text-gray-700"
          aria-label="Go back" >
          <FiArrowLeft size={20} />
        </button>

        {/* Header */}
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Login to Your Account' : 'Create New Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back!' : 'Join us today'}
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required/>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required/>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                minLength="6"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <Link 
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
              isPending ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}>
            {isPending ? (
              <>
                <Spinner />
                Processing...
              </>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>

        {/* Auth Mode Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleAuthMode}
            className="text-blue-600 font-medium hover:underline"
            disabled={isPending}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default Auth;