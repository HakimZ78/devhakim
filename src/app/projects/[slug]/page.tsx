import { notFound } from 'next/navigation';
import ProjectDetailContent from '@/components/projects/ProjectDetailContent';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects-data';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="pt-20">
        <ProjectDetailContent project={project} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}