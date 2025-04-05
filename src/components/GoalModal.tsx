
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SavingsGoal } from './SavingsGoals';

type GoalFormData = Omit<SavingsGoal, 'id' | 'user_id' | 'created_at'>;

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SavingsGoal | GoalFormData) => void;
  goal: SavingsGoal | null;
}

const goalSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  iconName: z.string().min(1, "Please select an icon"),
  targetAmount: z.number().positive("Target amount must be positive"),
  currentAmount: z.number().nonnegative("Current amount cannot be negative"),
  deadline: z.string().min(1, "Please enter a deadline"),
});

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave, goal }) => {
  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: goal ? {
      name: goal.name,
      iconName: goal.iconName,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      deadline: goal.deadline.split('T')[0],
    } : {
      name: '',
      iconName: 'piggy-bank',
      targetAmount: 0,
      currentAmount: 0,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
    }
  });

  const handleSubmit = (data: GoalFormData) => {
    if (goal) {
      onSave({
        ...data,
        id: goal.id,
        user_id: goal.user_id
      });
    } else {
      onSave(data);
    }
    form.reset();
  };

  const icons = [
    { name: 'piggy-bank', label: 'Piggy Bank' },
    { name: 'laptop', label: 'Laptop' },
    { name: 'calendar', label: 'Calendar' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{goal ? 'Edit Savings Goal' : 'Add New Savings Goal'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name your savings goal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="iconName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {icons.map((icon) => (
                        <SelectItem key={icon.name} value={icon.name}>{icon.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                      value={field.value} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                      value={field.value} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">{goal ? 'Update Goal' : 'Save Goal'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalModal;
