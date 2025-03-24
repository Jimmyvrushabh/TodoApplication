# 📝 TodoApplication

## 📌 About the Project
TodoApplication is a simple and efficient task management app built with **React, Tailwind CSS, and Spring Boot**. It allows users to **add, update, delete, and manage tasks** easily.

## 🚀 Features
✔️ Add new tasks with a title and description  
✔️ Edit task details  
✔️ Mark tasks as completed  
✔️ Delete tasks  
✔️ Responsive UI using **Tailwind CSS**  
✔️ Backend API powered by **Spring Boot & MySQL**  

## 🏗️ Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Spring Boot, Java, Spring Security (for authentication)  
- **Database:** MySQL  
- **API Communication:** RESTful APIs  

## 📸 Screenshots
![Todo Application Screenshot](https://via.placeholder.com/800x400)  
*Sample screenshot of the application (replace with actual image after deployment).*


## 📡 API Endpoints

### 📝 Todo Management APIs

| Method | Endpoint            | Description           | Request Body Example |
|--------|---------------------|-----------------------|----------------------|
| **GET**    | `/api/todos`       | Fetch all todos       | N/A |
| **POST**   | `/api/todos`       | Add a new todo        | `{ "title": "Buy groceries", "description": "Milk, Eggs, Bread", "completed": false }` |
| **PUT**    | `/api/todos/{id}`  | Update a specific todo | `{ "title": "Go to gym", "description": "Workout session", "completed": true }` |
| **DELETE** | `/api/todos/{id}`  | Delete a todo         | N/A |




## 🛠️ Installation & Setup
### 📌 Backend (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/Jimmyvrushabh/TodoApplication.git
   cd TodoApplication
