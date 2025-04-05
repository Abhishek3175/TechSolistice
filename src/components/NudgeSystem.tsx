
import React from 'react';
import { nudges } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle, Award, LightbulbIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NudgeSystem = () => {
  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-savvy-warning" />;
      case 'tip':
        return <LightbulbIcon className="h-5 w-5 text-savvy-primary" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-savvy-success" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-savvy-warning text-white';
      case 'tip':
        return 'bg-savvy-primary text-white';
      case 'achievement':
        return 'bg-savvy-success text-white';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Financial Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nudges.map((nudge) => (
            <div 
              key={nudge.id} 
              className={`p-3 border rounded-lg flex items-start space-x-3 ${nudge.read ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="mt-1">{getNudgeIcon(nudge.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Badge className={getBadgeColor(nudge.type)}>
                    {nudge.type.charAt(0).toUpperCase() + nudge.type.slice(1)}
                  </Badge>
                  <span className="text-xs text-savvy-text-light">{nudge.date}</span>
                </div>
                <p className="text-sm">{nudge.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NudgeSystem;
