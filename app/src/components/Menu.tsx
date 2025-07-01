// components/Menu.tsx
import React from 'react';
import './Menu.css';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  options: string[];
  onSelectOption: (option: string) => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, options, onSelectOption }) => {
  if (!isOpen) {
    return null; // Don't render anything if the menu is closed
  }

  return (
    <div className="menu-container">
      <ul className="menu-list">
        {options.map((option) => (
          <li key={option} onClick={() => onSelectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
      <button onClick={onClose} className="close-button">
        Close Menu
      </button>
    </div>
  );
};

export default Menu;