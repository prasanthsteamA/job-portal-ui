# Job Portal

A **Job Portal** built with **React**, **TypeScript**, **Ant Design**, and **Axios**, following the **MVC architecture**.  
Users can create, edit, delete, and filter jobs, with **authentication via Bearer Token**.


## 🚀 **Live Hosts**
- **UI Host:** [Job Portal UI](https://job-portal.d2ai0u2ag2wvfc.amplifyapp.com/)

---

## 🚀 **Features**
✅ Secure authentication with **Bearer Token**  
✅ **CRUD** operations for job listings  
✅ **Search & filter** jobs by title, location, and type  
✅ **Ant Design UI**, fully responsive & mobile-friendly  
✅ **MVC architecture** for clean code structure  
✅ **Reusable components & TypeScript interfaces**  

---

## 🛠 **Setup & Installation**


### 1️⃣ Clone the Repository
```sh
git clone https://github.com/prasanthsteamA/job-portal-ui.git
cd job-portal-ui
```

2️⃣ Install Dependencies
```sh
npm install
```

3️⃣ Create a .env file and add API details

```sh
APP_API_BASE_URL=http://localhost:5002/api/jobs
```

4️⃣ Start the Development Server
```sh
npm start
Runs on http://localhost:3000
```



🔥 Project Structure

```sh
📂 src
 ┣ 📂 components        # UI Components (JobCard, JobList, etc.)
 ┣ 📂 pages             # Pages (Login, Job Dashboard)
 ┣ 📂 services          # API Calls (Axios)
 ┣ 📂 interfaces        # TypeScript interfaces
 ┣ 📂 context           # Auth Context for user session
 ┣ 📜 App.tsx          # Main Application
 ┗ 📜 index.tsx        # Entry point
 ```

⚙ API Integration Approach
1️⃣ Authentication

Login & store token & userId in localStorage.
Use Bearer Token in all requests.
2️⃣ Job Management

GET /jobs → Fetch jobs with search & filters.
POST /jobs → Create a job (with userId).
PUT /jobs/:id → Update a job (with userId).
DELETE /jobs/:id → Remove a job (with userId).


📌 Best Practices Followed
✔ TypeScript for strong typing
✔ MVC pattern (Separation of concerns)
✔ Reusable components (JobCard, JobList)
✔ State management with React Context API
✔ Error handling & loading states

