# Pixelate

## Overview

This project so far includes a backend and frontend for a web app that handles user login and signup. Currently, the backend and frontend are not connected, but both parts work independently.

## Prerequisites

Before you start, ensure that you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Postman](https://www.postman.com/downloads/) for testing API requests
- A code editor like [VS Code](https://code.visualstudio.com/) (optional, for editing the code)

## Getting Started

1. **Clone the repository** or download the project files to your local machine.
    ```bash
    git clone https://github.com/muskanmorshed/pixelate.git
    ```
## Backend
1. **Navigate to the backend directory**:
   ```bash
   cd backend
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the backend server**:
    ```bash
    npm start
    ```
This will start the backend server.

## Frontend
1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Install dnd kit**:
    ```bash
    npm install @dnd-kit/core
    ```  
4. **Start the frontend server**:
    ```bash
    npm start
    ```
This will open the frontend web application in your browser.

## To Run tests
    npm test

## Troubleshooting
- If you encounter issues with the backend, make sure that you have the correct environment variables set up.
- If the frontend does not open automatically, try navigating to `http://localhost:3000` manually in your browser.
- If you are having issues running the *backend* because nodemon is not available, navigate to the backend and install nodeman:
    ```bash
    cd backend
    npm install -g nodemon
    ```
- If you are having issues with the *frontend* running, try installing these dependencies:
    ```bash
    npm install react-router-dom react-redux @mui/material
    ```

## Future Improvements
- Connect the frontend to the backend so that the login and signup functionality works end-to-end.
- Implement error handling and form validation in the frontend.
- Implement feature for adding and deleting posts
- Implement feature for saving posts
- Homepage design
##
### Authors:
- Malasa Khan
- Mehreen Morshed
- Muskan Morshed
- Shimza Warraich
