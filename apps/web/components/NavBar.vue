<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="navbar-inner">
        <!-- Logo -->
        <NuxtLink to="/" class="navbar-logo">
          <span class="logo-icon">🐙</span>
          <span class="logo-text">
            <span class="text-gradient">Octo</span>
            Portfolio
          </span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="navbar-links" :class="{ open: menuOpen }">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="navbar-link"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            href="https://github.com/CorentynDevPro"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>

        <!-- Mobile burger -->
        <button
          class="navbar-burger"
          :class="{ active: menuOpen }"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        isScrolled: false,
        menuOpen: false,
        navLinks: [
          { href: '#about', label: 'About' },
          { href: '#skills', label: 'Skills' },
          { href: '#projects', label: 'Projects' },
          { href: '#contact', label: 'Contact' },
        ],
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
      this.handleScroll()
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        this.isScrolled = window.scrollY > 20
      },
    },
  }
</script>

<style scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: var(--navbar-height);
  }

  .navbar.scrolled {
    background: rgba(13, 17, 23, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--gh-border-muted);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--navbar-height);
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--gh-fg-default);
    text-decoration: none;
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .navbar-link {
    color: var(--gh-fg-muted);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    transition: all var(--transition-base);
    text-decoration: none;
  }

  .navbar-link:hover,
  .navbar-link.router-link-active {
    color: var(--gh-fg-default);
    background: rgba(255, 255, 255, 0.05);
  }

  .btn-sm {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }

  .navbar-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
  }

  .navbar-burger span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--gh-fg-muted);
    border-radius: 2px;
    transition: all var(--transition-base);
    transform-origin: center;
  }

  .navbar-burger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .navbar-burger.active span:nth-child(2) {
    opacity: 0;
  }
  .navbar-burger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .navbar-burger {
      display: flex;
    }

    .navbar-links {
      display: none;
      position: fixed;
      top: var(--navbar-height);
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      padding: 1rem;
      background: rgba(13, 17, 23, 0.98);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--gh-border-muted);
      gap: 0.25rem;
    }

    .navbar-links.open {
      display: flex;
    }

    .navbar-link {
      padding: 0.75rem 1rem;
    }
  }
</style>
