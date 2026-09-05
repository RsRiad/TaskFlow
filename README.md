# TaskFlow

TaskFlow is a lightweight project management web app that helps small teams and agencies plan work, track tasks, and see project progress in one place — without the complexity of tools like Jira.

**Live demo:** [https://task-flow-two-jade.vercel.app/login](https://task-flow-two-jade.vercel.app/login)

---

## Step 01: Product Thinking

### 1. Who is the user, and what are the top 2–3 things they want to do?

TaskFlow targets small dev/design/marketing teams, agency project managers, and freelancers managing client projects — a mix of technical and non-technical people.

Their top goals are:

1. **See what needs attention right now** — active projects, overdue tasks, and upcoming deadlines at a glance without digging through menus.
2. **Create, assign, and organize tasks quickly** — add a task, pick a project and assignee, set a due date, and place it in the right workflow column.
3. **Track progress across projects** — know how many tasks are done vs. outstanding for each project so nothing slips through the cracks.

### 2. What should the app make easiest on the very first screen after login, and why?

The Dashboard (first screen after login) surfaces **overall work health**: active projects with progress bars, total task count, how many are overdue, how many are completed, and a quick list of tasks due soon.

This is the right first screen because users — especially non-technical ones — need an immediate answer to _"What needs attention today?"_ without clicking through multiple menus. The stat cards, combined with the "Tasks due soon" list, let anyone scan the state of work in seconds and jump to action.

### 3. Key task flow: create a new task and assign it to a project/status

1. User lands on the **Dashboard** after login.
2. They click the **"New task"** button (visible on Dashboard header and Task Board header) or navigate to the Task Board and click the **"+"** icon on a specific column.
3. The **Create Task form** opens with fields for: title (required), description, project (dropdown), assignee (dropdown with avatar), due date (date picker), status (To Do / In Progress / Done), priority (Low / Medium / High / Urgent), tags, checklist, estimated hours, and file attachments.
4. After filling in the details the user clicks **"Create task"** — the task is instantly added to the in-memory state and appears in the matching Kanban column on the Task Board.
5. From the Task Board the user can later drag-and-drop the card to a different column, or use the card's **⋯ menu → Move to** option to change its status.

### 4. Assumptions

- **Single team, multiple projects.** TaskFlow represents one workspace with a shared team roster working across several projects.
- **Login is decorative.** The login page is static — clicking "Sign in" or "Instant Demo Access" simply navigates to the dashboard. No real authentication.
- **In-memory data only.** All mock data lives in browser state. Creating, editing, or moving tasks works within the session; refreshing the page resets everything.
- **Predefined roster.** Projects and team members come from hardcoded mock data. Tasks can be created, edited, and moved between statuses during the session.

---

## Step 02: Core Screens

### 1. Dashboard / Home

- **Stat cards** — active projects, total tasks, overdue count, completed count.
- **Active projects** — cards with title, description, progress bar, due date, and team avatars.
- **Tasks due soon** — a compact list of upcoming tasks with checkboxes for quick completion.
- **Recent activity** — a feed of recent actions across the workspace.

### 2. Task Board (Kanban)

- **Three columns**: To Do, In Progress, Done — each showing a count badge.
- **Task cards** display title, project name, assignee avatar + name, due date, and an overdue badge when applicable.
- **Drag-and-drop** between columns to change status (implemented).
- **Card menu** (⋯) with "Edit" and "Move to" options for keyboard/mouse users.
- **Filter bar** with text search, project dropdown, and assignee dropdown — all combinable and clearable.

### 3. Create / Edit Task

- Full-page form with: title, description, project selector, assignee selector, date picker, status, priority (4-level), tags (preset + custom), checklist, estimated hours, and drag-and-drop file attachments.
- **Live summary sidebar** reflects selections in real time.
- Submitting adds/updates the task in state — the Task Board updates immediately.
- "Back" returns to the previous view without losing navigation context.

### Bonus Screens

- **My Tasks** — personal task list with status toggles and filters.
- **Projects** — project cards with progress, task counts, and the ability to create new projects.
- **Team** — team member roster with role/email details and the ability to add new members.

---

## Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Framework    | **Next.js 16** (App Router)        |
| UI library   | **React 19**                       |
| Language     | **TypeScript**                     |
| Styling      | **Tailwind CSS 4**                 |
| Icons        | **react-icons** + custom SVGs      |
| Data         | In-memory mock data (no backend)   |
| Deployment   | **Vercel**                         |

---

## Features at a Glance

- Fully **responsive** — works on mobile and desktop.
- **Drag-and-drop** Kanban board with visual drop-target feedback.
- **Combinable filters** (search + project + assignee) across the board.
- **Create / edit tasks** with rich fields: priority, tags, checklist, attachments, estimated hours.
- **Live stat calculations** — adding, completing, or moving tasks updates dashboard counts in real time.
- Clean, minimal design with smooth **page transitions** and **micro-animations**.
- **Static/decorative login** page with Google/GitHub OAuth buttons and instant demo access.

---

## Run Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

---

## Project Structure

```
src/
├── app/
│   ├── dashboard/          # Dashboard page + all view components
│   │   └── _components/    # DashboardClient, TaskBoard, CreateTaskView, etc.
│   ├── login/              # Static login page
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── page.tsx            # Root redirect
├── components/             # Shared UI: Sidebar, Button, CustomSelect, DatePicker, etc.
├── data/                   # Hardcoded mock data (tasks, projects, team, activities)
├── lib/                    # Utility helpers (fonts)
└── types/                  # TypeScript interfaces and type definitions
```
