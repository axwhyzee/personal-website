import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

os.environ['_BARD_API_KEY'] = os.environ.get('SECURE_1PSID_TOKEN')

PORT = 8080

UPLOAD_FILEPATH = 'uploaded'

APPEND_PROMPT = '\nGive me a detailed description of the above text'