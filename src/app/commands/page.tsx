import CommandsReference from '@/components/commands/CommandsReference';

export const metadata = {
  title: 'Commands Reference - DevHakim',
  description: 'Comprehensive reference of technical commands learned during my journey from healthcare to software engineering, including Linux, deployment, and development commands.',
};

export default function CommandsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      <CommandsReference />
    </main>
  );
}