import os
import schemas
import services
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, MetaData,DateTime
from sqlalchemy.orm import declarative_base, sessionmaker


load_dotenv()
DATABASE = os.environ['DATABASE']  # sqlite:///./app.db
engine = create_engine(DATABASE)
Base = declarative_base()
metadata = MetaData()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    username_lower = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def get_db():
    db = SessionLocal()
    return db


@app.post('/validate-input')
async def validate_input(data: schemas.Validate):
    data = data.dict()
    mode, value = data['id'], data['value']
    if mode == 'password':
        valid = services.valid_password(value)
    else:
        db = get_db()
        if mode == 'username':
            valid = services.valid_username(db, User, value)
        elif mode == 'email':
            valid = services.valid_email(db, User, value)
    return {'valid': valid}


@app.post('/register')
async def register(data: schemas.Register):
    data = data.dict()
    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password'].strip()
    db = get_db()
    if services.valid_username(db, User, username) is False:
        return {'error': 'username'}
    elif services.valid_email(db, User, email) is False:
        return {'error': 'email'}
    elif services.valid_password(password) is False:
        return {'error': 'password'}
    else:
        hashed_password = services.argon2_hash(password)
        user = User(
            username=username,
            username_lower=username.lower(),
            email=email,
            hashed_password=hashed_password
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return {'success': f'user {username} is registered'}

