import { notFound } from 'next/navigation';
import ProjectDetailContent from '@/components/projects/ProjectDetailContent';
import { getAllProjectSlugs } from '@/data/projects-data';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProjectBySlug(slug: string) {
  try {
    // In production, use the full domain; in development, use localhost
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://devhakim.com' 
      : 'http://localhost:3001';
    
    const response = await fetch(`${baseUrl}/api/projects?slug=${slug}`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching project:', error);
    // Fallback to static data if API fails
    const { getProjectBySlug: getStaticProject } = await import('@/data/projects-data');
    return getStaticProject(slug);
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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