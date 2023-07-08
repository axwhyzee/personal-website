from pydantic import BaseModel
from typing import Any, Dict, Optional

class GraphQLPayload(BaseModel):
    query: str
    variables: Optional[Dict[str, Any]] = None