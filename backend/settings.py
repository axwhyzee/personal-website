import os

os.environ['_BARD_API_KEY'] = os.environ.get('SECURE_1PSID_TOKEN')

PORT = 8080

UPLOAD_FILEPATH = 'uploaded'

APPEND_PROMPT = '\nIs the above text a resume? If yes, list the professional experiences in the format of Title, Company and Description, with each experience in a separate paragraph. Finally, give a detailed summary of the resume.'

GITHUB_API_KEY = os.environ.get('GITHUB_API_KEY')

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql'

SERVER_API_KEY = os.environ.get('SERVER_API_KEY')