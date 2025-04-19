# 📁 File Uploader

A simplified file storage app inspired by Google Drive.

## 🚀 Project Overview

The goal is to build a basic file uploader with user authentication, folder support, and cloud storage integration. Authenticated users can upload, manage, and view files and folders.

## 📦 Features

- ✅ Session-based authentication with Passport.js
- ✅ File uploads with Multer
- ✅ Folder management (CRUD)
- ✅ File details view (name, size, upload time)
- ✅ File download support
- ✅ Cloud storage support (Cloudinary)

## 🛠️ Tech Stack

- Node.js
- Express
- Prisma
- Passport.js
- Multer
- Cloudinary (for cloud storage)
- PostgreSQL (via Prisma)

## 📝 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/file-uploader.git
cd file-uploader
```

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:
DATABASE_URL=your_database_url SESSION_SECRET=your_session_secret CLOUDINARY_URL=your_cloudinary_url

### 4. Set up the database

npx prisma migrate dev --name init

### 5. Start the development server

npm run dev
