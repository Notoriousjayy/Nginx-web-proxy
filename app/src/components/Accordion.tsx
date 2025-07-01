// src/components/Accordion.tsx
import React, { useState, ReactNode } from 'react';

export interface AccordionProps {
  items: { title: string; content: ReactNode }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border rounded">
          <button
            className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.title}
          </button>
          {openIndex === idx && (
            <div className="px-4 py-2">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};