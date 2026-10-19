
# Blog CMS

A multi-user Blog Content Management System built with Laravel, Inertia.js, React, TypeScript, and Tailwind CSS.

This project was developed as a technical assessment for Coding Collective.

## Features

- User registration and login
- Role-based access control (Admin and Author)
- Admin dashboard
- User management
- Category management (CRUD)
- Post management (CRUD)
- Draft and published post statuses
- Post cover image upload
- Public homepage featuring latest articles
- Public blog listing and article detail pages

## Tech Stack

- Laravel 13
- PHP
- Inertia.js 3
- React 19
- TypeScript
- Tailwind CSS 4
- SQLite
- Vite

## Requirements

- PHP and Composer
- Node.js and npm
- PHP SQLite extension

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/blog-cms.git
cd blog-cms
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Configure the database connection in `.env`:

```env
DB_CONNECTION=sqlite
```

### 4. Create database and run migrations

```bash
touch database/database.sqlite
php artisan migrate
```

### 5. Create storage link

```bash
php artisan storage:link
```

### 6. Run the application

Start Laravel:

```bash
php artisan serve
```

In another terminal, start Vite:

```bash
npm run dev
```

Open the application at:

http://127.0.0.1:8000

## User Roles

### Admin

- Access the admin dashboard
- Manage users and their roles
- Manage categories
- Manage blog posts

### Author

- Create and manage their own posts
- Upload post cover images
- Save posts as drafts or publish them
- Preview posts before publishing

## Public Pages

- `/` — Homepage
- `/blog` — Published articles
- `/blog/{slug}` — Article details
- `/login` — Login
- `/register` — Registration

## Notes

Newly registered users are assigned the Author role.

An Admin account must be configured separately in the database or through a project seeder, if available.

## License

This project was developed for a technical assessment.
