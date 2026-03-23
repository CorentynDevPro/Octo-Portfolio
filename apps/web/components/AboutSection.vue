<template>
  <section id="about" class="section about-section">
    <div class="container">
      <div class="section-title">
        <h2>About Me</h2>
      </div>
      <p class="section-subtitle">A bit about who I am and what drives me.</p>

      <div class="about-grid">
        <!-- Bio -->
        <div class="about-bio">
          <div class="avatar-wrapper">
            <div class="avatar-ring" />
            <div class="avatar">
              <span>CD</span>
            </div>
            <div class="avatar-orbit">
              <div class="orbit-planet" />
            </div>
          </div>

          <div class="bio-text">
            <h3>CorentynDevPro</h3>
            <p class="bio-role">
              <span class="tag">Full-Stack Developer</span>
              <span class="tag tag-blue">Open Source</span>
            </p>
            <p>
              Passionate developer exploring the digital cosmos. I love building elegant, performant
              web experiences using modern JavaScript frameworks — primarily Vue.js and Nuxt.js.
            </p>
            <p>
              My journey started with curiosity and grew into a deep love for software
              craftsmanship, clean architecture, and developer experience.
            </p>
            <div class="bio-links">
              <a
                href="https://github.com/CorentynDevPro"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ghost"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
                @CorentynDevPro
              </a>
            </div>
          </div>
        </div>

        <!-- Info cards -->
        <div class="about-cards">
          <div v-for="card in cards" :key="card.title" class="card info-card">
            <div class="info-card-icon">{{ card.icon }}</div>
            <h4>{{ card.title }}</h4>
            <p>{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'AboutSection',
    data() {
      return {
        cards: [
          {
            icon: '🚀',
            title: 'Performance',
            desc: 'I obsess over Core Web Vitals, bundle sizes, and delivering blazing-fast user experiences.',
          },
          {
            icon: '🎨',
            title: 'Design Systems',
            desc: 'Building consistent, accessible UI components that scale across products.',
          },
          {
            icon: '🔧',
            title: 'DevOps',
            desc: 'CI/CD pipelines, Docker containerization, and automated deployments are second nature.',
          },
          {
            icon: '🌐',
            title: 'Open Source',
            desc: 'Contributing to the community is important to me — I believe in giving back.',
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .about-section {
    position: relative;
    z-index: 10;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(22, 27, 34, 0.7) 20%,
      rgba(22, 27, 34, 0.7) 80%,
      transparent 100%
    );
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .about-bio {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ---- Avatar ---- */
  .avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .avatar-ring {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid var(--nuxt-green);
    opacity: 0.4;
    animation: pulse-glow 3s ease-in-out infinite;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gh-canvas-subtle) 0%, rgba(0, 220, 130, 0.15) 100%);
    border: 2px solid var(--gh-border-default);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--nuxt-green);
  }

  .avatar-orbit {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    border: 1px dashed rgba(56, 139, 253, 0.3);
  }

  .orbit-planet {
    position: absolute;
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 35% 35%, #388bfd, #0d1117);
    border-radius: 50%;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    animation: orbit 8s linear infinite;
    transform-origin: 6px calc(80px + 6px);
  }

  .bio-text {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .bio-text h3 {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    color: var(--gh-fg-default);
  }

  .bio-role {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .bio-links {
    margin-top: 0.5rem;
  }

  /* ---- Cards ---- */
  .about-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .info-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-card-icon {
    font-size: 1.75rem;
  }

  .info-card h4 {
    font-size: 0.95rem;
    color: var(--gh-fg-default);
  }

  .info-card p {
    font-size: 0.85rem;
    color: var(--gh-fg-muted);
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .about-cards {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .about-cards {
      grid-template-columns: 1fr;
    }
  }
</style>
