
// User profile
export const userProfile = {
  name: "Alex Kumar",
  email: "alex@example.com",
  joinDate: "March 2023",
  monthlyIncome: 35000,
  monthlySavingsTarget: 7000
};

// Transaction types
export type TransactionType = 'need' | 'want';

// Transaction interface
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: TransactionType;
}

// Mock transactions (recent first)
export const transactions: Transaction[] = [
  {
    id: "tx1",
    date: "2023-04-03",
    amount: 2500,
    category: "Rent",
    description: "Monthly Rent",
    type: "need"
  },
  {
    id: "tx2",
    date: "2023-04-02",
    amount: 1200,
    category: "Food",
    description: "Grocery Shopping",
    type: "need"
  },
  {
    id: "tx3",
    date: "2023-04-02",
    amount: 800,
    category: "Entertainment",
    description: "Movie Night",
    type: "want"
  },
  {
    id: "tx4",
    date: "2023-04-01",
    amount: 600,
    category: "Food",
    description: "Food Delivery",
    type: "want"
  },
  {
    id: "tx5",
    date: "2023-03-30",
    amount: 1500,
    category: "Utilities",
    description: "Electricity Bill",
    type: "need"
  },
  {
    id: "tx6",
    date: "2023-03-28",
    amount: 350,
    category: "Shopping",
    description: "New Shirt",
    type: "want"
  },
  {
    id: "tx7",
    date: "2023-03-25",
    amount: 1000,
    category: "Food",
    description: "Restaurant Dining",
    type: "want"
  },
  {
    id: "tx8",
    date: "2023-03-23",
    amount: 2000,
    category: "Transport",
    description: "Monthly Fuel",
    type: "need"
  }
];

// Savings Goals
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  iconName: string;
}

export const savingsGoals: SavingsGoal[] = [
  {
    id: "goal1",
    name: "Emergency Fund",
    targetAmount: 50000,
    currentAmount: 20000,
    deadline: "2023-12-31",
    iconName: "piggy-bank"
  },
  {
    id: "goal2",
    name: "Vacation",
    targetAmount: 30000,
    currentAmount: 5000,
    deadline: "2023-08-15",
    iconName: "calendar"
  },
  {
    id: "goal3",
    name: "New Laptop",
    targetAmount: 80000,
    currentAmount: 15000,
    deadline: "2023-10-01",
    iconName: "laptop"
  }
];

// Monthly spending data for charts
export const monthlySpending = [
  { month: "Jan", needs: 12000, wants: 8000 },
  { month: "Feb", needs: 11500, wants: 9000 },
  { month: "Mar", needs: 13000, wants: 7500 },
  { month: "Apr", needs: 12500, wants: 6000 },
];

// Nudge messages
export interface Nudge {
  id: string;
  type: 'warning' | 'tip' | 'achievement';
  message: string;
  date: string;
  read: boolean;
}

export const nudges: Nudge[] = [
  {
    id: "nudge1",
    type: "warning",
    message: "You've spent ₹2000 on food delivery this week - that's 40% more than usual!",
    date: "2023-04-02",
    read: false
  },
  {
    id: "nudge2",
    type: "tip",
    message: "Save ₹100 more this week to reach your Emergency Fund goal faster!",
    date: "2023-04-01",
    read: false
  },
  {
    id: "nudge3",
    type: "achievement",
    message: "Congratulations! You spent 15% less on entertainment this month.",
    date: "2023-03-28",
    read: true
  }
];
