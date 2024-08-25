import React, { useEffect, useState } from 'react';
import { submitImage } from '../utils/submitImage';

interface UploadBarProps {
    file: File | null;
    setFile: (file: File | null) => void;
}

const UploadBar: React.FC<UploadBarProps> = ({ file, setFile }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl); // Clean up
        }
        setPreview(null);
    }, [file]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile); // Update the file state in ViewOne
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        //TODO: Add the API request here
        await submitImage(file);
        setFile(null); // Clear the input after submission
    };

    return (
        <div>
            <p>
                <span className="font-bold text-lg">Step 2:</span> Let's set up the vibes (colors, items, etc)
            </p>
            <form className="upload-bar" onSubmit={handleSubmit}>
                <label className="upload-label">
                    <input 
                        type="file" 
                        onChange={handleInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer" // Cover the entire upload-bar
                    />
                    <span className="text-[#414253]">{file?.name || 'No file chosen'}</span>
                </label>    
            </form>
            <p>
                <span className="font-bold text-lg">Step 3:</span> Let's set up the vibes (colors, items, etc)
            </p>
            <div className="mt-4 p-2 border rounded border-gray-300 text-center">
                <button type="submit">I'm Feeling Lucky</button>
            </div>
            {/*preview && <img src={preview} alt="Image preview" className="image-preview" />*/}
        </div>
    );
};

export default UploadBar;