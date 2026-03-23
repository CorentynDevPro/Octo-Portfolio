/**
 * GET /api/health
 * Health check endpoint for monitoring and CI/CD.
 */
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'octo-portfolio-web',
    version: '0.0.1',
  }
})
