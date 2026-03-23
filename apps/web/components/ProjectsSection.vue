<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <div class="section-title">
        <h2>Projects</h2>
      </div>
      <p class="section-subtitle">Things I've built and shipped across the galaxy.</p>

      <!-- GitHub live data banner -->
      <div v-if="repos.length" class="live-banner">
        <span class="status-dot" />
        <span>Live data from GitHub API</span>
        <span class="tag">{{ repos.length }} repos</span>
      </div>

      <div class="projects-grid">
        <div
          v-for="project in displayedProjects"
          :key="project.id || project.name"
          class="project-card card"
        >
          <div class="project-card-header">
            <div class="project-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M3 3h18v18H3z M3 9h18 M9 21V9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="project-links">
              <a
                v-if="project.html_url || project.url"
                :href="project.html_url || project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-link"
                aria-label="GitHub repository"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                v-if="project.homepage"
                :href="project.homepage"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-link"
                aria-label="Live demo"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">
            {{ project.description || 'No description provided.' }}
          </p>

          <div class="project-meta">
            <span v-if="project.language" class="tag">
              {{ project.language }}
            </span>
            <span v-if="project.stargazers_count" class="project-stars">
              ⭐ {{ project.stargazers_count }}
            </span>
            <span v-if="project.forks_count" class="project-forks">
              🍴 {{ project.forks_count }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="projects-loading">
        <div class="loading-spinner" />
        <span>Fetching from GitHub API…</span>
      </div>

      <div v-if="!loading && displayedProjects.length === 0" class="projects-empty">
        <p>No projects found. Check back soon! 🚀</p>
      </div>

      <div class="projects-footer">
        <a
          href="https://github.com/CorentynDevPro?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline"
        >
          View all on GitHub →
        </a>
      </div>
    </div>
  </section>
</template>

<script>
  const FALLBACK_PROJECTS = [
    {
      id: 1,
      name: 'octo-portfolio',
      description: 'Space-themed developer portfolio built with Nuxt.js, TurboRepo, and PNPM.',
      html_url: 'https://github.com/CorentynDevPro/Octo-Portfolio',
      homepage: null,
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
    },
  ]

  export default {
    name: 'ProjectsSection',
    data() {
      return {
        repos: [],
        loading: false,
      }
    },
    computed: {
      displayedProjects() {
        return this.repos.length > 0 ? this.repos : FALLBACK_PROJECTS
      },
    },
    async mounted() {
      await this.fetchRepos()
    },
    methods: {
      async fetchRepos() {
        this.loading = true
        try {
          const config = useRuntimeConfig()
          const username = config.public.githubUsername || 'CorentynDevPro'
          const res = await fetch(`/api/github/repos?username=${username}`)
          if (!res.ok) throw new Error('Failed to fetch repos')
          this.repos = await res.json()
        } catch {
          // Silently fall back to static data
          this.repos = []
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>

<style scoped>
  .projects-section {
    position: relative;
    z-index: 10;
  }

  .live-banner {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    background: rgba(0, 220, 130, 0.06);
    border: 1px solid rgba(0, 220, 130, 0.2);
    font-size: 0.8rem;
    color: var(--gh-fg-muted);
    margin-bottom: 1.75rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--nuxt-green);
    box-shadow: 0 0 6px rgba(0, 220, 130, 0.6);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .project-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .project-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--gh-canvas-inset);
    border: 1px solid var(--gh-border-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--nuxt-green);
  }

  .project-links {
    display: flex;
    gap: 0.5rem;
  }

  .icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    color: var(--gh-fg-muted);
    border: 1px solid var(--gh-border-muted);
    transition: all var(--transition-base);
    text-decoration: none;
  }

  .icon-link:hover {
    color: var(--nuxt-green);
    border-color: var(--nuxt-green);
    background: rgba(0, 220, 130, 0.08);
  }

  .project-name {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--gh-fg-default);
  }

  .project-desc {
    font-size: 0.875rem;
    color: var(--gh-fg-muted);
    line-height: 1.6;
    flex: 1;
  }

  .project-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: auto;
  }

  .project-stars,
  .project-forks {
    font-size: 0.78rem;
    color: var(--gh-fg-subtle);
  }

  .projects-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 3rem;
    color: var(--gh-fg-muted);
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gh-border-default);
    border-top-color: var(--nuxt-green);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .projects-empty {
    text-align: center;
    padding: 3rem;
    color: var(--gh-fg-muted);
  }

  .projects-footer {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
