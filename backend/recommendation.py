import os

from dotenv import load_dotenv
from openrouter import OpenRouter


def recommendation(type):
    load_dotenv()
    api_key = os.getenv("OPENROUTER_API_KEY2")
    model = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free"

    with OpenRouter(api_key=api_key) as client:
        response = client.chat.send(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": f"give me suggestion how to process {type} waste for normal citizen in bahasa in one short paragraph.",
                }
            ],
        )

    result = response.choices[0].message.content
    return result


# def main():
#     type = input("trash type: ")
#     recomm = recommendation(type)
#     print(recomm)


# main()