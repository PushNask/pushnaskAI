import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/be19526a-36cc-48c3-a1e8-d8cac0a33b3a.png" 
            alt="PushNask" 
            className="h-10 w-10"
          />
          <span className="ml-2 text-xl font-bold">PushNask</span>
        </div>

        <div className="hidden items-center space-x-8 md:flex">
          <a href="#" className="text-slate-600 hover:text-blue-600">Overview</a>
          <a href="#" className="text-slate-600 hover:text-blue-600">Pricing</a>
          <Button variant="outline" className="mr-2" onClick={() => navigate('/auth')}>
            Log In
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
            Sign Up
          </Button>
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 pt-8">
              <a href="#" className="text-lg text-slate-600 hover:text-blue-600">Overview</a>
              <a href="#" className="text-lg text-slate-600 hover:text-blue-600">Pricing</a>
              <Button variant="outline" className="w-full" onClick={() => navigate('/auth')}>
                Log In
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;