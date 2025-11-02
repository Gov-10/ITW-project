from fastapi import FastAPI
from agents.agent import agent
from agents.email_writer_agent import email_writer_agent
from agents.poem_writer_agent import poem_writer_agent
from pydantic import BaseModel
import requests
app = FastAPI()

class topicInput(BaseModel):
    topic : str

class EmailInput(BaseModel):
    topic : str

class PoemInput(BaseModel):
    topic : str
    theme : str

@app.get("/hello")
async def hello():
    return {"message" : "hello"}


@app.post("/poem")
def poem(payload: PoemInput):
    topic = payload.topic
    theme = payload.theme.lower()
    api_url = f"http://api.quotable.io/quotes?tags={theme}"
    quote_response = requests.get(api_url)
    if quote_response.status_code == 200:
        data = quote_response.json()
        quotes = [q["content"] for q in data.get("results", [])[:3]]
        inspiration = " | ".join(quotes)
    else:
        inspiration = "No external poetic inspiration found."
    query = f"""
    You are an award-winning poet.
    Topic: {topic}
    Theme: {theme}
    Inspiration lines: {inspiration}

    Write a 10-line poem inspired by the above topic and theme.
    Maintain poetic rhythm, emotional depth, and creativity.
    """
    result = poem_writer_agent(query)
    return {
        "topic" : topic, 
        "theme" : theme,
        "result" : result.message["content"][0]["text"]
    }



@app.post("/email")
def email(payload: EmailInput):
    topic = payload.topic
    related_api = f"https://api.datamuse.com/words?ml={topic.replace(' ', '+')}"
    related_response = requests.get(related_api)
    if related_response.status_code == 200:
        related_words = [w["word"] for w in related_response.json()[:10]]
        context = ", ".join(related_words)
    else:
        context = "No related context found."
    query = f"""
    You are a professional email writer AI.
    Topic: {topic}
    Related context: {context}

    Task: Write a concise, polished, and grammatically rich professional email
    about the given topic. Avoid unnecessary fluff. 
    Structure as:
    {{
      "subject": "Email subject line",
      "body": "Email body text",
      "sign_off": "Best regards, [Your Name]"
    }}
    """
    result = email_writer_agent(query)
    return {
        "topic" : topic, 
        "result" : result.message["content"][0]["text"]
    }

@app.post("/simplify")
def simplify(payload: topicInput):
    topic = payload.topic
    wiki_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{topic.replace(' ', '_')}"
    wiki_response = requests.get(wiki_url)
    if wiki_response.status_code == 200:
        wiki_data = wiki_response.json()
        context = wiki_data.get("extract", "No summary found for this topic.")
    else:
        context = "No Wikipedia data found."
    query = f"""
    You are a subject matter expert.
    Simplify this topic for a beginner student.
    Topic: {topic}
    Background info: {context}
    Provide a simplified, concise, and structured explanation.
    """
    result = agent(query)
    return {
        "topic": topic,
        "summary_source": "Wikipedia",
        "simplified_explanation": result.message["content"][0]["text"]
    }

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app= app