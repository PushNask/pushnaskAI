import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-4 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-ocean">
                <div className="h-full w-full rounded-full bg-ocean p-2">
                  <div className="h-full w-4 translate-x-2 rounded-r-full bg-orange-500"></div>
                </div>
              </div>
              <span className="ml-2 text-xl font-bold text-white">PushNask</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-ocean transition-colors">About</a>
              <a href="#" className="hover:text-ocean transition-colors">Career</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-ocean transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-ocean transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Help</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-ocean transition-colors">Support</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p>© 2024 PushNask AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;