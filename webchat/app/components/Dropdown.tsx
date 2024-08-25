import React from 'react';

interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
    return (
        <label className="block mb-2">
            Dropdown:
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded p-2"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default Dropdown;
