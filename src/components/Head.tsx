import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
}

const Head = ({ 
  title = "PushNask - AI Advisory Platform",
  description = "Make informed decisions about your career, education, and international opportunities with AI-powered insights",
  image = "/lovable-uploads/b563a053-c835-4b5c-bd58-fc56d8bef471.png",
  type = "website",
  children 
}: HeadProps) => {
  const location = useLocation();
  const canonicalUrl = `https://pushnask.com${location.pathname}`;

  const metaTags: MetaTag[] = [
    // Primary Meta Tags
    { name: "title", content: title },
    { name: "description", content: description },
    
    // Open Graph Tags
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: canonicalUrl },
    
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    
    // Additional Meta Tags
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "author", content: "PushNask" },
  ];

  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    metaTags.forEach(tag => {
      let element = tag.name 
        ? document.querySelector(`meta[name="${tag.name}"]`)
        : document.querySelector(`meta[property="${tag.property}"]`);

      if (element) {
        element.setAttribute('content', tag.content);
      } else {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        element.setAttribute('content', tag.content);
        document.head.appendChild(element);
      }
    });

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PushNask",
      "description": description,
      "url": canonicalUrl,
      "logo": image,
      "sameAs": [
        "https://twitter.com/pushnask",
        "https://linkedin.com/company/pushnask",
        "https://facebook.com/pushnask"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CM",
        "addressLocality": "Yaoundé"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [title, description, image, canonicalUrl]);

  return null;
};

export default Head;