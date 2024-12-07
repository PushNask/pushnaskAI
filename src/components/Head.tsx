import { useEffect } from 'react';

interface HeadProps {
  children: React.ReactNode;
}

const Head = ({ children }: HeadProps) => {
  useEffect(() => {
    // Find and update existing head elements or create new ones
    const elements = Array.from(children as any);
    elements.forEach((child: any) => {
      const { type, props } = child;
      const existingElement = document.head.querySelector(`${type}[rel="${props.rel}"]`);
      if (existingElement) {
        Object.keys(props).forEach(prop => {
          if (prop !== 'children') {
            existingElement.setAttribute(prop, props[prop]);
          }
        });
      } else {
        const newElement = document.createElement(type);
        Object.keys(props).forEach(prop => {
          if (prop !== 'children') {
            newElement.setAttribute(prop, props[prop]);
          }
        });
        document.head.appendChild(newElement);
      }
    });

    // Cleanup function
    return () => {
      elements.forEach((child: any) => {
        const { type, props } = child;
        const element = document.head.querySelector(`${type}[rel="${props.rel}"]`);
        if (element) {
          document.head.removeChild(element);
        }
      });
    };
  }, [children]);

  return null;
};

export default Head;