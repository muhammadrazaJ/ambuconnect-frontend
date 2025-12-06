import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { motion } from 'framer-motion';
import { Ambulance } from 'lucide-react';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden py-12">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-br-full z-0"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-tl-full z-0"></div>
      </div>

      <div className="z-10 w-full max-w-lg px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="p-3 bg-secondary/10 rounded-full">
            <Ambulance className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">AmbuConnect</h1>
        </motion.div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
