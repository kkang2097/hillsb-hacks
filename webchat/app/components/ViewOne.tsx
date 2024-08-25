import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import UploadBar from './UploadBar';
import Dropdown from './Dropdown';

const ViewOne: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsToggled(localStorage.getItem('isToggled') === 'true');
            setTextareaValue(localStorage.getItem('textareaValue') || '');

            const savedFile = localStorage.getItem('file');
            const savedFileName = localStorage.getItem('fileName');
            if (savedFile && savedFileName) {
                const byteString = atob(savedFile.split(',')[1]);
                const mimeString = savedFile.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                setFile(new File([ab], savedFileName, { type: mimeString }));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isToggled', JSON.stringify(isToggled));
            localStorage.setItem('textareaValue', textareaValue);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    localStorage.setItem('file', reader.result as string);
                    localStorage.setItem('fileName', file.name);
                };
                reader.readAsDataURL(file);
            } else {
                localStorage.removeItem('file');
                localStorage.removeItem('fileName');
            }
        }
    }, [isToggled, textareaValue, file]);

    const toggleView = () => {
        setIsToggled(!isToggled);
    };

    const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="flex flex-col items-center justify-start h-full">
            <h1>View One</h1>
            <p>
                <span className="font-bold text-lg">Step 1:</span> Let's set up the vibes (colors, items, etc)
            </p>
            <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter text here"
                rows={4}
                cols={50}
            />
            <UploadBar file={file} setFile={setFile} />
        </div>
    );
};

export default ViewOne;