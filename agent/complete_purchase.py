from openai import OpenAI
from classes import ShoppingList

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
            "content": "I bought the sofa.",
        },
        {
            "role": "system",
            "content": "Return a JSON Of the current state of the shopping list.",
        },
    ],
    response_format=ShoppingList,
)


print(completion.choices[0].message.parsed)
