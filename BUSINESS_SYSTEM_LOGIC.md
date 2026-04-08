# 📄 DIY Tutorials — Business Logic & System Logic Documentation

**Karang Taruna RT007/RW013 DIY Tutorials Platform**
*Version 1.0.0 | Last Updated: February 2026*

---

## 📋 Table of Contents

1. [Business Logic](#1-business-logic)
   - [1.1 User Management](#11-user-management)
   - [1.2 Tutorial Management](#12-tutorial-management)
   - [1.3 Content Access Control](#13-content-access-control)
   - [1.4 Creator Ownership Model](#14-creator-ownership-model)
2. [System Logic](#2-system-logic)
   - [2.1 System Architecture Overview](#21-system-architecture-overview)
   - [2.2 Authentication System](#22-authentication-system)
   - [2.3 API Request Lifecycle](#23-api-request-lifecycle)
   - [2.4 Data Flow Architecture](#24-data-flow-architecture)
   - [2.5 State Management](#25-state-management)
   - [2.6 Security Logic](#26-security-logic)
   - [2.7 Error Handling Strategy](#27-error-handling-strategy)
   - [2.8 Cross-Platform Logic](#28-cross-platform-logic)

---

## 1. Business Logic

### 1.1 User Management

#### Registration Rules

| Rule | Implementation | File |
|------|---------------|------|
| Email must be unique | `User.findOne({ email })` check before creation | `authController.js` |
| Email is normalized to lowercase | `lowercase: true` in User schema | `User.js` |
| Name is trimmed of whitespace | `trim: true` in User schema | `User.js` |
| Password minimum 6 characters | `minlength: 6` in User schema | `User.js` |
| Password is hashed before storage | bcrypt with 12 salt rounds via `pre('save')` hook | `User.js` |
| Default role is `user` | `default: 'user'` in schema; `enum: ['user', 'admin']` | `User.js` |
| Registration does **not** auto-login | Register endpoint returns token, but web frontend redirects to `/login` | `AuthContext.jsx` |

```
Registration Flow:
  Client → POST /api/auth/register { name, email, password }
       → Server checks: email already exists?
           → YES: 400 "User already exists"
           → NO: Create user (password auto-hashed via pre-save hook)
                → Return { token, user } with 201
       → Web Frontend: redirect to /login (does NOT auto-login)
       → Mobile App: redirect to login screen
```

#### Login Rules

| Rule | Implementation |
|------|---------------|
| Credential validation | Find user by email, then `user.comparePassword(password)` via bcrypt |
| Invalid credentials → generic error | Returns `"Invalid credentials"` (does not reveal if email or password is wrong) |
| Successful login → JWT issued | Token contains `{ id: userId }`, expires in **7 days** |
| Web: token stored in `localStorage` | `localStorage.setItem('token', token)` |
| Mobile: token stored in `SecureStore` | `SecureStore.setItemAsync('token', token)` |

#### Session Persistence Logic

On app load, both web and mobile verify the stored token:

```
App Initialization:
  1. Check for stored token (localStorage / SecureStore)
  2. If no token → mark as unauthenticated, show login
  3. If token exists → call GET /api/auth/me
       → Success: user is authenticated, proceed to app
       → Failure (401): token invalid/expired, clear storage, redirect to login
```

---

### 1.2 Tutorial Management

#### Tutorial Data Model

| Field | Type | Required | Business Rule |
|-------|------|:---:|------|
| `title` | String | ✅ | Title of the tutorial |
| `description` | String | ✅ | Brief summary displayed on cards |
| `content` | String | ✅ | Full step-by-step instructions |
| `videoUrl` | String | ❌ | YouTube URL; defaults to empty string `""` |
| `duration` | Number | ✅ | Duration in minutes; must be ≥ 0 |
| `category` | String | ✅ | Free-text category (e.g., "Woodworking") |
| `level` | String | ❌ | Enum: `"Beginner Friendly"`, `"Intermediate"`, `"Advanced Level"`; defaults to `"Beginner Friendly"` |
| `image` | String | ❌ | Image URL; defaults to an Unsplash stock image |
| `createdBy` | ObjectId | ✅ | Auto-set from JWT; references `User` model |

#### CRUD Business Rules

```
CREATE Tutorial:
  ✅ User must be authenticated (JWT required)
  ✅ All required fields must be provided (title, description, content, duration, category)
  ✅ createdBy is auto-assigned from JWT payload (req.user.id)
  ✅ If no image provided → default Unsplash image is used
  ✅ Returns populated tutorial (includes creator name)

READ Tutorials:
  ✅ User must be authenticated
  ✅ All tutorials are returned, sorted by newest first (createdAt: -1)
  ✅ Creator name is populated via Mongoose .populate("createdBy", "name")
  ✅ Any authenticated user can view any tutorial

UPDATE Tutorial:
  ✅ User must be authenticated
  ✅ Only the tutorial creator can update (ownership check)
  ❌ Non-creator → 403 "You can only edit your own tutorials"
  ✅ All fields are updatable
  ✅ Returns the updated tutorial with populated creator

DELETE Tutorial:
  ✅ User must be authenticated
  ✅ Only the tutorial creator can delete (ownership check)
  ❌ Non-creator → 403 "You can only delete your own tutorials"
  ✅ Confirmation dialog shown on both web and mobile before API call
```

---

### 1.3 Content Access Control

All content in this platform is **gated behind authentication**. This is a core business requirement:

> *"Sebelum dapat mengakses konten tersebut pengguna diwajibkan register dan melakukan login"*
> (Before accessing the content, users must register and log in)

| Resource | Access Level |
|----------|-------------|
| Login / Register pages | **Public** — accessible without authentication |
| Home page (tutorial list) | **Protected** — requires valid JWT |
| Tutorial detail/learn page | **Protected** — requires valid JWT |
| Create tutorial | **Protected** — requires valid JWT |
| Edit tutorial | **Protected** — requires valid JWT + creator ownership |
| Delete tutorial | **Protected** — requires valid JWT + creator ownership |

#### Access Control Implementation

- **Backend**: All `/api/tutorials/*` routes use the `protect` middleware
- **Web Frontend**: `<ProtectedRoute>` wrapper checks `isAuthenticated` and redirects to `/login`
- **Mobile**: `index.js` redirects to `/login` if no user is found in `AuthContext`

---

### 1.4 Creator Ownership Model

The platform uses a **creator ownership model** where each tutorial is owned by the user who created it.

```
Ownership Check Logic (Backend):
  1. Fetch tutorial by ID from database
  2. Compare tutorial.createdBy with req.user.id (from JWT)
  3. If mismatch → 403 Forbidden

Ownership Check Logic (Frontend - Web):
  const isCreator = tutorial?.createdBy?._id === user?.id;
  - If isCreator → show Edit and Delete buttons
  - If NOT isCreator → buttons are hidden (read-only view)

Ownership Check Logic (Frontend - Edit Page):
  - On page load, fetch tutorial and check ownership
  - If NOT creator → toast error + redirect to learn page
  - Double protection: backend also rejects unauthorized updates
```

**Defense in Depth**: Ownership is enforced at both the frontend (UI hiding) and backend (API rejection) levels. Even if someone bypasses the frontend, the backend will reject unauthorized modifications.

---

## 2. System Logic

### 2.1 System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                                                                  │
│  ┌──────────────────┐          ┌──────────────────┐              │
│  │   Web Frontend   │          │   Mobile App     │              │
│  │  (React + Vite)  │          │ (Expo/RN)        │              │
│  │                  │          │                  │              │
│  │  AuthContext ─────┼──────────┼── AuthContext    │              │
│  │  Axios + JWT     │          │  Axios + JWT     │              │
│  │  localStorage    │          │  SecureStore     │              │
│  └────────┬─────────┘          └────────┬─────────┘              │
│           │ HTTPS                       │ HTTPS                  │
└───────────┼─────────────────────────────┼────────────────────────┘
            │                             │
            ▼                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                Express.js Server                         │    │
│  │                                                          │    │
│  │   Request ──► CORS ──► JSON Parser ──► Router            │    │
│  │                                          │               │    │
│  │                          ┌────────────────┼────────┐     │    │
│  │                          ▼                ▼        │     │    │
│  │                    /api/auth/*      /api/tutorials/*│    │    │
│  │                          │                │        │     │    │
│  │                          ▼                ▼        │     │    │
│  │                    Auth Controller  Tutorial Ctrl   │    │    │
│  │                          │          (+ protect MW)  │    │    │
│  └──────────────────────────┼────────────────┼────────┘    │    │
│                             │                │              │    │
└─────────────────────────────┼────────────────┼──────────────┘    │
                              │                │
                              ▼                ▼
┌──────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │            MongoDB Atlas (Cloud Database)                │    │
│  │                                                          │    │
│  │   ┌─────────────┐        ┌──────────────────┐           │    │
│  │   │  Users       │        │  Tutorials        │          │    │
│  │   │  Collection  │◄───────│  Collection        │         │    │
│  │   │              │  ref   │  (createdBy → User)│         │    │
│  │   └─────────────┘        └──────────────────┘           │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Authentication System

#### JWT Token Lifecycle

```
                    ┌─────────────────────────────┐
                    │      Token Generation       │
                    │                             │
                    │  jwt.sign(                  │
                    │    { id: user._id },        │
                    │    JWT_SECRET,              │
                    │    { expiresIn: '7d' }      │
                    │  )                          │
                    └──────────┬──────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                                 ▼
     ┌─────────────────┐              ┌─────────────────┐
     │  Web Client     │              │  Mobile Client  │
     │                 │              │                 │
     │  localStorage   │              │  SecureStore    │
     │  .setItem(      │              │  .setItemAsync( │
     │    'token',     │              │    'token',     │
     │    token        │              │    token        │
     │  )              │              │  )              │
     └────────┬────────┘              └────────┬────────┘
              │                                │
              │  On each API request:          │  On each API request:
              │  Axios interceptor adds        │  Axios interceptor adds
              │  Authorization: Bearer <token> │  Authorization: Bearer <token>
              │                                │
              └────────────────┬───────────────┘
                               ▼
                    ┌─────────────────────────────┐
                    │      Token Verification     │
                    │      (protect middleware)    │
                    │                             │
                    │  1. Extract from header     │
                    │  2. jwt.verify(token, secret)│
                    │  3. Find user by decoded.id │
                    │  4. Attach user to req.user │
                    │  5. Call next()             │
                    └─────────────────────────────┘
```

#### Token Invalidation Rules

| Trigger | Web Behavior | Mobile Behavior |
|---------|-------------|-----------------|
| Manual logout | Clear `localStorage`, reset state | Clear `SecureStore`, reset state |
| 401 response | Axios interceptor clears token, redirects to `/login` | Handled per-screen |
| Token expired (7 days) | Next API call returns 401 → auto-logout | Next API call returns 401 |
| Token verification fails on init | `LOGOUT` action dispatched | State reset, show login |

---

### 2.3 API Request Lifecycle

```
Client Request
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 1: CORS Middleware                                    │
│  ─────────────────────                                      │
│  • Check request origin against allowedOrigins list         │
│  • Allow requests with no origin (mobile/Postman)           │
│  • Block unauthorized origins with CORS error               │
│  • Allowed methods: GET, POST, PUT, DELETE, PATCH           │
│  • Allowed headers: Content-Type, Authorization             │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: Body Parser                                        │
│  ─────────────────                                          │
│  • express.json() — parse JSON request body                 │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 3: Router                                             │
│  ──────────                                                 │
│  • /api/auth/*       → authRoutes                           │
│  • /api/tutorials/*  → tutorialRoutes                       │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 4: Middleware (if applicable)                          │
│  ──────────────────────────────                              │
│  • protect middleware: JWT verification + user lookup        │
│  • Attaches req.user for downstream use                     │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 5: Controller                                         │
│  ──────────────                                             │
│  • Business logic execution                                 │
│  • Database operations via Mongoose                         │
│  • Response with appropriate HTTP status code               │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.4 Data Flow Architecture

#### Tutorial Creation Flow (End-to-End)

```
┌─────────┐    Form Submit    ┌───────────┐    POST /api/tutorials     ┌──────────┐
│  User   │ ──────────────► │  Frontend  │ ──────────────────────► │  Backend  │
│  Input  │                  │  (React)   │   + Bearer Token         │ (Express) │
└─────────┘                  └───────────┘                          └─────┬──────┘
                                                                          │
                              ┌───────────────────────────────────────────┘
                              ▼
                   ┌─────────────────────────┐
                   │  1. protect middleware   │
                   │     Verify JWT           │
                   │     Attach req.user      │
                   └──────────┬──────────────┘
                              ▼
                   ┌─────────────────────────┐
                   │  2. createTutorial()     │
                   │     Extract body fields  │
                   │     Set createdBy =      │
                   │       req.user.id        │
                   └──────────┬──────────────┘
                              ▼
                   ┌─────────────────────────┐
                   │  3. Mongoose Defaults    │
                   │     • image → Unsplash   │
                   │     • level → "Beginner  │
                   │       Friendly"          │
                   │     • videoUrl → ""      │
                   │     • timestamps auto    │
                   └──────────┬──────────────┘
                              ▼
                   ┌─────────────────────────┐
                   │  4. MongoDB Save         │
                   │     tutorial.save()      │
                   └──────────┬──────────────┘
                              ▼
                   ┌─────────────────────────┐
                   │  5. Populate Creator     │
                   │     .populate("createdBy"│
                   │       , "name")          │
                   └──────────┬──────────────┘
                              ▼
                   ┌─────────────────────────┐
                   │  6. Response 201         │
                   │     { message, tutorial }│
                   └─────────────────────────┘
```

#### YouTube Video Embedding Logic

```
Video URL Processing:
  Input:  "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
     │
     ▼
  getYouTubeId(url):
     Regex: /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
     Extract: "dQw4w9WgXcQ"
     Validate: length === 11
     │
     ▼
  If valid ID found:
     Web:    <iframe src="https://www.youtube.com/embed/{id}" />
     Mobile: <YoutubePlayer videoId={id} /> (react-native-youtube-iframe)

  If no valid ID:
     Web:    Video section is hidden entirely
     Mobile: Video section is hidden entirely
```

---

### 2.5 State Management

#### Web Frontend — `useReducer` Pattern

```
┌─────────────────────────────────────────────────────────┐
│                   AuthContext (Web)                       │
│                                                          │
│  State: { user, token, isLoading }                       │
│                                                          │
│  Actions:                                                │
│  ┌──────────────────┬──────────────────────────────────┐ │
│  │ LOGIN_SUCCESS     │ Store token in localStorage,     │ │
│  │                   │ set auth header, update state     │ │
│  ├──────────────────┼──────────────────────────────────┤ │
│  │ LOGOUT            │ Clear localStorage + auth header,│ │
│  │                   │ reset user/token to null          │ │
│  ├──────────────────┼──────────────────────────────────┤ │
│  │ AUTH_SUCCESS       │ On init, token verified by       │ │
│  │                   │ /auth/me, set user from response │ │
│  ├──────────────────┼──────────────────────────────────┤ │
│  │ LOADING           │ Set isLoading = true              │ │
│  ├──────────────────┼──────────────────────────────────┤ │
│  │ LOADING_DONE      │ Set isLoading = false             │ │
│  └──────────────────┴──────────────────────────────────┘ │
│                                                          │
│  Exposed: { user, token, isLoading, login, register,     │
│             logout, isAuthenticated }                    │
└─────────────────────────────────────────────────────────┘
```

#### Mobile App — `useState` Pattern

```
┌─────────────────────────────────────────────────────────┐
│                   AuthContext (Mobile)                    │
│                                                          │
│  State: { user, loading }                                │
│                                                          │
│  Token Storage: expo-secure-store                        │
│  User Storage:  expo-secure-store (JSON serialized)      │
│                                                          │
│  On Load:                                                │
│    loadUser() → read token + user from SecureStore       │
│    If found → set user state                             │
│    If not → remain unauthenticated                       │
│                                                          │
│  login()    → POST /auth/login → store token + user      │
│  register() → POST /auth/register → redirect to login   │
│  logout()   → delete token + user from SecureStore       │
│                                                          │
│  Exposed: { user, loading, login, register, logout,      │
│             isAuthenticated }                            │
└─────────────────────────────────────────────────────────┘
```

---

### 2.6 Security Logic

#### Password Security

```
Password Lifecycle:
  1. User submits plaintext password
  2. Mongoose pre('save') hook triggers
  3. Check: isModified('password')? (prevents re-hashing on non-password updates)
  4. bcrypt.hash(password, 12) → 12 salt rounds
  5. Hashed password stored in MongoDB
  6. On login: bcrypt.compare(input, stored) → boolean

  ⚠️ Plaintext password is NEVER stored or logged
```

#### API Security Layers

| Layer | Mechanism | Purpose |
|-------|-----------|---------|
| **CORS** | Origin whitelist + credentials | Prevent unauthorized cross-origin requests |
| **JWT Verification** | `protect` middleware | Authenticate API requests |
| **Ownership Check** | `createdBy === req.user.id` | Authorize modifications |
| **Input Validation** | Mongoose schema validators | Ensure data integrity |
| **Password Hashing** | bcrypt with 12 rounds | Protect stored credentials |
| **Token Expiry** | 7-day JWT expiration | Limit token validity window |

#### Auto-Logout System (Web)

```
Axios Response Interceptor:
  On EVERY API response:
    if (status === 401):
      1. localStorage.removeItem('token')
      2. window.location.href = '/login'

  This ensures that expired or tampered tokens result in
  immediate session termination and redirect to login.
```

---

### 2.7 Error Handling Strategy

#### Backend Error Responses

| Scenario | HTTP Status | Response Body |
|----------|:-----------:|------|
| Duplicate email on register | 400 | `{ message: "User already exists" }` |
| Invalid login credentials | 401 | `{ message: "Invalid credentials" }` |
| Missing/invalid JWT | 401 | `{ message: "Not authorized" }` |
| Token verification fails | 401 | `{ message: "Not authorized, token failed" }` |
| Edit/delete by non-creator | 403 | `{ message: "You can only edit/delete your own tutorials" }` |
| Tutorial not found | 404 | `{ message: "Tutorial not found" }` |
| Server error | 500 | `{ message: "Internal server error" }` |

#### Frontend Error Handling

```
Error Handling Flow:
  API Call
    │
    ├── Success → toast.success() / navigate
    │
    └── Error
         │
         ├── error.response.data.message exists?
         │     → Show server error message via toast.error()
         │
         └── No response / network error
               → Show generic fallback message
               → "Login failed" / "Registration failed" / etc.
```

---

### 2.8 Cross-Platform Logic

#### Platform-Specific Implementations

| Feature | Web (React) | Mobile (Expo/React Native) |
|---------|------------|---------------------------|
| **Token Storage** | `localStorage` | `expo-secure-store` (encrypted) |
| **HTTP Client** | Axios with cookie credentials | Axios (no credentials flag) |
| **Navigation** | React Router v7 (URL-based) | Expo Router v6 (file-based) |
| **Route Protection** | `<ProtectedRoute>` component | Redirect in `index.js` |
| **YouTube Player** | `<iframe>` with embed URL | `react-native-youtube-iframe` |
| **Notifications** | `react-hot-toast` | `Alert.alert()` |
| **Image Fallback** | `onError` handler on `<img>` | Default image constant |
| **State Management** | `useReducer` (more structured) | `useState` (simpler) |
| **Styling** | Tailwind CSS + DaisyUI | React Native `StyleSheet` + theme.js |

#### Shared Business Logic

Both platforms share identical business logic through the same API endpoints:

```
Shared Logic (via API):
  ✅ Registration with duplicate email check
  ✅ Login with bcrypt credential verification
  ✅ JWT-based session management (7-day expiry)
  ✅ Tutorial CRUD operations
  ✅ Creator ownership enforcement (403 on mismatch)
  ✅ Tutorial data population (creator name join)
  ✅ Default image fallback from Unsplash
  ✅ YouTube video ID extraction and embedding
```

---

## 📊 Business Logic Summary Matrix

| Business Rule | Backend Enforcement | Web Frontend | Mobile App |
|---------------|:---:|:---:|:---:|
| Unique email | ✅ DB check | ✅ Error display | ✅ Error display |
| Password length ≥ 6 | ✅ Schema validation | ✅ HTML constraint | ✅ Form validation |
| Password hashing | ✅ bcrypt pre-save | — | — |
| JWT authentication | ✅ protect middleware | ✅ Axios interceptor | ✅ Axios interceptor |
| Content gating | ✅ All routes protected | ✅ ProtectedRoute | ✅ Auth redirect |
| Creator-only edit | ✅ 403 rejection | ✅ UI hiding + redirect | ✅ UI hiding |
| Creator-only delete | ✅ 403 rejection | ✅ UI hiding | ✅ UI hiding |
| Default thumbnail | ✅ Schema default | ✅ Fallback constant | ✅ Fallback constant |
| Auto-logout on 401 | — | ✅ Interceptor redirect | ❌ Manual handling |
| Delete confirmation | — | ✅ window.confirm() | ✅ Alert.alert() |

---

*© 2026 Karang Taruna RT007/RW013 DIY Tutorials. All rights reserved.*
