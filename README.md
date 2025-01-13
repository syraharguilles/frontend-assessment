# **Project Management System**

A responsive project management system built with React, Material-UI, and an Express.js backend. This application allows users to manage projects, update column headers dynamically, and maintain favorites.

## **Features**
- Create, edit and display project details.
- Dynamic column headers with inline editing.
- Mark projects as favorites.
- Responsive design for desktop and mobile.
- Integrated Material-UI for styling and components.

---

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Code Editor (Recommended: Visual Studio Code)**
  - Download and install Visual Studio Code for editing and running the project.
  - Open the terminal in VS Code:
    - **Windows/Linux**: Press `Ctrl + ```
    - **MacOS**: Press `Cmd + ```

- **Node.js** (v18+)
  - Check if Node.js is installed:
    ```bash
    node -v
    ```
  - If not installed, download and install it from the [official Node.js website](https://nodejs.org/).

- **Express Server** (for the mock API)
  - Ensure the required dependencies are installed for running the server:
    ```bash
    npm list express
    ```
    - If Express is installed, this command will output the installed version of Express.
    
    - If Express is not installed, you will see a message similar to:
      ```bash
      -- (empty)
      ```

      - Run this script to install the express:
        ```bash
        npm install express body-parser cors
        ```
---

### **Setup Instructions**
1. **Clone the Repository: Open your terminal and run**
   ```bash
   git clone https://github.com/syraharguilles/frontend-assessment.git
   cd frontend-assessment
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application**
  - Using npm run dev (Recommended)
    This script starts both the React application and the Express server concurrently. Open your terminal and run:
    ```bash
    npm run dev
    ```

  - If you prefer to run the React application and Express server separately, follow these steps:

    - Start the Express Server
      Open a terminal, navigate to the project directory, and run:
      ```bash
      npm run server
      ```
    - Start the React Application
      Open another terminal, navigate to the project directory, and run:
      ```bash
      npm start
      ```
  
  - React App will run on http://localhost:3000.
  - Express Server (mock API) will run on http://localhost:3001.

4. **Access the Application:**
   Open your browser and navigate to:
   - Application
   ```text
   http://localhost:3000
   ```

   - Server
   ```text
   http://localhost:3001
   ```