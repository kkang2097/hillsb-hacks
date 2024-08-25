import { ShoppingList } from './types';

export function submitPrefs(color: string, style: string, file: File, callback: (shoppingList: ShoppingList) => void) {
    const data = {
        style,
        color,
        file
    };

    fetch('https://ae3f-76-132-138-253.ngrok-free.app/api/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        callback(response.json());
    })
    .then((result: ShoppingList) => {
        console.log('Success:', result);
        callback(result); // Call the callback with the ShoppingList
    })
    .catch(error => {
        console.error('Error:', error);
    });
}