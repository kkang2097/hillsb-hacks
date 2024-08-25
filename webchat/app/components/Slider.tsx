

import React from 'react';

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
    return (
        <label className="block mb-2">
            Slider: {value}
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full"
            />
        </label>
    );
};

export default Slider;
