Agency Roster is a full-stack platform that connects marketing brands with creative and media agencies. Marketers can submit a search brief, receive an AI-generated shortlist of matched agencies ranked by compatibility, schedule introductory calls with selected candidates, and track the entire process through a unified dashboard. Agencies on the other side manage their profile, respond to incoming invitations, and submit proposals — all within the same application.

The frontend is a single-page application built with **React 19** and **TypeScript**, bundled with **Vite** and styled using a combination of **Tailwind CSS** utility classes and **CSS Modules** written in SCSS syntax. Routing is handled by **React Router v7**, and all server state is managed through **TanStack Query v5** paired with **Axios**, which provides consistent caching, background refetching, and optimistic update patterns across the entire data layer. Data tables throughout the admin and marketer interfaces are powered by **TanStack Table v8**, offering column-level filtering, pagination, and sortable headers without sacrificing control over rendering.

Authentication is delegated to **Stytch**, whose React SDK handles session management, magic links, and password flows. The resulting session token is stored in a React context and consumed by a shared hook throughout the component tree, enabling granular role-based rendering for the three distinct user roles: **admin**, **marketer**, and **agency**. Form handling relies on **Formik** with **Yup** schemas for validation, including a shared configuration layer that enforces consistent field constraints across the application.

### AI-powered agency matching

The core feature of the platform accepts a marketer's brief — optionally with attached documents sent as multipart form data — and returns a scored list of agencies, each accompanied by a **capability map** visualised as a radar chart using **Recharts**. Each agency result includes:

- a compatibility score across dimensions such as capabilities, expertise, collaboration, and cultural values
- an AI-generated summary and consultant review
- a "top recommendation" designation that admins can assign before publishing the report

The same charting library drives the analytics dashboards, which surface engagement metrics and historical search data. Completed AI search reports can be exported to **PDF** through an `html2canvas` and `jsPDF` pipeline that applies a separate stylesheet to the document during capture, isolating print-specific layout from the interactive view.

### Chemistry meetings and RFPs

The chemistry meeting workflow lets marketers select agencies from an AI report, propose available time slots with timezone-aware date handling via **date-fns**, and send invitations in bulk. Agencies receive those invitations as **RFPs** and can:

- accept or decline the invitation
- upload supporting files through a dedicated dropzone modal
- request alternative time slots if none of the proposed ones work
- submit a final proposal once a time is confirmed

The entire notification layer uses a **server-sent events** stream, with unread counts and real-time updates surfaced through a slide-in drawer.

### Accessibility and code quality

Accessibility is a first-class concern: interactive components such as modals, dropdowns, select fields, and date pickers are built on top of **React Aria Components**, which provides ARIA attribute management, keyboard navigation, and focus trapping out of the box. Loading states use `react-loading-skeleton` to maintain layout stability during data fetches, and toast notifications via **react-hot-toast** give users consistent feedback for mutations.

Code quality is enforced through **ESLint**, **Prettier**, and **Husky** pre-commit hooks with `lint-staged`, ensuring TypeScript, formatting, and linting checks all pass before any commit lands.
