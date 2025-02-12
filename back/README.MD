# Backend API

This is the backend for a full-stack application using Node.js, Express, Airtable as the database, and React for the frontend. The backend is containerized with Docker.

## Features
- Express.js for handling API requests
- Airtable as the database
- JWT authentication
- File uploads with Multer
- TypeORM for database management
- Environment variables using dotenv
- Docker for containerization

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/No-Country-simulation/h4-02-vocaltech.git
   cd back
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file with the necessary environment variables:
   ```sh
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id
   JWT_SECRET=your_jwt_secret
   ```

4. Build the project:
   ```sh
   npm run build
   ```

## Running the Server

### Locally
```sh
npm start
```

### Using Docker
1. Build the Docker image:
   ```sh
   docker build -t backend-api .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 --env-file .env backend-api
   ```

## API Endpoints
| Method | Endpoint       | Description       |
|--------|--------------|-----------------|
| GET    | `/users`      | Get all users   |
| POST   | `/register`   | Register a user |
| POST   | `/login`      | Login user      |

## Contributing
Feel free to open issues and submit pull requests.

## License
