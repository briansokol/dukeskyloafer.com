export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string | null;
  stars: number;
}

export interface GitHubRepoNode {
  name: string;
  description: string | null;
  url: string;
  primaryLanguage: { name: string; color: string } | null;
  stargazerCount: number;
}

export interface GitHubGraphQLResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: GitHubRepoNode[];
      };
    };
  };
}
