## Social Media App 💬️

A full-stack social media application built with modern web technologies.
Users can create accounts, publish posts, interact through comments, and engage with content using likes.

This project was created to practice full-stack architecture, GraphQL APIs, and modern React development.

### Features 💡️

- User authentication (Sign up / Sign in)
- Create, update and delete posts
- List posts from all users
- Comment on posts
- Like and unlike posts
- GraphQL API with typed schema
- Modern responsive UI with TailwindCSS

### Tech Stack 🚀️
Frontend
- React
- TypeScript
- Apollo Client
- TailwindCSS

Backend
- Node.js
- Apollo Server (GraphQL)
- Prisma ORM
- PostgreSQL

### Getting Started
1. Clone the repository

```
git clone https://github.com/michelzaum/sayit.git
cd sayit
```

2. Install dependencies

Frontend
```
cd web
npm install
```

Backend
```
cd server
npm install
```

3. Configure environment variables

Create a .env file inside the server folder:
```
DATABASE_URL="postgresql://user:password@localhost:5432/social_media"
JWT_SECRET="your_secret"
```

4. Run Prisma migrations
```
npx prisma migrate dev
```

5. Start backend
```
cd server
npm start
```

6. Start the frontend
```
cd web
npm run dev
```

Built by [Michel de Oliveira](https://github.com/michelzaum) 👨‍💻️
