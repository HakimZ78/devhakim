import Hero from '@/components/home/Hero';
import SkillsShowcase from '@/components/home/SkillsShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import JourneyTimelineShowcase from '@/components/home/JourneyTimelineShowcase';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <SkillsShowcase />
      <FeaturedProjects />
      <JourneyTimelineShowcase />
    </main>
  );
}
