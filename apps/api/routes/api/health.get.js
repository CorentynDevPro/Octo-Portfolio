/**
 * GET /api/health
 */
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'octo-portfolio-api',
    version: '0.0.1',
  }
})
