from typing import Optional

from pydantic import BaseModel


class Item(BaseModel):
    name: str
    attributes: str
    description: str
    purchased: bool


class ShoppingList(BaseModel):
    items: list[Item]


class ShoppingListChanged(BaseModel):
    changed: bool


class InitBodyModel(BaseModel):
    desired_style: Optional[str] = None
    desired_colors: Optional[str] = None
    encoded_image: Optional[str] = None
