# Tree Explorer

A small React + TypeScript + Vite app that visualizes nested JSON as an expandable/collapsible tree. The UI uses Tailwind CSS and plain React components.

Live demo: [https://tree-explorer-one.vercel.app/](https://tree-explorer-one.vercel.app/)

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

## Bonus features
- Tree nodes can be renamed
- Undo last rename or delete action
- Formatted JSON viewer for better UI
- Highlight Root node automatically

## Trade-offs & missing features
- Performance: The tree is rendered recursively and may be slower for very large datasets; memoization and virtual scrolling would help for huge trees.
- Validation: Better error UI could be added while JSON validation.
