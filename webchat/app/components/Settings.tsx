import React, { useState } from 'react';
import Slider from './Slider';
import Dropdown from './Dropdown';

const Settings: React.FC = () => {
    // TODO: Decide the parameters later
    const [sliderValue1, setSliderValue1] = useState(50);
    const [sliderValue2, setSliderValue2] = useState(50);
    const [dropdownValue1, setDropdownValue1] = useState('Option 1');
    const [dropdownValue2, setDropdownValue2] = useState('Option 1');

    const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="settings-ui p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <div className="mb-4">
                <Slider value={sliderValue1} onChange={setSliderValue1} />
            </div>
            <div className="mb-4">
                <Slider value={sliderValue2} onChange={setSliderValue2} />
            </div>
            <div className="mb-4">
                <Dropdown value={dropdownValue1} onChange={setDropdownValue1} options={dropdownOptions} />
            </div>
            <div className="mb-4">
                <Dropdown value={dropdownValue2} onChange={setDropdownValue2} options={dropdownOptions} />
            </div>
        </div>
    );
};

export default Settings;