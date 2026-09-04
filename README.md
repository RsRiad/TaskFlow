# TaskFlow

TaskFlow is a lightweight project management web app for small teams and agencies that need a clear view of projects, task ownership, status, and overdue work without Jira-style complexity.

## Step 01: Product thinking

### 1. Users and top jobs

TaskFlow is for small dev, design, and marketing teams, agency project managers, and freelancers managing client work. Their top tasks are:

- See which projects are active and whether each project is on track.
- See what tasks need attention now, who owns them, and what is overdue.
- Create or update tasks quickly and place them into the right project and workflow status.

### 2. First screen after login

The first screen should make overall work health easiest to understand: active projects, total tasks, overdue tasks, completed work, and tasks due soon. This matters because mixed technical and non-technical users need immediate answers to “What needs attention today?” without opening multiple menus.

### 3. Key task flow: create and assign a task

The user opens TaskFlow and lands on the dashboard. They click **New task** or open the **Task board** and choose to add a task. The form asks for a task title, project, assignee, due date, and status. After submitting, the task is saved in the browser’s in-memory state and appears immediately in the matching Task Board column, where its status can be changed later.

### 4. Assumptions

- TaskFlow supports one team working across multiple projects.
- There is no working authentication in this version; login is assumed to have already happened.
- Data is mock/hardcoded and stored in browser memory only, so refreshing the page resets changes.
- Projects and team members are predefined, while tasks can be created, edited, and moved between statuses during the session.

## Tech used

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- In-memory mock data only; no backend or database

## Core screens implemented

- Dashboard / Home: active projects, task totals, overdue count, completed count, and tasks due soon.
- Task Board: Kanban-style To Do, In Progress, and Done columns with searchable/filterable task cards and status controls.
- Create/Edit Task: responsive form for creating and editing tasks that updates the in-memory board state.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.
