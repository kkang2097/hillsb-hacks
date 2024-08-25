from mem0 import MemoryClient

client = MemoryClient(api_key="m0-SGePA32QLwMvNwBsx8rLXyglH5F6kTPNkdu37cm0")

messages = [
    {"role": "user", "content": "What do you recommend?"},
    {"role": "assistant", "content": "For this room, I would recommend you buy a desk, a chair, a sofa, and a couple of pillows."}
]

client.add(messages, agent_id="interior-assistant4")

messages2 = [
    {"role": "user", "content": "I purchased a sofa."},
]

client.add(messages2, agent_id="interior_assistant4")

all_memories = client.get_all(agent_id="interior-assistant4")
print(all_memories)
