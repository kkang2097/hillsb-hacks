import React, { useState, useEffect } from 'react';
import { submitImage } from '../utils/submitImage';

const UploadBar: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        const savedImage = localStorage.getItem('uploadedImage');
        const savedFileName = localStorage.getItem('fileName'); // Retrieve filename from localStorage
        if (savedImage) {
            setPreview(savedImage);
        }
        if (savedFileName) {
            setFileName(savedFileName); // Set filename from localStorage
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreview(fileReader.result as string);
                localStorage.setItem('uploadedImage', fileReader.result as string);
                setFileName(selectedFile.name); // Set the filename
                localStorage.setItem('fileName', selectedFile.name); // Persist filename in localStorage
            };
            fileReader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
            setFileName(null); // Clear filename if no file
            localStorage.removeItem('uploadedImage'); // Clear local storage if no file
            localStorage.removeItem('fileName'); // Clear filename from localStorage
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await submitImage(file);
        setFile(null); // Clear the input after submission
        setPreview(null); // Clear the preview after submission
        setFileName(null); // Clear filename after submission
        localStorage.removeItem('uploadedImage'); // Clear local storage after submission
        localStorage.removeItem('fileName'); // Clear filename from localStorage
    };

    return (
        <div>
            <form className="upload-bar" onSubmit={handleSubmit}>
                <label className="upload-label">
                    <input 
                        type="file" 
                        onChange={handleInputChange}
                    />
                    <span>{fileName || 'No file chosen'}</span> {/* Display the file name or a default message */}
                </label>    
                <button type="submit">Upload</button>
            </form>
            {preview && <img src={preview} alt="Image Preview" className="mt-2 w-1/2" />}
        </div>
    );
};

export default UploadBar;