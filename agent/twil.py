import base64
import os

from devtools import pprint
from flask import Flask, request
from flask_pydantic import validate
from openai import OpenAI
from twilio.twiml.messaging_response import MessagingResponse

from classes import ShoppingList, ShoppingListChanged

client = OpenAI()


def shopping_list_system_message(shopping_list: ShoppingList):
    return {
        "role": "system",
        "content": "The current shopping list is: " + shopping_list.model_dump_json(),
    }


def shopping_list_state_system_message():
    return {
        "role": "system",
        "content": "Return a JSON Of the current state of the shopping list.",
    }


def shopping_list_changed_system_message():
    return {
        "role": "system",
        "content": "Has the shopping list changed? Return a JSON.",
    }


def askgpt(chat_log):
    print("Chat log", chat_log)
    response = client.chat.completions.create(
        model="gpt-4o-2024-08-06", messages=chat_log
    )
    answer = response.choices[0].message.content
    return answer


desired_style = "mid-century modern"

current_shopping_list = ShoppingList(
    items=[
        {"name": "sofa", "attributes": "white color", "purchased": False},
        {"name": "chair", "attributes": "black color", "purchased": False},
    ]
)

current_chat_log = [
    {
        "role": "system",
        "content": "You are trying to help the user pick out tasteful furniture based on the attributes they have selected.",
    },
]


def has_shopping_list_changed() -> bool:
    global current_shopping_list
    response = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[shopping_list_system_message(current_shopping_list)]
        + current_chat_log
        + [shopping_list_changed_system_message()],
        response_format=ShoppingListChanged,
    )
    return response.choices[0].message.parsed.changed


def get_changed_shopping_list() -> ShoppingList:
    global current_shopping_list
    response = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[shopping_list_system_message(current_shopping_list)]
        + current_chat_log
        + [shopping_list_state_system_message()],
        response_format=ShoppingList,
    )
    return response.choices[0].message.parsed


app = Flask(__name__)


@app.route("/init", methods={"GET"})
def init():
    global current_shopping_list
    global current_chat_log
    global desired_style

    # open room.jpg and base64 encode it
    encoded_string = None
    with open("room.jpg", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")

    response = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "This is my room right now. I want to redo and change my entire room. My desired style is {desired_style}. "
                        "Create a shopping list of 5 items to purchase in JSON.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{encoded_string}"
                        },
                    },
                ],
            }
        ],
        response_format=ShoppingList,
    )

    current_shopping_list = response.choices[0].message.parsed
    print("Initial shopping list")
    pprint(current_shopping_list)

    return "success"


@app.route("/bot", methods=["POST"])
def bot():
    global current_chat_log
    global current_shopping_list

    incoming_msg = request.values["Body"]
    print("User message", incoming_msg)

    image_urls = []
    if request.values["NumMedia"] != "0":
        num_images = int(request.values["NumMedia"])
        for i in range(num_images):
            image_urls.append(request.values[f"MediaUrl{i}"])

    if len(image_urls) == 0:
        current_chat_log.append({"role": "user", "content": incoming_msg})
    else:
        content = [{"type": "text", "text": incoming_msg}]
        for url in image_urls:
            content.append({"type": "image_url", "image_url": {"url": url}})
        current_chat_log.append({"role": "user", "content": content})

    if has_shopping_list_changed():
        current_shopping_list = get_changed_shopping_list()
        print("Shopping list has changed")
        pprint(current_shopping_list)

    answer = askgpt(
        [shopping_list_system_message(current_shopping_list)] + current_chat_log
    )
    current_chat_log = current_chat_log + [{"role": "assistant", "content": answer}]

    r = MessagingResponse()
    r.message(answer)
    return str(r)


@app.route("/shopping-list", methods=["GET"])
@validate()
def shopping_list():
    global current_shopping_list
    return current_shopping_list


@app.route("/add-item", methods=["GET"])
@validate()
def add_item():
    global current_shopping_list
    current_shopping_list.items.append(
        {"name": "table", "attributes": "brown color", "purchased": False}
    )
    return "success"
