export type Project = {
  title: string;
  description: string;
  href?: string;
  tech: string[];
  status?: string;
  kind?: string;
  year?: string;
  featured?: boolean;
  outcome?: string;
  repository?: string;
  links?: {
    label: string;
    href: string;
  }[];
};

export const projects: Project[] = [];
