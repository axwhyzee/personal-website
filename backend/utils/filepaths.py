from typing import Optional
import re
from uuid import uuid4

UUID_PATTERN = re.compile(r'^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$', re.IGNORECASE)

def is_valid_uuid(s: str) -> bool:
    return bool(UUID_PATTERN.match(s))

def to_uuid_filename(filename: str) -> str:
    ext = filename.split('.')[-1]
    return f'{uuid4()}.{ext}'

def clean_filepath(filepath: str) -> Optional[str]:
    try:
        filename, ext = filepath.split('.')
        if not is_valid_uuid(filename):
            raise ValueError('Invalid filename format. Filename is not a valid UUID.')
        return filepath
    except ValueError:
        raise ValueError('Invalid filepath format. Missing or invalid file extension.')