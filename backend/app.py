import os

from bardapi import Bard 
from fastapi import FastAPI, File, UploadFile, status
from fastapi.responses import FileResponse, Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import Literal
import uvicorn

from settings import (
    APPEND_PROMPT, 
    GITHUB_API_KEY,
    GITHUB_GRAPHQL_URL, 
    LEETCODE_GRAPHQL_URL,
    PORT,
    UPLOAD_FILEPATH
)
from utils.pdf_reader import pdf_to_text
from utils.filepaths import clean_filepath, to_uuid_filename
from models.payload import GraphQLPayload


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*', 'http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

bard = Bard()

@app.get('/')
def root() -> str:
    return 'ping'

@app.get('/file')
def get_file(
    filepath: str
) -> Response:
    try:
        filepath = clean_filepath(filepath)
        return FileResponse(os.path.join(UPLOAD_FILEPATH, filepath))
    except ValueError as e:
        return JSONResponse(content={'error': str(e)})
    except FileNotFoundError:
        return JSONResponse(content={'error': 'File does not exist'})
    

@app.get('/bard/file')
def bard_inference_on_file(
    filepath: str
) -> JSONResponse:
    text = ''
    filepath = os.path.join(UPLOAD_FILEPATH, filepath)
    if filepath.endswith('.pdf'):
        text = pdf_to_text(filepath)
    elif filepath.endswith('.txt'):
        with open(filepath, 'r') as f:
            text = f.read()
    elif filepath.endswith('.docx'):
        pass
    return JSONResponse(
        content=bard.get_answer(text + APPEND_PROMPT)['content'] if text else 'No content found in file.',
        status_code=status.HTTP_200_OK
    )
    

@app.post('/file/upload')
def upload_resume(
    file: UploadFile = File(...)
) -> JSONResponse:
    try:
        if not os.path.exists(UPLOAD_FILEPATH):
            os.mkdir(UPLOAD_FILEPATH)
        contents = file.file.read()
        filepath = to_uuid_filename(file.filename)
        with open(os.path.join(UPLOAD_FILEPATH, filepath), 'wb') as f:
            f.write(contents)
        return JSONResponse(
            content=filepath, 
            status_code=status.HTTP_200_OK
        )
    except Exception:
        return JSONResponse(
            content={"message": "There was an error uploading the file."}, 
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
        )
    finally:
        file.file.close()


@app.post('/proxy/graphql/{dest}')
def forward_request(
    payload: GraphQLPayload,
    dest: Literal['github', 'leetcode']
) -> JSONResponse:
    headers = {'Content-Type': 'application/json'}
    if dest=='github':
        headers['Authorization'] = 'Bearer ' + GITHUB_API_KEY
        url=GITHUB_GRAPHQL_URL
    elif dest=='leetcode':
        url=LEETCODE_GRAPHQL_URL
        headers['Authorization'] = 'Bearer ' + GITHUB_API_KEY
    else:
        return JSONResponse(content={'error': 'Invalid destination'}, status_code=status.HTTP_400_BAD_REQUEST)
    
    r = requests.post(
        url=url,
        headers=headers,
        json=vars(payload)
    )
    return JSONResponse(content=r.json(), status_code=status.HTTP_200_OK)


if __name__ == '__main__':
    uvicorn.run('app:app', host='0.0.0.0', port=PORT)
