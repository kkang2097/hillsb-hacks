import React, { useState } from 'react';

const UploadBar: React.FC = () => {
    const [url, setUrl] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle the URL submission logic here
        console.log('Submitted URL:', url);
        setUrl(''); // Clear the input after submission
    };

    return (
        <form onSubmit={handleSubmit} className="upload-bar">
            <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="Enter URL"
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default UploadBar;