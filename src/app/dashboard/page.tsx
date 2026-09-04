import type { Metadata } from 'next';
import { DashboardClient } from './_components/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard | TaskFlow - Project Management',
  description: 'Manage tasks, track active projects, review workload, and collaborate with your team.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
