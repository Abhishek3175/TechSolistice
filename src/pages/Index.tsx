
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { user, loading } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Set up tables in Supabase if they don't exist
    const setupDatabase = async () => {
      try {
        // Just attempt to read transactions table to verify setup
        const { error: transactionError } = await supabase
          .from('transactions')
          .select('count')
          .limit(1) as any;
          
        const { error: goalsError } = await supabase
          .from('savings_goals')
          .select('count')
          .limit(1) as any;
          
        if (transactionError) console.error('Transaction table error:', transactionError);
        if (goalsError) console.error('Savings goals table error:', goalsError);
      } catch (error) {
        console.error('Database tables may not be set up correctly:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    setupDatabase();
  }, []);

  useEffect(() => {
    // Show welcome toast for authenticated users
    if (user) {
      setTimeout(() => {
        toast.info(`Welcome back, ${user.user_metadata.full_name || 'User'}!`, {
          description: "You're getting closer to your savings goals!",
        });
      }, 1000);
    }
  }, [user]);

  if (loading || isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-savvy-background">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Index;
