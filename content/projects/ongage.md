**Ongage** is a large-scale, multi-tenant email marketing SaaS platform. I built and maintained the **React frontend** that gives marketers control over the full lifecycle of an email program — from subscriber acquisition and list management to campaign execution and post-campaign analysis.

The product supports the entire email marketing workflow:

- importing, segmenting, and exporting subscriber lists,
- managing contact statuses and field-level data across millions of records,
- creating, scheduling, and A/B testing email and SMS campaigns,
- tracking real-time send statistics,
- building automated journeys such as **welcome series** and **re-engagement flows** through a node-based drag-and-drop workflow editor,
- configuring and switching between multiple **ESP** and **SMTP** delivery providers through a unified vendor management interface,
- running bulk email validation against a third-party service with status tracking and downloadable results,
- analyzing campaign performance through dashboards with overview charts, aggregate tables, and deliverability metrics.

### AI features

AI is integrated across the platform in three distinct layers:

- **AI Analytics** — users can ask questions in plain English, such as _“Which campaigns had the highest open rate last month?”_, and receive structured results rendered as interactive charts alongside a conversational answer. A thumbs-up / thumbs-down feedback loop helps improve accuracy over time.
- **AI Email Template Generator** — guides users through a short brief covering tone, audience, goal, language, and email type, then generates a fully styled HTML template that can be previewed and saved as a new message.
- **CopilotKit AI assistant** — a persistent in-app chat sidebar that understands the current page context, can navigate across the application, and can create, update, or delete entities such as campaigns, segments, automations, and vendor connections on the user’s behalf. Relevant UI caches are refreshed automatically after each action through **MCP (Model Context Protocol)**.

### Engineering architecture

The frontend followed a strict **modular feature architecture**, where each domain owned its own API clients, Zustand stores, TanStack Query hooks, and UI components. This kept pages thin and business logic co-located.

Key implementation details included:

- a three-variant **TanStack Table** setup for server-paginated, client-paginated, and context-free tables,
- persistent column visibility and column ordering,
- Firebase authentication with token-refresh interceptors wired into all API and AI requests,
- strict TypeScript across the codebase,
- ESLint with `exhaustive-deps` enforced as an error,
- Prettier formatting,
- Husky pre-commit hooks to keep the codebase consistent across a large team.

The main challenges were the scale of the data model, the complexity of multi-tenant UX flows, and keeping the frontend architecture maintainable while supporting a growing number of features and AI-driven interactions.
