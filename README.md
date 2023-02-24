# FastAPI - React
Example of user registration, alembic migrations and theme change

### Start frontend
npm start

### Start backend
gunicorn -w 1 -k uvicorn.workers.UvicornWorker -b 127.0.0.1:5000 main:app

### Migrations
alembic revision --autogenerate -m "Update"
alembic upgrade head
