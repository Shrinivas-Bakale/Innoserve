# Innoserve - Service Marketplace

A full-stack service marketplace application built with React and Firebase.

## Project Structure

- `client/` - React frontend application
- `server/` - Firebase functions backend

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v8 or higher recommended)
- Firebase CLI (for running functions locally)

### Client Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   The client will be available at http://localhost:5174

### Server Setup

1. Navigate to the server/functions directory:
   ```
   cd server/functions
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase locally:
   ```
   firebase login
   ```

4. Start the Firebase emulators:
   ```
   npm run serve
   ```
   The server API will be available at http://127.0.0.1:5001

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/example/getAllServices` - Fetch all services
- `GET /api/example/getServiceById/:id` - Fetch a specific service
- `POST /api/cart` - Add item to cart
- `GET /api/orders` - Get user orders

## Technologies Used

- **Frontend**: React, TailwindCSS, Firebase Authentication
- **Backend**: Firebase Functions, Firestore
- **Payment**: Razorpay

## Deployment

The application can be deployed using Firebase Hosting for both frontend and backend.

```
firebase deploy
``` 