<template>
  <footer class="footer">
    <div class="divider" />
    <div class="container">
      <div class="footer-inner">
        <div class="footer-left">
          <span class="logo-icon">🐙</span>
          <span class="footer-logo">
            <span class="text-gradient">Octo</span>
            Portfolio
          </span>
          <p class="footer-desc">Crafting digital experiences from the cosmos.</p>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <h4>Navigation</h4>
            <NuxtLink to="#about">About</NuxtLink>
            <NuxtLink to="#skills">Skills</NuxtLink>
            <NuxtLink to="#projects">Projects</NuxtLink>
            <NuxtLink to="#contact">Contact</NuxtLink>
          </div>
          <div class="footer-col">
            <h4>Find me on</h4>
            <a href="https://github.com/CorentynDevPro" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">
          &copy; {{ currentYear }} CorentynDevPro. Built with
          <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer">Nuxt.js</a>
          &amp;
          <span class="text-gradient">love</span>
          among the stars 🌟
        </p>
        <div class="footer-status">
          <span class="status-dot" />
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      },
    },
  }
</script>

<style scoped>
  .footer {
    position: relative;
    z-index: 10;
    margin-top: 4rem;
  }

  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 3rem 0 2rem;
    gap: 3rem;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 260px;
  }

  .logo-icon {
    font-size: 1.75rem;
  }

  .footer-logo {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--gh-fg-default);
  }

  .footer-desc {
    font-size: 0.875rem;
    color: var(--gh-fg-subtle);
    line-height: 1.6;
  }

  .footer-links {
    display: flex;
    gap: 4rem;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-col h4 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--gh-fg-subtle);
    margin-bottom: 0.25rem;
  }

  .footer-col a {
    font-size: 0.875rem;
    color: var(--gh-fg-muted);
    text-decoration: none;
    transition: color var(--transition-base);
  }

  .footer-col a:hover {
    color: var(--nuxt-green);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    border-top: 1px solid var(--gh-border-muted);
    gap: 1rem;
  }

  .footer-copy {
    font-size: 0.8rem;
    color: var(--gh-fg-subtle);
  }

  .footer-copy a {
    color: var(--nuxt-green);
  }

  .footer-status {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: var(--gh-fg-subtle);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--nuxt-green);
    animation: pulse-glow 2s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(0, 220, 130, 0.6);
  }

  @media (max-width: 768px) {
    .footer-inner {
      flex-direction: column;
      gap: 2rem;
      padding: 2rem 0 1.5rem;
    }

    .footer-links {
      gap: 2rem;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }
</style>
