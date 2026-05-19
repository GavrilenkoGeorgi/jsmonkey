**Sharlushka** is a full-stack, Yahtzee-inspired dice game built as a **Progressive Web App (PWA)**. It was developed as a personal project to exercise **frontend architecture, real-time state management, and production-style game logic**, and evolved into a feature-complete multiplayer platform.

The core gameplay follows the classic Yahtzee scoring model:

- roll five dice,
- lock the dice you want to keep,
- re-roll up to two times,
- select a scoring category.

One of the most complex parts of the project was the **score evaluation engine**. It had to reliably detect combinations such as full house, straights, and other valid categories from a live dice board. That logic was implemented with careful edge-case handling and is covered by **unit tests**.

### Multiplayer architecture

Multiplayer is built on **Socket.IO WebSockets** and supports two players in a shared session with real-time game synchronization.

The frontend is responsible for:

- managing the socket connection lifecycle,
- synchronizing turns between players,
- keeping opponent state in sync,
- isolating multiplayer flow in a dedicated Redux slice and custom hooks.

### Authentication and analytics

Players can register and persist their game history. Completed matches are stored in the backend and visualized on the stats page with **Recharts**.

The **analytics dashboard** includes: combo distribution, win-rate tracking, score trends over time.

### PWA implementation

The application is installable across devices and uses **Workbox** for asset caching and service worker lifecycle management. Updates are handled gracefully, including user prompts when a new version becomes available.

### Tech stack

- React 19, TypeScript
- Redux Toolkit + RTK Query
- React Router 7
- Socket.IO
- dnd-kit for drag-and-drop dice interactions
- Framer Motion for UI animations
- react-hook-form + Zod for form validation
- Recharts
- Webpack 5 with a custom configuration
- Sass modules
- Netlify for hosting

The main engineering challenges were the **deterministic scoring logic** and the later transition from a single-player application model to a **stateful real-time multiplayer architecture**.
