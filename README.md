# Backend

This repository contains the backend service for the SecondCycle platform, which is responsible for all server-side operations, database interactions, and API management.

## Getting Started

These instructions will get your copy of the backend service up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://npmjs.com/) (Node Package Manager)

### Installation

Follow these steps to set up your development environment:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:SecondCycleRO/backend.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the `backend` directory with the following content, replacing values as appropriate:

   ```env
   PORT=3010
   MONGODB_URI=mongo_uri_here
   ACCESS_TOKEN_SECRET=jwt_secret_here
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Start the development server:**

   ```bash
   npm start
   ```

   The server should now be running and accessible at `http://localhost:3010`.

## API Endpoints

Here is a list of available API endpoints.

### User Endpoints

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user and receive a token.
- `GET /api/users/profile`: Get the profile of the authenticated user.
- `PUT /api/users/profile`: Update the profile of the authenticated user.
- `DELETE /api/users/:id`: Delete a user (admin only).

### Product Endpoints

- `GET /api/products`: Get all products.
- `GET /api/products/:id`: Get a single product by ID.
- `POST /api/products`: Create a new product.
- `PATCH /api/products/:id`: Update a product by ID.
- `DELETE /api/products/:id`: Delete a product by ID.

### Transaction Endpoints

- `GET /api/transactions`: Get all transactions (admin only).
- `GET /api/transactions/:id`: Get a single transaction by ID.
- `POST /api/transactions`: Create a new transaction.
- `PATCH /api/transactions/:id`: Update a transaction by ID.
- `DELETE /api/transactions/:id`: Delete a transaction by ID (admin only).

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Express](https://expressjs.com/) - Web application framework.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/SecondCycleRO/.github/blob/master/CONTRIBUTING.MD) for details on our code of conduct.
