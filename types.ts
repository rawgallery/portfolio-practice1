export interface Project {
  id: string;
  title: string;
  client: string;
  subtitle: string;
  thumbnailUrl: string;
  images: { url: string; caption: string }[];
  overview: string;
  problemStatement: string;
  impact: string;
  scopeAndTeam: string;
  tags: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}