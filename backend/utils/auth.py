from fastapi import Request
from settings import SERVER_API_KEY

def auth_request(r: Request) -> bool:
    auth_header = r.headers['Authorization']
    if 'bearer' != auth_header[:6]:
        return False    
    return auth_header.split()[1] == SERVER_API_KEY
