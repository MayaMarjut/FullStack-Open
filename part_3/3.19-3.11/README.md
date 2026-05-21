# Phonebook Application

Full Stack Open Phonebook app with:
- React frontend
- Node.js and Express backend

## Live Application

https://phonebook-application.fly.dev/

## Run Locally

### Backend

1. Open a terminal in `backend`
2. Install dependencies:
	`npm install`
3. Start server:
	`npm run dev`

Backend runs on port 3001.

### Frontend

1. Open another terminal in `frontend`
2. Install dependencies:
	`npm install`
3. Start development server:
	`npm run dev`

### Build Frontend For Production

1. In `frontend`, create the build:
	`npm run build`
2. Copy build output to backend:
	`cp -r dist ../backend`
