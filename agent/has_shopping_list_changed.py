from openai import OpenAI
from classes import ShoppingList, ShoppingListChanged

client = OpenAI()

shopping_list = ShoppingList(
    items=[
        {"name": "sofa", "attributes": "white color", "purchased": False},
        {"name": "chair", "attributes": "black color", "purchased": False},
    ]
)

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {
            "role": "system",
            "content": "The current shopping list is: "
            + shopping_list.model_dump_json(),
        },
        {
            "role": "user",
            "content": "I thinking about this white sofa or this black one.",
        },
        {
            "role": "system",
            "content": "Has the shopping list changed? Return a JSON.",
        },
    ],
    response_format=ShoppingListChanged,
)


print(completion.choices[0].message.parsed)
