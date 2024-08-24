import React, { useState, useEffect } from 'react';
import Settings from './Settings'; // Import the Settings component
import UploadBar from './UploadBar'; // Import the UploadBar component

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedIndex = localStorage.getItem('openAccordionIndex');
    if (savedIndex) {
      setOpenIndex(Number(savedIndex));
    }
  }, []);

  const toggleItem = (index: number) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    localStorage.setItem('openAccordionIndex', newIndex?.toString() || '');
  };

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          isOpen: openIndex === index,
          onToggle: () => toggleItem(index),
        });
      })}
    </div>
  );
};

export const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onToggle}>
        {title}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};