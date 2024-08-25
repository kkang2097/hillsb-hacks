type Item = {
    name: string;
    attributes: string;
    description: string;
    purchased: boolean;
}

type ShoppingList = {
    items: Item[];
}