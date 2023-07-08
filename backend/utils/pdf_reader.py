import PyPDF2

def pdf_to_text(filepath: str):
    reader = PyPDF2.PdfReader(filepath)
    if reader.pages == 0:
        raise ValueError('PDF has no content')

    return reader.pages[0].extract_text()