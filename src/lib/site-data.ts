export const SITE = {
  username: "itismaku",
  repoName: "portfolio",
  fullName: "itismaku/portfolio",
  description:
    "Full-stack developer specializing in Java & TypeScript ecosystems. Building robust backends with Spring Boot and modern frontends with React & Next.js.",
  domain: "volkman.cz",
  githubRepo: "https://github.com/itismaku/portfolio",
  defaultBranch: "main",
  github: "https://github.com/itismaku",
  linkedin: "https://www.linkedin.com/in/adam-volkman-5a5721307/",
  twitter: "https://x.com/just_makuu",
  instagram: "https://www.instagram.com/a._.volkman",
};

export interface FileEntry {
  name: string;
  type: "file" | "dir";
  path: string;
  lastCommitMessage?: string;
  lastCommitDate?: string;
  external?: boolean;
}

export const ROOT_FILES: FileEntry[] = [
  {
    name: "projects",
    type: "dir",
    path: "/projects",
    lastCommitMessage: "Add project pages",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "repos",
    type: "dir",
    path: "/repos",
    lastCommitMessage: "Add GitHub repositories",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "AI.md",
    type: "file",
    path: "/ai",
    lastCommitMessage: "Add thoughts on AI and coding",
    lastCommitDate: "Mar 17, 2026",
  },
  {
    name: "about.md",
    type: "file",
    path: "/about",
    lastCommitMessage: "Update bio and background info",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "contact.md",
    type: "file",
    path: "/contact",
    lastCommitMessage: "Add contact information",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "experience.md",
    type: "file",
    path: "/experience",
    lastCommitMessage: "Update work experience",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "skills.md",
    type: "file",
    path: "/skills",
    lastCommitMessage: "Update tech stack",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "README.md",
    type: "file",
    path: "/",
    lastCommitMessage: "Update README",
    lastCommitDate: "Mar 16, 2026",
  },
];

export const PROJECT_FILES: FileEntry[] = [
  {
    name: "rcore.md",
    type: "file",
    path: "/projects/rcore",
    lastCommitMessage: "Add rcore project details",
    lastCommitDate: "Mar 16, 2026",
  },
  {
    name: "wrapujto.md",
    type: "file",
    path: "/projects/wrapujto",
    lastCommitMessage: "Add wrapujto project details",
    lastCommitDate: "Mar 16, 2026",
  },
];

export interface Language {
  name: string;
  color: string;
  percentage: number;
}

export const LANGUAGES: Language[] = [
  { name: "TypeScript", color: "#3178c6", percentage: 75 },
  { name: "Java", color: "#b07219", percentage: 100 },
  { name: "Lua", color: "#000080", percentage: 100 },
  { name: "SQL", color: "#40e300", percentage: 60 },
];

export interface ToolBadge {
  name: string;
  category: "framework" | "database" | "devops";
}

export const TOOLS: ToolBadge[] = [
  // Frameworks & Libraries
  { name: "Spring Boot", category: "framework" },
  { name: "Guava", category: "framework" },
  { name: "ORM Lite", category: "framework" },
  { name: "JUnit", category: "framework" },
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "Prisma", category: "framework" },
  { name: "TailwindCSS", category: "framework" },
  { name: "Shadcn/ui", category: "framework" },
  { name: "CitizenFX", category: "framework" },
  // Databases
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Redis", category: "database" },
  // DevOps & Infrastructure
  { name: "Docker", category: "devops" },
  { name: "Nginx", category: "devops" },
  { name: "Apache HTTP", category: "devops" },
  { name: "Ubuntu", category: "devops" },
  { name: "Windows Server", category: "devops" },
  { name: "Railway", category: "devops" },
  { name: "Git", category: "devops" },
  { name: "GitHub", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
];

export interface Contributor {
  name: string;
  logo: string;
  url: string;
  slug: string;
}

export const CONTRIBUTORS: Contributor[] = [
  {
    name: "rcore.cz",
    logo: "/logos/rcore.png",
    url: "/projects/rcore",
    slug: "rcore",
  },
  {
    name: "wrapujto.cz",
    logo: "/logos/wrapujto.png",
    url: "/projects/wrapujto",
    slug: "wrapujto",
  },
];

export const TABS = [
  { name: "Code", icon: "code", active: true, count: null },
  { name: "Issues", icon: "issue", active: false, count: 0 },
  { name: "Pull requests", icon: "pr", active: false, count: 0 },
  { name: "Actions", icon: "actions", active: false, count: null },
  { name: "Projects", icon: "projects", active: false, count: 0 },
  { name: "Security", icon: "security", active: false, count: null },
  { name: "Insights", icon: "insights", active: false, count: null },
];
