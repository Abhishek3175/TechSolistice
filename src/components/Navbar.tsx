
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { nudges } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const unreadNudges = nudges.filter(nudge => !nudge.read).length;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-savvy-dark">
            <span className="text-savvy-primary">Savvy</span> Assistant
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-savvy-text">
            <Bell size={20} />
            {unreadNudges > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                {unreadNudges}
              </Badge>
            )}
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-savvy-text">
          <Settings size={20} />
        </Button>
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-savvy-text">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/auth">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
