import React from 'react';
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const SocialShare = () => {
  const getMetaContent = (name: string) => {
    const element = document.querySelector(`meta[${name.includes('og:') ? 'property' : 'name'}="${name}"]`);
    return element ? element.getAttribute('content') : '';
  };

  const shareUrl = window.location.href;
  const title = getMetaContent('og:title') || document.title;
  const description = getMetaContent('og:description') || getMetaContent('description');
  const image = getMetaContent('og:image');

  const handleShare = async (platform: string) => {
    try {
      const shareData = {
        title,
        text: description,
        url: shareUrl,
      };

      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(description)}`,
            '_blank',
            'width=600,height=400'
          );
          break;
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}&via=pushnask`,
            '_blank',
            'width=600,height=400'
          );
          break;
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=600,height=400'
          );
          break;
        case 'general':
          if (navigator.share) {
            await navigator.share(shareData);
            toast.success('Thanks for sharing!');
          } else {
            const shareText = `${title}\n\n${description}\n\n${shareUrl}`;
            await navigator.clipboard.writeText(shareText);
            toast.success('Link and description copied to clipboard!');
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
        Share PushNask with your network!
      </h3>
      <p className="mb-6 text-slate-600 max-w-md mx-auto">
        Help others discover AI-powered guidance for their career and educational journey
      </p>
      <div className="mx-auto flex max-w-xs justify-center space-x-6">
        <button 
          onClick={() => handleShare('facebook')}
          className="rounded-full bg-[#1877F2] p-3 text-white hover:bg-[#1864D9] transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-6 w-6" />
        </button>
        <button 
          onClick={() => handleShare('general')}
          className="rounded-full bg-green-600 p-3 text-white hover:bg-green-700 transition-colors"
          aria-label="Share via system share or copy to clipboard"
        >
          <Share2 className="h-6 w-6" />
        </button>
        <button 
          onClick={() => handleShare('twitter')}
          className="rounded-full bg-black p-3 text-white hover:bg-gray-800 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-6 w-6" />
        </button>
        <button 
          onClick={() => handleShare('linkedin')}
          className="rounded-full bg-[#0A66C2] p-3 text-white hover:bg-[#084E95] transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default SocialShare;