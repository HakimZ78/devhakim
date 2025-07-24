export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  lastModified?: string;
  author: string;
  category: 'technical' | 'career' | 'learning' | 'tools' | 'reflection';
  tags: string[];
  readTime: number;
  featured: boolean;
  imageUrl?: string;
  slug: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

export interface BlogFilters {
  category?: string;
  tags?: string[];
  searchQuery?: string;
  sortBy: 'date' | 'readTime' | 'title';
  sortOrder: 'asc' | 'desc';
}