/**
 * GET /api/github/profile
 * Returns GitHub profile information for a user.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const username = query.username || 'CorentynDevPro'

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'octo-portfolio-api',
  }

  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`
  }

  try {
    const user = await $fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers,
    })

    return {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      location: user.location,
      blog: user.blog,
      twitter_username: user.twitter_username,
      created_at: user.created_at,
    }
  } catch (err) {
    throw createError({
      statusCode: err.status || 500,
      statusMessage: 'Failed to fetch GitHub profile',
    })
  }
})
