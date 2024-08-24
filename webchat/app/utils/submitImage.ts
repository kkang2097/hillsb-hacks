export const submitImage = async (file: File | null) => {
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('https://dummy-endpoint.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
};
