import React from 'react';
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const SocialShare = () => {
  const shareUrl = window.location.href;
  const title = "Check out PushNask - Your AI-Powered Journey to Global Success!";

  const handleShare = async (platform: string) => {
    try {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'general':
          if (navigator.share) {
            await navigator.share({
              title,
              url: shareUrl,
            });
          } else {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard!');
          }
          break;
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  return (
    <section className="bg-blue-50 px-4 py-12 text-center">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">
        Your friends deserve to know about this too!
      </h3>
      <div className="mx-auto flex max-w-xs justify-center space-x-6">
        <button 
          onClick={() => handleShare('facebook')}
          className="rounded-full bg-[#1877F2] p-3 text-white hover:bg-[#1864D9] transition-colors"
        >
          <Facebook className="h-6 w-6" />
        </button>
        <button 
          onClick={() => handleShare('general')}
          className="rounded-full bg-green-600 p-3 text-white hover:bg-green-700 transition-colors"
        >
          <Share2 className="h-6 w-6" />
        </button>
        <button 
          onClick={() => handleShare('twitter')}
          className="rounded-full bg-black p-3 text-white hover:bg-gray-800 transition-colors"
        >
          <Twitter className="h-6 w-6" />
        </button>
        <button 
          onClick={() => handleShare('linkedin')}
          className="rounded-full bg-[#0A66C2] p-3 text-white hover:bg-[#084E95] transition-colors"
        >
          <Linkedin className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default SocialShare;