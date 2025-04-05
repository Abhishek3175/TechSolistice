
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, Calendar, Laptop, Plus, Edit, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import GoalModal from '@/components/GoalModal';

export interface SavingsGoal {
  id: string;
  user_id: string;
  name: string;
  iconName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  created_at?: string;
}

const SavingsGoals = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .order('created_at', { ascending: false }) as any;
      
      if (error) throw error;

      // Map database column names to our interface properties
      const mappedGoals: SavingsGoal[] = (data || []).map((goal: any) => ({
        id: goal.id,
        user_id: goal.user_id,
        name: goal.name,
        iconName: goal.iconname,
        targetAmount: goal.targetamount,
        currentAmount: goal.currentamount,
        deadline: goal.deadline,
        created_at: goal.created_at
      }));
      
      setGoals(mappedGoals);
    } catch (error: any) {
      toast({
        title: "Error fetching goals",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGoal = async (goal: Omit<SavingsGoal, 'id' | 'user_id' | 'created_at'>) => {
    try {
      // Map our interface properties to database column names
      const { data, error } = await supabase
        .from('savings_goals')
        .insert({
          user_id: user?.id,
          name: goal.name,
          iconname: goal.iconName,
          targetamount: goal.targetAmount,
          currentamount: goal.currentAmount,
          deadline: goal.deadline,
        })
        .select() as any;
      
      if (error) throw error;
      
      if (data) {
        // Map the returned data to our interface
        const newGoal: SavingsGoal = {
          id: data[0].id,
          user_id: data[0].user_id,
          name: data[0].name,
          iconName: data[0].iconname,
          targetAmount: data[0].targetamount,
          currentAmount: data[0].currentamount,
          deadline: data[0].deadline,
          created_at: data[0].created_at
        };
        
        setGoals([newGoal, ...goals]);
        setIsModalOpen(false);
        toast({
          title: "Goal added",
          description: "New savings goal has been successfully added",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error adding goal",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateGoal = async (updatedGoal: SavingsGoal) => {
    try {
      const { id, created_at, user_id, ...goalData } = updatedGoal;
      
      const { error } = await supabase
        .from('savings_goals')
        .update({
          name: goalData.name,
          iconname: goalData.iconName,
          targetamount: goalData.targetAmount,
          currentamount: goalData.currentAmount,
          deadline: goalData.deadline
        })
        .eq('id', id) as any;
      
      if (error) throw error;
      
      setGoals(goals.map(goal => goal.id === id ? updatedGoal : goal));
      setSelectedGoal(null);
      setIsModalOpen(false);
      toast({
        title: "Goal updated",
        description: "Savings goal has been successfully updated",
      });
    } catch (error: any) {
      toast({
        title: "Error updating goal",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('savings_goals')
        .delete()
        .eq('id', id) as any;
      
      if (error) throw error;
      
      setGoals(goals.filter(goal => goal.id !== id));
      toast({
        title: "Goal deleted",
        description: "Savings goal has been successfully deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting goal",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleOpenModal = (goal: SavingsGoal | null = null) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'piggy-bank':
        return <PiggyBank className="h-10 w-10 text-savvy-primary" />;
      case 'calendar':
        return <Calendar className="h-10 w-10 text-savvy-primary" />;
      case 'laptop':
        return <Laptop className="h-10 w-10 text-savvy-primary" />;
      default:
        return <PiggyBank className="h-10 w-10 text-savvy-primary" />;
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <Button variant="outline" size="sm" onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-1" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <p>Loading goals...</p>
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No savings goals yet. Add your first goal!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const progressPercent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
              return (
                <div key={goal.id} className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="bg-savvy-primary bg-opacity-10 p-3 rounded-full">
                    {getIconComponent(goal.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{goal.name}</h3>
                      <span className="text-sm text-savvy-text-light">
                        ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className="h-2"
                      style={{ "--progress-width": `${progressPercent}%` } as React.CSSProperties} 
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-savvy-text-light">{progressPercent}% Complete</span>
                      <span className="text-xs text-savvy-text-light">Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleOpenModal(goal)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      
      <GoalModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGoal(null);
        }} 
        onSave={selectedGoal ? handleUpdateGoal : handleAddGoal}
        goal={selectedGoal}
      />
    </Card>
  );
};

export default SavingsGoals;
