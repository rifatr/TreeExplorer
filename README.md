# Tree Explorer

A small React + TypeScript + Vite app that visualizes nested JSON as an expandable/collapsible tree. The UI uses Tailwind CSS and plain React components.

Live demo: https://your-deployment-url.example.com  <!-- Replace with your Netlify/Vercel URL -->

## What this repo contains
- Source code for the Tree Explorer app (React + TypeScript + Vite)
- A lightweight UI implemented with Tailwind CSS
- A Dockerfile for containerized production serving

## Why these choices
- Framework: React + TypeScript + Vite — fast dev server, small build, and fits component-driven UIs.
- Styling: Tailwind CSS — utility-first, no heavy UI libraries, so the look is custom and easy to tweak.
- No third-party UI libraries — UI behavior and markup are implemented by the app to match the provided design.

## Quick start (development)
1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Open the URL printed by Vite (typically http://localhost:5173)

## Docker (build + run)

1. Build the image:

```bash
docker build -t treeexplorer .
```

2. Run the container (example mapping port 80 in container to 8080 on host):

```bash
docker run -p 8080:80 --rm treeexplorer
```

3. Open http://localhost:8080

## Features implemented
- Expandable/collapsible tree view
- Node selection and breadcrumb navigation
- Import JSON modal (paste JSON) and delete-node confirmation flow
- Tree persisted in localStorage

## Bonus features
- No extra bonus features implemented beyond the core requirement. The app prioritizes minimal dependencies and readable code.

## Trade-offs & missing features
- Performance: The tree is rendered recursively and may be slower for very large datasets; memoization and virtual scrolling would help for huge trees.
- Editing: Only import and delete are provided — create/rename/move actions are not implemented.
- Validation: JSON import has basic validation only; richer schema validation and better error UI could be added.

## How to deploy

Deploy to Vercel or Netlify by connecting the repo and using the Vite build command.

- Vercel: Build command `npm run build`, output directory `dist`.
- Netlify: Build command `npm run build`, publish `dist`.
