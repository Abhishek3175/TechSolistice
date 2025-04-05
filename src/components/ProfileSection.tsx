
import React from 'react';
import { userProfile } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSection = () => {
  const { user } = useAuth();
  
  // Get user's display name from auth context
  const userName = user?.user_metadata?.full_name || 'User';
  
  // Use other mock data for now
  const savedThisMonth = 6000; // Mock data
  const savingsProgress = Math.round((savedThisMonth / userProfile.monthlySavingsTarget) * 100);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Personal Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-savvy-primary text-white text-xl">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">{userName}</h3>
            <p className="text-sm text-savvy-text-light">Member since {userProfile.joinDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-4 w-4 text-savvy-primary" />
              <span className="text-xs text-savvy-text-light">Monthly Income</span>
            </div>
            <p className="text-lg font-semibold">₹{userProfile.monthlyIncome.toLocaleString()}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingDown className="h-4 w-4 text-savvy-warning" />
              <span className="text-xs text-savvy-text-light">Monthly Target</span>
            </div>
            <p className="text-lg font-semibold">₹{userProfile.monthlySavingsTarget.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Savings Progress</span>
            <span className="text-sm font-medium">₹{savedThisMonth.toLocaleString()} / ₹{userProfile.monthlySavingsTarget.toLocaleString()}</span>
          </div>
          <Progress 
            value={savingsProgress} 
            className="h-2"
            style={{ "--progress-width": `${savingsProgress}%` } as React.CSSProperties}
          />
          <div className="flex items-center justify-between text-xs text-savvy-text-light">
            <span>{savingsProgress}% of monthly target</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>25 days left</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
