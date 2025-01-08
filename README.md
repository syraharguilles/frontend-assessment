# **Project Management System**

A responsive project management system built with React, Material-UI, and a JSON Server backend. This application allows users to manage projects, update column headers dynamically, and maintain favorites.

## **Features**
- Edit projects.
- Dynamic column headers with inline editing.
- Mark projects as favorites.
- Responsive design for desktop and mobile.
- Integrated Material-UI for styling and components.

---

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18+)
  - Check if Node.js is installed:
    ```bash
    node -v
    ```
  - If not installed, download and install it from the [official Node.js website](https://nodejs.org/).

- **JSON Server** (for the mock API)
  - Check if JSON Server is installed:
    ```bash
    json-server --version
    ```
  - If not installed, you can install it globally:
    ```bash
    npm install -g json-server
    ```

### **Setup Instructions**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/syraharguilles/frontend-assessment.git
   cd frontend-assessment

2. **Install Dependencies:**
    ```bash
   npm install

3. **Start JSON Server: JSON Server will act as the mock backend.**
    ```bash
   json-server --watch db.json --port 3001

4. **Run the Application: Start the React application.**
    ```bash
   npm start

5. **Access the Application: Open your browser and navigate to:**
    ```bash
   http://localhost:3000