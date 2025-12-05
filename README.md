# 📦 URL Shortener

A modern, secure, and personal URL shortening service built with **Node.js**, **Express**, **EJS**, **MySQL (via Drizzle ORM)**, and **JWT authentication**.  
Features include user authentication, link management dashboard, profile customization with profile pictures, and email verification.

![Screenshot](https://github.com/Kkoderr/url-shortener/assets/screenshot.png) 

---

## 🚀 Features

✅ User registration and login  
✅ JWT-based authentication with access & refresh tokens  
✅ Email verification system  
✅ Personal profile page with profile picture upload  
✅ Manage your shortened links: edit & delete  
✅ EJS templating with Bootstrap styling  
✅ Secure password hashing  
✅ Session management via database  
✅ Clean, modular folder structure

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL + Drizzle ORM
- JWT (jsonwebtoken)
- EJS
- Bootstrap 5
- bcrypt
- dotenv

---

## 📂 Project Structure
bash```
url-shortener/

├── controller/ # Route controllers

├── middlewares/ # Auth & verification middlewares

├── model/ # DB models & data access

├── routes/ # App and auth routes

├── services/ # Token generation and helper services

├── views/ # EJS templates

│ └── profile/ # Profile-related views

├── public/ # Static assets & CSS

├── drizzle.config.js # Drizzle ORM config

├── server.js # Entry point

└── package.json
```
---

## ⚙️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/Kkoderr/url-shortener.git
cd url-shortener
```
2. **Install dependencies**

```bash
npm install
```
3. **Configure environment variables**

Create a .env file:

```bash
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=url_shortener
```

4. **Setup database**

- Create MySQL database: url_shortener
- Run migrations using Drizzle ORM (or import existing schema).

5. **Run the server**

```bash
npm start
```

## ✨ Usage

- Register and verify your email.
- Upload a profile picture.
- Create, edit, and delete your shortened links.
- Use your short links directly.

## 📌 Screenshots

Add screenshots or GIFs to showcase:
- Registration & Login page
- Profile page with upload
- Email verification badge
- Link management dashboard

## 🧰 Future Enhancements

- Link analytics (clicks, referrers)
- Expiry & one-time links
- Social login (Google, GitHub)
- Improved UI with React or Next.js frontend

## 📝 License
This project is licensed under the MIT License.

## 🙌 Acknowledgements
Built and maintained by @Kkoderr.
Inspired by modern URL shorteners and powered by open-source tools.

Feel free to ⭐ the repo if you like it, and contributions are always welcome!
