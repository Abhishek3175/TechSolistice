
import React from 'react';
import ProfileSection from '@/components/ProfileSection';
import SpendingChart from '@/components/SpendingChart';
import SavingsGoals from '@/components/SavingsGoals';
import ExpenseTracker from '@/components/ExpenseTracker';
import NudgeSystem from '@/components/NudgeSystem';

const Dashboard = () => {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <ProfileSection />
          <NudgeSystem />
        </div>

        {/* Middle column */}
        <div className="space-y-6 md:col-span-2">
          <SpendingChart />
          <SavingsGoals />
          <ExpenseTracker />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
