import docx2txt
import PyPDF2

def read_pdf(filepath: str):
    reader = PyPDF2.PdfReader(filepath)
    if reader.pages == 0:
        raise ValueError('PDF has no content')

    return reader.pages[0].extract_text()

def read_text(filepath: str):
    with open(filepath, 'r') as f:
        return f.read()
    
def read_docx(filepath: str):
    return docx2txt.process(filepath)