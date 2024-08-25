import React from 'react';

const Dropdown: React.FC<{ attribute: string; value: string; onChange: (value: string) => void; options: string[]; placeholder?: string }> = ({ attribute, value, onChange, options, placeholder }) => {
    return (
        <div className="dropdown-container">
        <label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="dropdown"
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
        </div>
    );
};

export default Dropdown;