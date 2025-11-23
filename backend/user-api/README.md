# User API - Node.js Backend

A simple RESTful API built with Node.js, Express, and MongoDB for managing user data.

## 📋 Features

- ✅ CRUD operations for user management
- ✅ MongoDB database integration
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Request logging
- ✅ Docker support for easy local development

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB
- **ODM**: Mongoose
- **Development**: Nodemon
- **Environment**: dotenv
- **Containerization**: Docker & Docker Compose

## 📦 Project Structure

```
user-api/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   └── userController.js  # User business logic
│   ├── middlewares/
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── logger.js          # Request logger
│   │   └── notFound.js        # 404 handler
│   ├── models/
│   │   └── User.js            # User schema & model
│   └── routes/
│       └── userRoutes.js      # API routes
├── .env                       # Environment variables
├── .gitignore
├── docker-compose.yml         # Docker configuration
├── package.json
├── server.js                  # Entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- npm or yarn package manager

### Installation & Running Locally

Follow these steps to run the project on your local machine:

#### 1. Clone the repository
```bash
git clone <repository-url>
cd user-api
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-api
```

#### 4. Start MongoDB with Docker
Run MongoDB in a Docker container:
```bash
npm run docker:up
```

Or manually:
```bash
docker-compose up -d
```

This will start MongoDB on `localhost:27017`

#### 5. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

You should see:
```
🚀 Server berjalan di http://localhost:3000
📚 API Documentation: http://localhost:3000
🔗 MongoDB terhubung
✅ MongoDB terhubung dengan sukses
```

## 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:up` | Start MongoDB container |
| `npm run docker:down` | Stop and remove MongoDB container |
| `npm run docker:logs` | View MongoDB container logs |
| `npm run docker:restart` | Restart MongoDB container |
| `docker ps` | List running containers |

### Stop the database
```bash
npm run docker:down
```

### Remove database data (reset)
```bash
docker-compose down -v
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/users` | Create a new user | `{ name, email, age?, phone? }` |
| GET | `/users` | Get all users | - |
| GET | `/users/:id` | Get user by ID | - |
| DELETE | `/users/:id` | Delete user by ID | - |

### User Schema

```javascript
{
  name: String,      // Required, trimmed
  email: String,     // Required, unique, lowercase, validated
  age: Number,       // Optional, must be >= 0
  phone: String,     // Optional, trimmed
  createdAt: Date,   // Auto-generated
  updatedAt: Date    // Auto-generated
}
```

## 🧪 API Testing Examples

### Create a new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "phone": "081234567890"
  }'
```

### Get all users
```bash
curl http://localhost:3000/api/users
```

### Get user by ID
```bash
curl http://localhost:3000/api/users/<user_id>
```

### Delete user
```bash
curl -X DELETE http://localhost:3000/api/users/<user_id>
```

### Using PowerShell (Windows)
```powershell
# Create user
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"name":"John Doe","email":"john@example.com"}'

# Get all users
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Get
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run the server in production mode |
| `npm run dev` | Run the server with nodemon (auto-reload) |
| `npm run docker:up` | Start MongoDB container |
| `npm run docker:down` | Stop MongoDB container |
| `npm run docker:logs` | View MongoDB logs |
| `npm run docker:restart` | Restart MongoDB |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-api
```

### Docker Compose

The `docker-compose.yml` file configures:
- MongoDB latest version
- Port mapping: `27017:27017`
- Persistent data storage with named volume
- Auto-restart policy

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error**: `connect ECONNREFUSED ::1:27017`

**Solution**: Make sure MongoDB is running in Docker
```bash
# Check if container is running
docker ps

# If not running, start it
npm run docker:up

# Check logs for errors
npm run docker:logs
```

### Port Already in Use
**Error**: `Port 3000 is already in use`

**Solution**: Change the port in `.env` file or stop the process using port 3000

### Docker Desktop Not Running
**Error**: `Cannot connect to the Docker daemon`

**Solution**: Start Docker Desktop application

### Module Not Found
**Error**: `Cannot find module...`

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is licensed under the ISC License.



