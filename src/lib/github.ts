import fs from "node:fs";
import path from "node:path";
import { SITE } from "./site-data";

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  language: string | null;
}

function getCached<T>(key: string): T | null {
  const file = path.join(CACHE_DIR, `${key}.json`);
  try {
    const stat = fs.statSync(file);
    if (Date.now() - stat.mtimeMs > CACHE_TTL) return null;
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return null;
  }
}

function setCache(key: string, data: unknown): void {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(CACHE_DIR, `${key}.json`),
      JSON.stringify(data),
    );
  } catch {
    // Non-critical — skip caching silently
  }
}

function authHeaders(): Record<string, string> {
  const token =
    import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN ?? "";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-site",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const cached = getCached<GitHubRepo[]>("repos");
  if (cached) return cached;

  const res = await fetch(
    `https://api.github.com/users/${SITE.username}/repos?per_page=100&sort=pushed&direction=desc`,
    { headers: authHeaders() },
  );

  if (!res.ok) return [];

  const repos: GitHubRepo[] = await res.json();
  setCache("repos", repos);
  return repos;
}

export function getOwnRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => {
      // Repos with stars first (by star count desc), then starless repos by date desc
      if (a.stargazers_count > 0 && b.stargazers_count > 0)
        return b.stargazers_count - a.stargazers_count;
      if (a.stargazers_count > 0) return -1;
      if (b.stargazers_count > 0) return 1;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });
}

export function getForkRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos
    .filter((r) => r.fork)
    .sort((a, b) => {
      if (a.stargazers_count > 0 && b.stargazers_count > 0)
        return b.stargazers_count - a.stargazers_count;
      if (a.stargazers_count > 0) return -1;
      if (b.stargazers_count > 0) return 1;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });
}

export function repoToFileEntry(repo: GitHubRepo) {
  const pushed = new Date(repo.pushed_at);
  const dateStr = pushed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const stars = repo.stargazers_count;
  const desc = repo.description || "No description";
  const label = stars > 0 ? `★${stars} · ${desc}` : desc;

  return {
    name: repo.name,
    type: "file" as const,
    path: repo.html_url,
    lastCommitMessage: label,
    lastCommitDate: dateStr,
    external: true,
  };
}
