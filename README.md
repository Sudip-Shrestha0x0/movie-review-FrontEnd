# Movie Review Site - Frontend

This is the frontend for our movie review site, built with Vue.js and Vite.

[View Live Site](https://splendorous-cajeta-68d552.netlify.app/)

## Type of Review Site
Movie Reviews

## Frontend Tool Choice
Vue.js with Vite

## Features

- Display list of movie reviews
- Search functionality to filter reviews
- Individual review pages with full details
- Responsive design that works on all screen sizes
- Clean and modern UI with smooth animations
- Star rating display

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend is running on http://localhost:1337

3. Start the development server:
```bash
npm run dev
```

4. The site will be available at http://localhost:5173

## Build for Production

```bash
npm run build
```

This creates a `dist` folder ready for deployment to Netlify or other static hosting services.

## Technologies Used

- Vue 3 (Composition API)
- Vue Router for navigation
- Axios for API calls
- Vite for build tooling
- CSS3 for styling and animations

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Vue components
│   ├── views/       # Page components
│   ├── router/      # Router configuration
│   ├── App.vue      # Root component
│   └── main.js      # Entry point
├── index.html       # HTML template
└── package.json     # Dependencies
```