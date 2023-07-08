import os

from bardapi import Bard 
from fastapi import FastAPI, File, UploadFile, status
from fastapi.responses import FileResponse, Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from settings import PORT, UPLOAD_FILEPATH, APPEND_PROMPT
from utils.pdf_reader import pdf_to_text
from utils.filepaths import clean_filepath, to_uuid_filename

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

bard = Bard()

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

if __name__ == '__main__':
    uvicorn.run('app:app', port=PORT, reload=True)
