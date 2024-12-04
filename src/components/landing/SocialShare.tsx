import React from 'react';
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

const SocialShare = () => {
  return (
    <section className="bg-blue-50 px-4 py-12 text-center">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">
        Your friends deserve to know about this too!
      </h3>
      <div className="mx-auto flex max-w-xs justify-center space-x-6">
        <button className="rounded-full bg-[#1877F2] p-3 text-white hover:bg-[#1864D9] transition-colors">
          <Facebook className="h-6 w-6" />
        </button>
        <button className="rounded-full bg-green-600 p-3 text-white hover:bg-green-700 transition-colors">
          <Share2 className="h-6 w-6" />
        </button>
        <button className="rounded-full bg-black p-3 text-white hover:bg-gray-800 transition-colors">
          <Twitter className="h-6 w-6" />
        </button>
        <button className="rounded-full bg-[#0A66C2] p-3 text-white hover:bg-[#084E95] transition-colors">
          <Linkedin className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default SocialShare;