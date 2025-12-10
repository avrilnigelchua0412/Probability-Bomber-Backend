# 🌐 Probability Bomber

A full-stack web application built with **React**, **Vite**, **Firebase**, and **Cloud Functions**, featuring authentication, backend APIs, analytics, and a Phaser JS mini-game.

---

## 🚀 Features

- 🔐 **User Authentication** (Firebase + JWT)
- 🧩 **API Endpoints** via Firebase Cloud Functions
- ⚡ **Realtime Database & Cloud Operations**
- 🎮 **Phaser JS Mini-Game Integration**
- 📱 **Responsive UI** using Tailwind CSS
- 📊 **Analytics** with Recharts
- 📧 **Email Service** using Nodemailer
- 🔗 **Client–Server Communication** using Axios
- ✔️ **Input Validation** using Joi

---

## 🛠️ Tech Stack

### **Frontend**

| Component | Version |
|----------|---------|
| React | v19.0.0 |
| Vite | v6.3.5 |
| Tailwind CSS | v4.1.14 |
| FontAwesome | v6.7.2 |
| Phaser JS | v3.55.2 |
| Axios | v1.8.4 |
| React Router DOM | v7.4.1 |
| Firebase Web SDK | v11.6.0 |
| Recharts | v2.15.3 |
| ESLint | v9.26.0 |
| PostCSS | v8.5.6 |
| Autoprefixer | v10.4.21 |

---

### **Backend**

| Component | Version |
|----------|---------|
| Backend Platform | Firebase Cloud Functions |
| Node.js | v22 |
| Express.js | v5.1.0 |
| Firebase Admin SDK | v13.4.0 |
| Firebase Functions SDK | v6.3.2 |
| CORS | v2.8.5 |
| Dotenv | v16.5.0 |
| bcryptjs | v3.0.2 |
| jsonwebtoken | v9.0.2 |
| Joi | v17.13.3 |
| Nodemailer | v7.0.3 |
| ESLint | v9.26.0 |
| Firebase Functions Test | v3.4.1 |

---

## 📦 Deployment Instructions

### 🌐 Frontend Render

### **Prerequisites**
- Render.com account  
- Repository pushed to GitHub/GitLab  
- Firebase client environment variables ready  

---

### **1. Push repository to Git**

Ensure your project contains:

- package.json
- vite.config.js
- src/
- public/


---

### **2. Create a Render Web Service**

- Log in to Render  
- Click **New → Web Service**  
- Select repository  
- Choose the branch (usually `master`)  

---

### **3. Render Configuration**

| Setting | Value |
|--------|-------|
| Name | Your-App-Frontend-Name |
| Root Directory | PhaserGame |
| Environment | Node |
| Build Command | npm run build |
| Publish Directory | dist |
| Branch | master |
| Instance Type | Free |

---

### **4. Add Environment Variables**

Add the following keys:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID


---

### **5. Deploy**

Click **Deploy** → wait for the build → copy the live URL.

---

### 🔥 Backend Firebase Cloud Functions

### **Prerequisites**
- Node.js v22  
- Firebase CLI installed  
  ```sh
  npm install -g firebase-tools

### **Steps**
**1. Navigate to the Functions Directory**
   cd path/to/project/functions

**2. Install Dependencies**
   npm install

**3. Configure Environment Secrets**

   Use Firebase Secrets instead of .env.

   firebase functions:secrets:set JWT_SECRET="YOUR_STRONG_SECRET_KEY"

   Access it in code:

   process.env.JWT_SECRET

**4. Authenticate & Select Your Firebase Project**
   firebase login
   firebase use --add YOUR_FIREBASE_PROJECT_ID

**5. Deploy Cloud Functions**
   firebase deploy --only functions

**6. Verify Deployment**

   Check the endpoint URLs shown in the terminal.

   Visit Firebase Console → Functions to confirm the deployed functions.

### **👤 Dummy Credentials**
   **Email** - testaccount@gmail.com
	**Password** - Fullmoon#165
