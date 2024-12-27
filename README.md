This project is a Node.js application that uses Express.js to create a RESTful API for managing users. The application connects to a PostgreSQL database.

## Approach

1. **Project Setup**: 
   - Initialized the project with `package.json` and installed necessary dependencies including `express`, `cors`, `dotenv`, and `pg`.
   - Configured the project to use `nodemon` for development to automatically restart the server on file changes.

2. **Environment Configuration**:
   - Created a `.env` file to store environment variables such as `DATABASE_URL` and `PORT`.
   - Ensured `.env` is included in `.gitignore` to prevent sensitive information from being committed to the repository.

3. **Database Connection**:
   - Configured a connection pool to the PostgreSQL database.
   - Implemented functions to interact with the database, including fetching all users, fetching a user by ID, creating a user, and deleting a user.

4. **API Endpoints**:
   - Set up Express.js routes in `api/server.js` to handle CRUD operations for users.
   - Used middleware such as `cors` and `express.json` to handle CORS and JSON request bodies.

5. **Deployment**:
   - Configured the project for deployment on Vercel with `vercel.json`.

## Key Takeaways

- **Environment Management**: Using environment variables to manage configuration settings securely.
- **Database Interaction**: Setting up and managing a connection pool to a PostgreSQL database.
- **API Development**: Creating RESTful API endpoints and handling HTTP requests and responses.
- **Deployment**: Configuring and deploying a Node.js application on Vercel.

## Challenges

- **Database Configuration**: Ensuring the database connection is correctly configured and handling potential connection errors.
- **Error Handling**: Implementing robust error handling to provide meaningful error messages and status codes.# DISC-Discovery-Application-Backend

