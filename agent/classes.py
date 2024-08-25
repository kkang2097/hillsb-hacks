from pydantic import BaseModel


class Item(BaseModel):
    name: str
    attributes: str
    purchased: bool


class ShoppingList(BaseModel):
    items: list[Item]


class ShoppingListChanged(BaseModel):
    changed: bool
