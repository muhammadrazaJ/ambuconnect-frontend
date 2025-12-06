import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { auth, RegisterData } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData & { confirmPassword: '' }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Exclude confirmPassword from API call
      const { confirmPassword, ...apiData } = formData;
      const response = await auth.register(apiData);

      const { setAuthToken } = await import('../services/api');
      setAuthToken(response.token);

      navigate('/');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-card rounded-2xl shadow-xl border border-border"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join AmbuConnect today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="******"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Confirm</label>
            <div className="relative">
              <CheckCircle className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="******"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-red-500 text-sm bg-red-50 p-2 rounded-md border border-red-200"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span className="flex items-center">Create Account <ArrowRight className="ml-2 h-4 w-4" /></span>}
        </motion.button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <a href="/login" className="font-medium text-primary hover:text-primary/80">
          Sign In
        </a>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
