// Make a 100% height 5% width button that toggles between ViewOne and ViewTw

import React, { useState } from 'react';
import ViewOne from './ViewOne';
import ViewTwo from './ViewTwo';
import { ShoppingList } from '../utils/types';
import './ViewToggle'; // Import the CSS file

const ViewToggle = () => {
    const [isViewOne, setIsViewOne] = useState(true);
    const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

    const handleToggle = () => {
        setIsViewOne(!isViewOne);
    };

    return (
        <div className={`flex h-full w-full ${isViewOne ? 'bg-view-one' : 'bg-view-two'}`}>
            <div className={`view-one ${isViewOne ? 'toggled' : ''}`}>
                {isViewOne && <ViewOne shoppingList={shoppingList} setShoppingList={setShoppingList} />}
            </div>
            <button className={`toggle-button ${isViewOne ? 'bg-view-one' : 'bg-view-two'}`} onClick={handleToggle}>
                {isViewOne ? '>>' : '<<'}
            </button>
            <div className={`view-two ${isViewOne ? '' : 'toggled'}`}>
                {!isViewOne && <ViewTwo />}
            </div>
        </div>
    );
};

export default ViewToggle;