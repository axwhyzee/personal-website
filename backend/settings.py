import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

os.environ['_BARD_API_KEY'] = os.environ.get('SECURE_1PSID_TOKEN')

PORT = 8080

UPLOAD_FILEPATH = 'uploaded'

APPEND_PROMPT = '\nGive me a detailed description of the above text'

GITHUB_API_KEY = os.environ.get('GITHUB_API_KEY')

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql'