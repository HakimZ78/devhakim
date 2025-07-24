import Hero from '@/components/home/Hero';
import InteractiveSkillsShowcase from '@/components/home/InteractiveSkillsShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import InteractiveJourneyTimeline from '@/components/home/InteractiveJourneyTimeline';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <InteractiveSkillsShowcase />
      <FeaturedProjects />
      <InteractiveJourneyTimeline />
    </main>
  );
}
