import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-ocean">
            <div className="h-full w-full rounded-full bg-ocean p-2">
              <div className="h-full w-4 translate-x-2 rounded-r-full bg-orange-500"></div>
            </div>
          </div>
          <span className="ml-2 text-xl font-bold">PushNask</span>
        </div>

        <div className="hidden items-center space-x-8 md:flex">
          <a href="#" className="text-slate-600 hover:text-ocean">Overview</a>
          <a href="#" className="text-slate-600 hover:text-ocean">Pricing</a>
          <Button variant="outline" className="mr-2">Log In</Button>
          <Button>Sign Up</Button>
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 pt-8">
              <a href="#" className="text-lg text-slate-600 hover:text-ocean">Overview</a>
              <a href="#" className="text-lg text-slate-600 hover:text-ocean">Pricing</a>
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full">Sign Up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;