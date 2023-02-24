from pydantic import BaseModel


class Validate(BaseModel):
    id: str
    value: str


class Register(BaseModel):
    username: str
    email: str
    password: str

