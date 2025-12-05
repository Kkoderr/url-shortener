📦 URL Shortener

A modern, secure, and personal URL shortening service built with Node.js, Express, EJS, MySQL (via Drizzle ORM), and JWT authentication.

Features include user authentication, link management dashboard, profile customization with profile pictures, and email verification.

📑 Table of Contents

Features

Tech Stack

Project Structure

Setup & Installation

Environment Variables

Usage

Future Enhancements

License

🚀 Features

✅ User Management: Secure user registration and login.

✅ Authentication: JWT-based auth with access & refresh tokens plus secure password hashing (bcrypt).

✅ Verification: Email verification system for new accounts.

✅ Profiles: Personal profile pages with image upload capabilities.

✅ Dashboard: Create, edit, and delete shortened links easily.

✅ Styling: Responsive UI built with EJS templating and Bootstrap 5.

✅ Database: Robust session management and data storage via MySQL.

✅ Codebase: Clean, modular folder structure for easy scalability.

🛠️ Tech Stack

Component

Technology

Runtime

Node.js

Framework

Express.js

Database

MySQL

ORM

Drizzle ORM

Templating

EJS

Styling

Bootstrap 5

Auth

JSON Web Tokens (JWT) & bcrypt

Config

dotenv

📂 Project Structure

url-shortener/
├── controller/       # Route controllers (logic)
├── middlewares/      # Auth, upload, & verification middlewares
├── model/            # DB models & data access layer
├── routes/           # Application and authentication routes
├── services/         # Token generation and helper services
├── views/            # EJS templates
│   └── profile/      # Profile-specific views
├── public/           # Static assets (images, CSS, JS)
├── drizzle.config.js # Drizzle ORM configuration
├── server.js         # Application entry point
└── package.json      # Dependencies and scripts


⚙️ Setup & Installation

Follow these steps to run the project locally.

1. Clone the repository

git clone [https://github.com/Kkoderr/url-shortener.git](https://github.com/Kkoderr/url-shortener.git)
cd url-shortener


2. Install dependencies

npm install


3. Database Setup

Ensure you have MySQL installed and running.

Create a database named url_shortener.

Run migrations using Drizzle ORM (or import your schema manually).

4. Configure Environment Variables

Create a .env file in the root directory and add the following:

JWT_SECRET=your_super_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=url_shortener
PORT=3000


5. Run the server

# Start the server
npm start

# Or if using nodemon for development
npm run dev


Server will start at http://localhost:3000 (or your defined port).

✨ Usage

Register: Create an account on the sign-up page.

Verify: Check your email (or console logs if in dev mode) to verify your account.

Profile: Navigate to your profile to upload a profile picture.

Shorten: Go to the dashboard, paste a long URL, and generate a short link.

Manage: Edit or delete links directly from the dashboard list.

📌 Screenshots

Note: Please update the repository with actual screenshots in an /assets folder.

Login Page

Dashboard





🧰 Future Enhancements

[ ] Analytics: Track clicks, geographic location, and referrers.

[ ] Expiry: Set expiration dates for temporary links.

[ ] Social Login: OAuth integration (Google, GitHub).

[ ] API: RESTful API endpoints for external usage.

[ ] Frontend Upgrade: Migration to React.js or Next.js.

🙌 Acknowledgements

Built and maintained by @Kkoderr.
Inspired by modern URL shorteners and powered by open-source tools.

📝 License

This project is licensed under the MIT License.

<p align="center">





Don't forget to ⭐ the repo if you found this useful!
</p>
