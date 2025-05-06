# Firebase User Platform Monorepo

This monorepo contains both the backend and frontend for a Firebase-based user platform. It is structured to manage user data through Firebase Firestore, with functionality for both data updates and retrieval, utilizing Express.js for the backend and Next.js for the frontend. The project also includes Firebase Emulator for local testing and a Redux store for state management in the frontend.

## Project Overview

The project consists of two primary components:

1. **Backend** – A Node.js/Express API that interacts with Firebase Firestore to fetch and update user data. The backend also implements authentication middleware to secure endpoints.

2. **Frontend** – A Next.js app that connects to the backend API to fetch and display user data, utilizing React and Material UI (MUI) for UI components. Redux is used for state management, and Firebase Authentication is integrated for login functionality.

## Requirements

- **Node.js**: Version 22.x
- **pnpm**: For package management
- **Firebase SDK**: For Firestore and Authentication
- **Firebase Emulator**: For local development

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/pyroblazer/firebase-user-platform-monorepo.git
   cd firebase-user-platform-monorepo
   ```

2. Install all dependencies from the root:

   ```
   pnpm install
   ```

3. Set up Firebase:

   * Create a Firebase project in the Firebase Console.
   * Add Firebase SDK configuration to the appropriate config files.
   * Enable Firestore and Firebase Authentication.

4. Start backend API:

   ```
   pnpm --filter backend run start
   ```

   Or using Firebase Emulator:

   ```
   pnpm --filter backend run build && firebase emulators:start --only functions
   ```

5. Start frontend app:

   ```
   pnpm --filter frontend run dev
   ```

6. The app will run at [http://localhost:3000](http://localhost:3000).

## Monorepo Setup (via Turborepo)

1. Install Turborepo globally (if not already installed):

   ```
   pnpm add -g turbo
   ```

2. Run the entire project with Turborepo:

   ```
   turbo dev
   ```

## Features

### Backend

* **update-user-data**: Updates user data in Firebase Firestore.
* **fetch-user-data**: Fetches user data from Firebase Firestore.
* **Auth Middleware**: Secures API routes by validating the request token.

### Frontend

* **Firebase Authentication**: Provides login functionality.
* **React MUI Components**: Responsive UI components.
* **Redux**: Manages state for data fetching, loading, success, and error messages.
* **API Integration**: Fetches and displays user information from the backend.