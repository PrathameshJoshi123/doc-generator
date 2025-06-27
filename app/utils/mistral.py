from langchain.chat_models import init_chat_model
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)


llm = init_chat_model(model="gemma2-9b-it", model_provider="groq", temperature=0.3)
llm_readme = init_chat_model(model="deepseek-r1-distill-llama-70b", model_provider="groq", temperature=0.3)

parser = StrOutputParser()

def get_llm_response(prompt: str) -> str:
    """
    Call Mistral LLM with a prompt string and return plain text output.
    """

    messages = [("system", prompt)]
    chain = llm | StrOutputParser()
    return chain.invoke(messages)

def get_llm_response_readme(prompt: str) -> str:


    messages = [("system", prompt)]
    chain = llm_readme | StrOutputParser()
    return chain.invoke(messages)