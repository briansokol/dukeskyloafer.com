export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string | null;
  stars: number;
}

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage {
              name
              color
            }
            stargazerCount
          }
        }
      }
    }
  }
`;

export async function fetchPinnedRepos(
  token: string,
  username: string
): Promise<PinnedRepo[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
  });

  if (!res.ok) throw new Error(`GitHub API failed: ${res.status}`);

  const json = await res.json();
  const nodes = json.data.user.pinnedItems.nodes;

  return nodes.map((node: any) => ({
    name: node.name,
    description: node.description,
    url: node.url,
    language: node.primaryLanguage?.name ?? null,
    languageColor: node.primaryLanguage?.color ?? null,
    stars: node.stargazerCount,
  }));
}
