 🧠 NotePilot AI – A Personal Productivity App

A sleek fullstack productivity tool that empowers users to manage notes and tasks in one unified dashboard — with optional AI-powered summarization via OpenAI.

---

## 🔗 Live Demo

🌐 [https://my-workspace.vercel.app](https://my-workspace.vercel.app) *(deployed with Vercel)*

---

## 🚀 Features

- ✅ Secure login & registration (NextAuth.js with Credentials Provider)
- 🗒️ **Notes tab** – create, edit, delete notes with AI-powered summary option
- ✅ **Tasks tab** – add, update, mark as done, delete
- 🔒 Protected routes — only accessible when authenticated
- 🧠 Bonus: Summarize notes using **GPT-3.5** via OpenAI API
- 🌙 Global state with **Zustand** for a smooth experience
- 💡 Clean, responsive UI built with **Tailwind CSS**

---

## 🧱 Tech Stack

| Layer           | Tech                                  |
|----------------|----------------------------------------|
| Frontend        | Next.js 15 (App Router) + Tailwind CSS |
| Backend API     | Next.js API Routes                    |
| Authentication  | NextAuth.js (Credentials Provider)    |
| State Management| Zustand                                |
| Database        | MongoDB + Mongoose                    |
| Bonus AI        | OpenAI API (GPT-3.5 Turbo)            |

---

## 📁 Folder Structure

```bash
note-pilot-ai/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.js
│   │   │   └── login/route.js
│   │   ├── notes/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   ├── tasks/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   └── summarize/route.js
│   ├── login/page.jsx
│   ├── register/page.jsx
│   └── dashboard/
│       ├── layout.jsx
│       ├── page.jsx
│       ├── notes/page.jsx
│       └── tasks/page.jsx
├── components/
│   ├── NoteCard.jsx
│   ├── TaskItem.jsx
│   └── Modal.jsx
├── models/
│   ├── User.js
│   ├── Note.js
│   └── Task.js
├── lib/
│   └── db.js
├── store/
│   └── index.js
├── Providers.jsx
├── .env.local
└── README.md
⚙️ Setup Instructions
bash
Copy
Edit
git clone https://github.com/VishalXDev/my-workspace.git
cd my-workspace

# Install dependencies
npm install

# Add environment variables
touch .env.local
.env.local
env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
OPENAI_API_KEY=your_openai_api_key   # optional for AI summaries
Run the app locally
bash
Copy
Edit
npm run dev
🔐 Auth Flow (Credentials)
Register → /register

Login → /login

Protected Dashboard → /dashboard

Auth handled securely with NextAuth Credentials Provider

🔌 API Routes (Postman Ready)
📥 Import collection: MyWorkspace.postman_collection.json

Route	Method	Description
/api/auth/signup	POST	Register user
/api/auth/login	POST	Login via credentials
/api/notes	GET, POST	Get or create notes
/api/notes/:id	PUT, DELETE	Update or delete note
/api/tasks	GET, POST	Get or create tasks
/api/tasks/:id	PUT, DELETE	Update or delete task
/api/summarize	POST	Generate note summary AI

🧠 Bonus: AI Summarization
AI assistant powered by OpenAI's GPT-3.5

Click "Summarize with AI" on any note

Sends content to /api/summarize

Result shown in a modal

Graceful fallback if quota is exceeded or no API key

👤 Author
Vishal Dwivedy
🔗 github.com/VishalXDev

✅ Project Status
📂 Submitted for Maketronics Internship Assignment

🕒 Built in ~12 hours

✅ Fully Functional with Bonus Features

🔥 Ready for production / demo

Feel free to fork, explore, or enhance the project. Contributions welcome!