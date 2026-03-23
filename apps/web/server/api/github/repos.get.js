/**
 * GET /api/github/repos
 * Fetches public repositories for a GitHub user.
 * Proxied through the server to protect rate limits and optionally use a token.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const username = query.username || 'CorentynDevPro'

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'octo-portfolio',
  }

  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`
  }

  try {
    const response = await $fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
      {
        headers,
        query: {
          sort: 'updated',
          per_page: 9,
          type: 'public',
        },
      },
    )

    return response.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics,
      updated_at: repo.updated_at,
    }))
  } catch (err) {
    throw createError({
      statusCode: err.status || 500,
      statusMessage: 'Failed to fetch GitHub repositories',
    })
  }
})
