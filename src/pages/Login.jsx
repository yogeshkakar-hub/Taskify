import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('yogeshkakar02@gmail.com');
  const [password, setPassword] = useState('Yogesh@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const from = location.state?.from?.pathname || '/';

  // Validation logic
  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getValidationColor = (field, isValid, value) => {
    if (focusedField !== field && !value) return 'rgba(255, 255, 255, 0.2)';
    if (value && !isValid) return '#ff4d4d'; // Neon Red
    if (value && isValid) return '#00ffcc'; // Neon Green
    return '#8a2be2'; // Neon Purple (Focus)
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'radial-gradient(circle at top left, #1a1a2e, #16213e, #0f3460)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative ambient glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <LogIn size={48} color="#00ffcc" style={{ margin: '0 auto', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(0,255,204,0.5))' }} />
            </motion.div>
            <h2 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 700, letterSpacing: '1px' }}>Welcome Back</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.5rem' }}>Securely login to Taskify</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: error ? 1 : 0, height: error ? 'auto' : 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                background: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid #ff4d4d',
                color: '#ff4d4d',
                padding: '0.75rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={18} />
                {error}
              </div>
            </motion.div>

            {/* Email Field */}
            <div>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 1rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: `1px solid ${getValidationColor('email', isEmailValid, email)}`,
                    borderRadius: '12px',
                    color: '#fff',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: focusedField === 'email' ? `0 0 15px ${getValidationColor('email', isEmailValid, email)}40` : 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {email && (
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    {isEmailValid ? <CheckCircle2 size={18} color="#00ffcc" /> : <AlertCircle size={18} color="#ff4d4d" />}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 1rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: `1px solid ${getValidationColor('password', isPasswordValid, password)}`,
                    borderRadius: '12px',
                    color: '#fff',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: focusedField === 'password' ? `0 0 15px ${getValidationColor('password', isPasswordValid, password)}40` : 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1rem',
                background: 'linear-gradient(135deg, #8a2be2 0%, #00ffcc 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#1a1a2e',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 15px rgba(138,43,226,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </motion.button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#00ffcc', textDecoration: 'none', fontWeight: 600 }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
