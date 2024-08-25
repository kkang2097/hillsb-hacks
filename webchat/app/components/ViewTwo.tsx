import React from 'react';
import { ShoppingList } from '../utils/types';

interface ViewTwoProps {
    shoppingList: ShoppingList | null;
}

const ViewTwo: React.FC<ViewTwoProps> = ({ shoppingList }) => {
    return (
        <div className="view-two h-full w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Here's what we recommend:</h1>
            <ul className="list-decimal pl-5">
                {shoppingList?.items.map((item, index) => (
                    <li key={item.name} className="mb-4">
                        <h2 className="text-xl font-bold">{index + 1}. {item.name}:</h2>
                        <ul className="list-disc pl-5">
                            <li className="font-semibold">Attributes: {item.attributes}</li>
                            <li className="italic">Description: {item.description}</li>
                            <li className="italic">Purchased: {item.purchased ? 'Yes' : 'No'}</li>
                        </ul>
                    </li>
                ))}
            </ul>
            <p className="mt-6">
                By removing clutter and investing in quality furniture and accessories, your room will transform into a functional, stylish, and cozy haven.
            </p>
        </div>
    );
};

export default ViewTwo;