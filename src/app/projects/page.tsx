import ProjectsShowcase from '@/components/projects/ProjectsShowcase';

export const metadata = {
  title: 'Projects - DevHakim',
  description: 'Showcase of projects built during my transition from healthcare to software engineering, including fintech applications, learning projects, and business solutions.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      <ProjectsShowcase />
    </main>
  );
}