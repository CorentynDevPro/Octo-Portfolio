/**
 * Nitro config for the standalone API server.
 * @see https://nitro.build/config
 */
export default defineNitroConfig({
  srcDir: 'src',
  output: {
    dir: '.output',
    serverDir: '.output/server',
    publicDir: '.output/public',
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || '',
    apiPort: process.env.PORT || 4000,
  },
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      },
    },
  },
})
