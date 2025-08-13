# 🚀 Bootcamp Project Tracker
A simple full-stack web application to manage and track student projects during a bootcamp.  
Built with **Node.js + Express** for the backend and **Vanilla JavaScript, HTML, and CSS** for the frontend

## Features
- Create new projects with name, description, and status (`ongoing` or `completed`).  
- View all existing projects.  
- Edit existing projects.  
- Delete projects.  
- Fully connected frontend and backend using API calls.
- 
## Tech Stack
**Backend:**  
- Node.js  
- Express.js  
- dotenv (for environment variables)  
- CORS  

**Frontend:**  
- HTML  
- CSS  
- JavaScript (Fetch API)

---

## Installation & Setup
1. Clone the repository
git clone https://github.com/laviee143/project-tracker.git
cd project-tracker
2.Install backend dependencies
cd backend
npm install
3. Set up environment variables
PORT=3000
APP_NAME=Bootcamp Project Tracker
4. Start the backend server
node index.js
The backend server will run at: http://localhost:3000
5. Open the frontend
Open frontend/index.html in your browser.
Make sure the API_URL in app.js matches your backend server: const API_URL = 'http://localhost:3000/api/projects';

API Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /api/projects      | Get all projects     |
| GET    | /api/projects/\:id | Get a single project |
| POST   | /api/projects      | Create a new project |
| PUT    | /api/projects/\:id | Update a project     |
| DELETE | /api/projects/\:id | Delete a project     |



     UI SCREENSHOTS
<img width="1895" height="886" alt="image" src="https://github.com/user-attachments/assets/8cc49581-6486-406f-884d-bb3626fa08ae" />
<img width="1808" height="893" alt="image" src="https://github.com/user-attachments/assets/cf104731-471e-4ac7-ad0c-f3c804d860a3" />
<img width="1883" height="872" alt="image" src="https://github.com/user-attachments/assets/827a8977-28b5-4f76-b234-8d77f4bc4d8b" />
<img width="512" height="869" alt="image" src="https://github.com/user-attachments/assets/f2786168-26f5-4670-b6c5-8fb353c3eabd" />



---

## ❓ Questions / Contact

If you have any questions or need help with this project, feel free to reach out via email:  
**laviee1434@gmail.com**

Thank you for checking out this project! 🙏

