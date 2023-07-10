import os

from bardapi import Bard 
from fastapi import FastAPI, File, Header, Request, status, UploadFile
from fastapi.responses import FileResponse, Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import Literal, List
import uvicorn

from settings import (
    APPEND_PROMPT, 
    GITHUB_API_KEY,
    GITHUB_GRAPHQL_URL, 
    LEETCODE_GRAPHQL_URL,
    PORT,
    UPLOAD_FILEPATH
)
from utils.auth import auth_request
from utils.parse_file import read_text, read_pdf, read_docx
from utils.filepaths import clean_filepath, to_uuid_filename
from models.payload import GraphQLPayload


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
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
    filepath = os.path.join(UPLOAD_FILEPATH, filepath)
    f = read_pdf if filepath.endswith('.pdf') else \
        read_text if filepath.endswith('.txt') else \
        read_docx if filepath.endswith('.docx') else None
    if f:
        return JSONResponse(
            content=bard.get_answer(f(filepath) + APPEND_PROMPT)['content'],
            status_code=status.HTTP_200_OK
        )
    else:
        return JSONResponse(content='No content found in file.', status_code=status.HTTP_200_OK)
    

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


@app.get('/file/list')
def list_files(
    r: Request
) -> JSONResponse:
    if auth_request(r):
        return JSONResponse(content=os.listdir('uploaded'))
    else:
        return JSONResponse(content={'error': 'Invalid credenials'}, status_code=status.HTTP_401_UNAUTHORIZED)
    

@app.get('/file/delete')
def list_files(
    files: List[str],
    r: Request
) -> JSONResponse:
    if auth_request(r):
        res = {'deleted': [], 'invalid': []}
        for file in files:
            try:
                os.remove(os.path.join(UPLOAD_FILEPATH, file))
                res['deleted'].append(file)
            except FileNotFoundError:
                res['invalid'].append(file)
        return JSONResponse(content=res, status_code=status.HTTP_200_OK)
    else:
        return JSONResponse(content={'error': 'Invalid credenials'}, status_code=status.HTTP_401_UNAUTHORIZED)


@app.post('/proxy/graphql/{dest}')
def forward_request(
    r: Request,
    payload: GraphQLPayload,
    dest: Literal['github', 'leetcode']
) -> JSONResponse:
    headers = {'Content-Type': 'application/json'}
    if dest=='github':
        headers['Authorization'] = r.headers.get('Authorization', 'Bearer ' + GITHUB_API_KEY)
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
