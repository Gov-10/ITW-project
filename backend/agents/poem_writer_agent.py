from strands import Agent, tool
from strands.models.gemini import GeminiModel
import os
import environ
from dotenv import load_dotenv
load_dotenv()
env = environ.Env()
environ.Env.read_env()
model = GeminiModel(
    client_args= {
        "api_key": os.getenv("GEMINI_API_KEY")
    }, 
    model_id= "gemini-2.5-flash", 
    params= {
        "temperature" : 0.4, 
        "max_output_tokens": 2048, 
        "top_p" : 0.9, 
        "top_k" : 40
    }
)

@tool
def poem_writer(topic: str, theme: str):
    """Return a poem (10-lines) based on the given topic and theme"""
    return f"Poem for given topic: {topic} and theme: {theme}"

poem_writer_agent = Agent(model=model, tools=[poem_writer])