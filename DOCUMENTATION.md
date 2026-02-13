# 📘 DIY Tutorials — Full Project Documentation

**Karang Taruna RT007/RW013 DIY Tutorials Platform**
*Version 1.0.0 | Last Updated: February 2026*

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started (Local Development)](#4-getting-started-local-development)
5. [Backend API Documentation](#5-backend-api-documentation)
6. [Database Schema](#6-database-schema)
7. [Frontend Web App](#7-frontend-web-app)
8. [Mobile App (Expo)](#8-mobile-app-expo)
9. [Authentication](#9-authentication)
10. [Environment Variables](#10-environment-variables)
11. [Deployment](#11-deployment)
12. [Live URLs](#12-live-urls)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Project Overview

DIY Tutorials is a full-stack platform for the Karang Taruna RT007/RW013 community to share and learn DIY projects. Users can create, browse, and learn from step-by-step tutorials with support for YouTube video embedding, difficulty levels, and creator ownership.

### Key Features
- **User Authentication** — Register, Login, JWT-based sessions
- **Tutorial CRUD** — Create, Read, Update, Delete tutorials
- **YouTube Video Embedding** — Embed YouTube videos in tutorials
- **Difficulty Levels** — Beginner Friendly, Intermediate, Advanced Level
- **Creator Ownership** — Only the creator can edit/delete their tutorials
- **Default Thumbnail** — Auto-applies an Unsplash image when no custom image is provided
- **Read-Only Learning Page** — Dedicated page for learning with no edit controls
- **Mobile App** — Expo/React Native app with the same features
- **Deployed** — Backend on Render, Frontend on Netlify

---

## 2. Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | v18+ | Runtime |
| Express.js | ^4.x | Web framework |
| MongoDB | Atlas | Database |
| Mongoose | ^8.x | ODM |
| bcryptjs | ^2.x | Password hashing |
| jsonwebtoken | ^9.x | JWT authentication |
| cors | ^2.x | Cross-origin requests |
| dotenv | ^16.x | Environment variables |
| nodemon | ^3.x | Development auto-restart |

### Frontend (Web)
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^19.x | UI framework |
| Vite | ^7.x | Build tool |
| React Router | ^7.x | Client-side routing |
| Axios | ^1.x | HTTP client |
| Tailwind CSS | ^4.x | Utility-first CSS |
| DaisyUI | ^4.x | UI component library |

### Mobile (Expo)
| Technology | Version | Purpose |
|-----------|---------|---------|
| Expo | ~54.x | React Native framework |
| expo-router | ^6.x | File-based navigation |
| expo-secure-store | ^15.x | Secure JWT storage |
| react-native-youtube-iframe | ^2.x | YouTube player |
| @expo/vector-icons | ^15.x | Icon library |
| Axios | ^1.x | HTTP client |

---

## 3. Project Structure

```
diy-tutorial-web/
├── DOCUMENTATION.md              # This file
├── backend/                      # Node.js + Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Login, Register, GetMe
│   │   │   └── tutorialController.js # CRUD for tutorials
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # JWT verification
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── Tutorial.js        # Tutorial schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # /api/auth/*
│   │   │   └── tutorialRoutes.js  # /api/tutorials/*
│   │   └── server.js              # Express app entry
│   ├── .env                       # Environment variables (gitignored)
│   └── package.json
│
├── frontend/                     # React + Vite Web App
│   ├── public/
│   │   └── _redirects             # Netlify SPA routing
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── Footer.jsx         # Footer
│   │   │   ├── TutorialCard.jsx   # Tutorial card component
│   │   │   └── ProtectedRoute.jsx # Auth guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── lib/
│   │   │   └── axios.js           # Axios instance + JWT interceptor
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx      # Login screen
│   │   │   ├── RegisterPage.jsx   # Register screen
│   │   │   ├── HomePage.jsx       # Tutorial listing
│   │   │   ├── CreateTutorialPage.jsx  # Create tutorial form
│   │   │   ├── TutorialLearnPage.jsx   # Read-only learning page
│   │   │   └── TutorialDetailPage.jsx  # Edit tutorial (creator only)
│   │   ├── App.jsx                # Routes & layout
│   │   └── main.jsx               # Entry point
│   ├── .env                       # Local API URL (gitignored)
│   ├── index.html
│   └── package.json
│
└── mobile/                       # Expo React Native App
    ├── app/                       # expo-router screens
    │   ├── _layout.js             # Root layout + AuthProvider
    │   ├── index.js               # Auth redirect
    │   ├── login.js               # Login screen
    │   ├── register.js            # Register screen
    │   ├── home.js                # Tutorial list
    │   ├── create.js              # Create tutorial form
    │   └── tutorial/[id]/
    │       ├── index.js           # Learn page + YouTube
    │       └── edit.js            # Edit page (creator only)
    ├── src/
    │   ├── api.js                 # Axios + JWT via SecureStore
    │   ├── AuthContext.js         # Auth state management
    │   └── theme.js               # Colors, fonts, shadows
    ├── app.json                   # Expo configuration
    └── package.json
```

---

## 4. Getting Started (Local Development)

### Prerequisites
- **Node.js** v18 or higher ([download](https://nodejs.org))
- **npm** (comes with Node.js)
- **MongoDB Atlas** account ([sign up free](https://www.mongodb.com/atlas))
- **Expo Go** app on your phone (for mobile app testing)

### Installation

#### Step 1: Clone the Repository
```bash
git clone https://github.com/tezamarlevi/diy-tutorial-web-mobile.git
cd diy-tutorial-web-mobile
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 3: Configure Backend Environment
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/diy_db?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
node_env=development
```

> **Generating a JWT Secret:**
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

#### Step 4: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### Step 5: Configure Frontend Environment
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5001/api
```

#### Step 6: Install Mobile Dependencies
```bash
cd ../mobile
npm install
```

#### Step 7: Configure Mobile API URL
Edit `mobile/src/api.js` and set your Mac's local IP:
```javascript
const API_URL = 'http://<YOUR_MAC_IP>:5001/api';
```
Find your Mac's IP:
```bash
ipconfig getifaddr en0
```

### Running the App Locally

#### Terminal 1 — Start Backend
```bash
cd backend
npm run dev
```
✅ You should see: `MONGODB CONNECTED SUCCESSFULLY! Server started on PORT: 5001`

#### Terminal 2 — Start Web Frontend
```bash
cd frontend
npm run dev
```
✅ Open browser: **http://localhost:5173**

#### Terminal 3 — Start Mobile App
```bash
cd mobile
npx expo start
```
✅ Scan QR code with Expo Go on your phone (same Wi-Fi network)

---

## 5. Backend API Documentation

### Base URL
| Environment | Base URL |
|-------------|----------|
| Local | `http://localhost:5001/api` |
| Production (Render) | `https://diy-tutorial-web-mobile.onrender.com/api` |

---

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |
| GET | `/api/auth/me` | Get current user profile | ✅ |

#### POST `/api/auth/register`
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (201):**
```json
{
  "message": "User registered successfully"
}
```

#### POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### GET `/api/auth/me`
**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "id": "65a1b2c3d4e5f6a7b8c9d0e1",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

---

### Tutorial Endpoints

> ⚠️ All tutorial endpoints require authentication (JWT token in Authorization header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutorials` | Get all tutorials |
| GET | `/api/tutorials/:id` | Get single tutorial |
| POST | `/api/tutorials` | Create a tutorial |
| PUT | `/api/tutorials/:id` | Update a tutorial (creator only) |
| DELETE | `/api/tutorials/:id` | Delete a tutorial (creator only) |

#### GET `/api/tutorials`
**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
[
  {
    "_id": "65a2b3c4d5e6f7a8b9c0d1e2",
    "title": "How to Build a Birdhouse",
    "description": "Learn to build a simple wooden birdhouse",
    "content": "Step 1: Gather materials\nStep 2: Cut the wood...",
    "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "duration": 45,
    "category": "Woodworking",
    "level": "Beginner Friendly",
    "image": "https://images.unsplash.com/photo-...",
    "createdBy": {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "name": "John Doe"
    },
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
]
```

#### POST `/api/tutorials`
**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "How to Build a Birdhouse",
  "description": "Learn to build a simple wooden birdhouse",
  "content": "Step 1: Gather materials\nStep 2: Cut the wood\nStep 3: Assemble",
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "duration": 45,
  "category": "Woodworking",
  "level": "Beginner Friendly",
  "image": "https://example.com/birdhouse.jpg"
}
```

| Field | Type | Required | Description |
|-------|------|:---:|-------------|
| title | String | ✅ | Tutorial title |
| description | String | ✅ | Brief summary |
| content | String | ✅ | Step-by-step instructions |
| duration | Number | ✅ | Duration in minutes |
| category | String | ✅ | Category (e.g., Woodworking) |
| videoUrl | String | ❌ | YouTube URL |
| level | String | ❌ | "Beginner Friendly", "Intermediate", or "Advanced Level" |
| image | String | ❌ | Image URL (defaults to Unsplash image) |

#### PUT `/api/tutorials/:id`
> ⚠️ Only the tutorial creator can update. Returns 403 if not the creator.

Same body as POST. Returns the updated tutorial.

#### DELETE `/api/tutorials/:id`
> ⚠️ Only the tutorial creator can delete. Returns 403 if not the creator.

**Response (200):**
```json
{
  "message": "Tutorial deleted successfully"
}
```

### Testing API with Postman

1. **Register:** POST to `https://diy-tutorial-web-mobile.onrender.com/api/auth/register` with `name`, `email`, `password` in the body
2. **Login:** POST to `https://diy-tutorial-web-mobile.onrender.com/api/auth/login` — copy the `token` from the response
3. **Use token:** In Postman, go to **Authorization → Bearer Token** → paste the token
4. **CRUD tutorials:** Use the token for all `/api/tutorials` requests

---

## 6. Database Schema

### User Model
```javascript
{
  name:      String,    // Required, trimmed
  email:     String,    // Required, unique, lowercase
  password:  String,    // Required, min 6 chars, hashed with bcrypt (12 rounds)
  role:      String,    // Enum: ['user', 'admin'], default: 'user'
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

### Tutorial Model
```javascript
{
  title:       String,               // Required
  description: String,               // Required
  content:     String,               // Required
  videoUrl:    String,               // Optional, default: ""
  duration:    Number,               // Required, in minutes, min: 0
  category:    String,               // Required
  level:       String,               // Enum: ["Beginner Friendly", "Intermediate", "Advanced Level"]
  image:       String,               // Optional, defaults to Unsplash image
  createdBy:   ObjectId (ref: User), // Required, auto-set from JWT
  createdAt:   Date,                 // Auto-generated
  updatedAt:   Date                  // Auto-generated
}
```

---

## 7. Frontend Web App

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Email & password login with split-layout design |
| Register | `/register` | User registration with name, email, password |
| Home | `/` | Grid of tutorial cards with search/filter |
| Create Tutorial | `/create` | Form to create a new tutorial |
| Learn Tutorial | `/tutorial/:id` | Read-only tutorial view with YouTube embed |
| Edit Tutorial | `/tutorial/:id/edit` | Edit form — only accessible by the creator |

### Key Components
- **Navbar** — Navigation bar with logo, links, and user menu (hidden on login/register pages)
- **Footer** — Community credit: "© 2026 Karang Taruna RT007/RW013 DIY Tutorials" (hidden on login/register pages)
- **TutorialCard** — Displays tutorial thumbnail, title, level badge, duration, creator name
- **ProtectedRoute** — Redirects unauthenticated users to `/login`

### Design System
- **Theme:** DaisyUI `nord` theme
- **Primary Color:** Green palette (#2D6A4F)
- **Auth Pages:** Split-layout with decorative gradient panel + form card
- **CSS Framework:** Tailwind CSS + DaisyUI

### SPA Routing on Netlify
The file `frontend/public/_redirects` contains:
```
/*    /index.html   200
```
This ensures all routes are handled by React Router instead of returning 404.

---

## 8. Mobile App (Expo)

### Screens

| Screen | File | Description |
|--------|------|-------------|
| Login | `app/login.js` | Email/password login with branded header, password toggle |
| Register | `app/register.js` | Registration form with validation |
| Home | `app/home.js` | Tutorial card list with pull-to-refresh, create button |
| Create | `app/create.js` | Full create form with level chip picker |
| Learn | `app/tutorial/[id]/index.js` | Read-only view with YouTube embed, creator-only controls |
| Edit | `app/tutorial/[id]/edit.js` | Pre-filled edit form with ownership check |

### How to Test on Physical Device

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Ensure your phone and Mac are on the **same Wi-Fi network**
3. Start the backend: `cd backend && npm run dev`
4. Start Expo: `cd mobile && npx expo start`
5. Scan the QR code with your phone camera
6. The app opens in Expo Go

### Updating the API URL
The mobile app connects to the deployed Render backend by default (`mobile/src/api.js`):
```javascript
const API_URL = 'https://diy-tutorial-web-mobile.onrender.com/api';
```

For local development, change it to your Mac's local IP:
```javascript
const API_URL = 'http://<YOUR_MAC_IP>:5001/api';
```
Find your IP: `ipconfig getifaddr en0`

> ⚠️ **Important:** If using a physical device, disable VPN/DNS blockers (e.g., DNSGuard) that may block local network requests.

### Theme Colors
```javascript
primary:      '#2D6A4F'   // Dark green
primaryLight: '#40916C'   // Medium green
secondary:    '#52B788'   // Light green
accent:       '#95D5B2'   // Pale green
background:   '#F0F4F0'   // Light gray-green
surface:      '#FFFFFF'   // White cards
text:         '#1B1B1B'   // Near black
error:        '#EF4444'   // Red
```

---

## 9. Authentication

### How It Works

```
┌──────────┐     POST /api/auth/login     ┌──────────┐
│  Client  │ ──────────────────────────▶  │  Server  │
│  (Web/   │                              │          │
│  Mobile) │  ◀────────────────────────  │          │
│          │     { token, user }          │          │
└──────────┘                              └──────────┘
      │                                        │
      │  Store token:                          │  Verify: bcrypt
      │  - Web: localStorage                  │  Generate: JWT
      │  - Mobile: SecureStore                 │
      │                                        │
      │  GET /api/tutorials                    │
      │  Authorization: Bearer <token>         │
      │  ────────────────────────────────▶    │
      │                                        │  Verify JWT
      │  ◀────────────────────────────────    │  Extract userId
      │     [tutorials array]                  │
```

### JWT Token
- **Algorithm:** HS256
- **Payload:** `{ id: userId }`
- **Storage:**
  - Web: `localStorage.setItem('token', token)`
  - Mobile: `SecureStore.setItemAsync('token', token)`

### Protected Routes
All tutorial endpoints require the `Authorization: Bearer <token>` header. The `protect` middleware:
1. Extracts the token from the Authorization header
2. Verifies it using the JWT_SECRET
3. Attaches the user to `req.user`
4. Rejects with 401 if invalid

---

## 10. Environment Variables

### Backend (`backend/.env`) — gitignored
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/diy_db` |
| `JWT_SECRET` | Secret key for JWT signing | `30358b047c7d...` (64 chars hex) |
| `PORT` | Server port number | `5001` |
| `node_env` | Environment mode | `development` or `production` |

### Frontend (`frontend/.env`) — gitignored
| Variable | Description | Local Value |
|----------|-------------|-------------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001/api` |

> On Netlify, set `VITE_API_URL` to `https://diy-tutorial-web-mobile.onrender.com/api` in the dashboard.

### Mobile (`mobile/src/api.js`) — hardcoded
| Variable | Description | Production Value |
|----------|-------------|------------------|
| `API_URL` | Backend API URL | `https://diy-tutorial-web-mobile.onrender.com/api` |

> 🔴 **Important:** Never commit `.env` files to Git. They are already in `.gitignore`.

---

## 11. Deployment

### Architecture Diagram
```
┌─────────────┐     HTTPS      ┌─────────────┐     HTTPS      ┌─────────────┐
│   Netlify   │ ─────────────▶ │   Render    │ ─────────────▶ │  MongoDB    │
│  (Frontend) │                │  (Backend)  │                │   Atlas     │
│             │                │             │                │             │
│ React+Vite  │  API requests  │ Express.js  │   Database     │  Cloud DB   │
│ Static Site │ ─────────────▶ │ Node.js     │ ─────────────▶ │             │
└─────────────┘                └─────────────┘                └─────────────┘
                                     ▲
                                     │ API requests
                               ┌─────────────┐
                               │  Expo Go    │
                               │  (Mobile)   │
                               │ React Native│
                               └─────────────┘
```

---

### Backend Deployment (Render)

**Platform:** [Render](https://render.com)
**Repository:** `https://github.com/tezamarlevi/diy-tutorial-web-mobile.git`

#### Render Settings
| Setting | Value |
|---------|-------|
| **Language** | Node |
| **Branch** | `main` |
| **Region** | Singapore (Southeast Asia) |
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/server.js` |

#### Render Environment Variables
| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Your JWT secret key |

> `PORT` and `node_env` are optional — Render assigns its own port.

#### Deployed Backend URL
```
https://diy-tutorial-web-mobile.onrender.com
```

---

### Frontend Deployment (Netlify)

**Platform:** [Netlify](https://netlify.com)
**Repository:** `https://github.com/tezamarlevi/diy-tutorial-web-mobile.git`

#### Netlify Settings
| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

> ⚠️ Publish directory is `dist` (not `frontend/dist`) because the base directory is already `frontend`.

#### Netlify Environment Variables
| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://diy-tutorial-web-mobile.onrender.com/api` |

#### Deployed Frontend URL
```
https://diy-tutorial-web.netlify.app
```

---

### Mobile App Deployment (Expo EAS) — Optional

For building standalone APK/IPA files:

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure your project:
```bash
cd mobile
eas build:configure
```

4. Build for Android (APK):
```bash
eas build --platform android --profile preview
```

5. Build for iOS (requires Apple Developer account — $99/year):
```bash
eas build --platform ios
```

---

### CORS Configuration

The backend allows requests from the following origins (`backend/src/server.js`):

```javascript
const allowedOrigins = [
    "http://localhost:5173",          // Local frontend dev
    "http://localhost:5174",          // Local frontend alt port
    "https://heritageecommerce.netlify.app",
    "https://diy-tutorial-web-mobile.onrender.com",
    "https://diy-tutorial-web.netlify.app"   // Netlify frontend
];
```

Mobile apps and Postman requests are also allowed (requests with no `Origin` header).

---

## 12. Live URLs

| Service | URL |
|---------|-----|
| **Backend API** | https://diy-tutorial-web-mobile.onrender.com |
| **Frontend Web** | https://diy-tutorial-web.netlify.app |
| **GitHub Repo** | https://github.com/tezamarlevi/diy-tutorial-web-mobile |
| **Mobile App** | Install Expo Go → scan QR from `npx expo start` |

---

## 13. Troubleshooting

### Common Issues

#### "Login failed" on Mobile
- **Cause:** Wrong API URL or phone can't reach the backend
- **Fix:**
  1. Make sure backend is running (or deployed on Render)
  2. Check `mobile/src/api.js` has the correct URL
  3. For local dev: phone and Mac must be on the **same Wi-Fi**
  4. Disable VPN/DNS blockers (e.g., DNSGuard) temporarily

#### Blank Page on Netlify
- **Cause:** Missing `_redirects` file or env var
- **Fix:**
  1. Ensure `frontend/public/_redirects` exists with content: `/*    /index.html   200`
  2. Set `VITE_API_URL` in Netlify dashboard environment variables
  3. Publish directory should be `dist` (not `frontend/dist`)

#### Blank Page on localhost
- **Cause:** Missing or invalid environment variable crashing React
- **Fix:** Check browser console (F12) for errors. Common: Google Analytics init failing without `VITE_GA_MEASUREMENT_ID`

#### "Port 5001 is already in use"
```bash
# Find what's using port 5001
lsof -i :5001 | grep LISTEN
# Kill the process
kill -9 <PID>
# Restart the backend
npm run dev
```

#### "CORS Error" in Browser
- Check `backend/src/server.js` — make sure your frontend URL is in `allowedOrigins`
- After adding, commit, push, and redeploy on Render

#### MongoDB Connection Failed
- Check your `MONGO_URI` in `.env` or Render env vars
- Whitelist your IP in MongoDB Atlas: **Network Access → Add IP → Allow Access from Anywhere** (set to `0.0.0.0/0`)
- Make sure your database user password has no special characters that need URL encoding

#### Render Deployment Issues
- **Start command** should be `node src/server.js` (not `npm run dev`)
- **Root directory** must be `backend`
- Check Render logs for errors in the dashboard

#### Expo Build Warnings
```
react-native-screens@4.23.0 - expected version: ~4.16.0
```
These are just warnings. To fix:
```bash
cd mobile
npx expo install react-native-screens react-native-webview
```

---

## 📞 Contact & Credits

**Organization:** Karang Taruna RT007/RW013
**Application:** DIY Tutorials Platform
**Year:** 2026

© 2026 Karang Taruna RT007/RW013 DIY Tutorials. All rights reserved.
