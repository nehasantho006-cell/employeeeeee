# 👥 Employee Management App — Backend Integration

A full-stack **Employee Management Application** with an Express.js + MongoDB Atlas backend serving a pre-built frontend (`dist/`).

---

## 📁 Project Structure

```
employee-app/
├── app.js              ← Backend server (Express + Mongoose)
├── package.json        ← Node dependencies
├── .env.example        ← Sample env file (copy to .env)
├── .gitignore
└── dist/               ← Frontend build (DO NOT EDIT)
    ├── index.html
    ├── style.css
    └── app.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free cluster.
2. Create a database user (username & password).
3. Whitelist your IP address (or allow access from anywhere: `0.0.0.0/0`).
4. Copy your connection string.

Open `app.js` and update the `MONGODB_URI` on line 17–18:
```js
const MONGODB_URI =
  "mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/employeeDB?retryWrites=true&w=majority";
```

> **Tip:** You can also set it via an environment variable by creating a `.env` file (copy from `.env.example`).

### 3. Run the Server
```bash
npm start
```

The server starts at **http://localhost:3000**

---

## 📡 REST API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/employees`      | Retrieve **all** employees   |
| GET    | `/api/employees/:id`  | Retrieve **one** employee    |
| POST   | `/api/employees`      | **Add** a new employee       |
| PUT    | `/api/employees/:id`  | **Update** an employee       |
| DELETE | `/api/employees/:id`  | **Delete** an employee       |

### Example Request Body (POST / PUT)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "position": "Software Engineer",
  "department": "Engineering",
  "salary": 75000,
  "phone": "+91-9876543210"
}
```

### Example Response
```json
{
  "success": true,
  "message": "Employee added successfully",
  "data": {
    "_id": "64abc...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    ...
  }
}
```

---

## 🛠 Tech Stack

| Layer    | Technology       |
|----------|------------------|
| Runtime  | Node.js          |
| Framework| Express.js       |
| Database | MongoDB Atlas    |
| ODM      | Mongoose         |
| CORS     | cors             |

---

## ⚙️ Employee Schema

| Field        | Type   | Required | Notes                         |
|--------------|--------|----------|-------------------------------|
| `name`       | String | ✅        | Full name                     |
| `email`      | String | ✅        | Unique, lowercase             |
| `position`   | String | ✅        | Job title                     |
| `department` | String | ✅        | Team/department               |
| `salary`     | Number | ✅        | Annual salary                 |
| `phone`      | String | ❌        | Optional contact number       |
| `joinDate`   | Date   | ❌        | Defaults to current date      |

---

## 📝 Notes

- **Do not edit or modify the `dist/` folder** — it contains the pre-built frontend.
- All backend logic is written exclusively in `app.js`.
- The server serves the frontend statically and exposes REST APIs under `/api/`.
