<template>
  <section class="hero parallax-scene" aria-label="Hero">
    <!-- Parallax layer: distant nebula -->
    <div
      class="parallax-layer nebula-layer"
      :style="{ transform: getLayerTransform(0.15) }"
      aria-hidden="true"
    >
      <div class="nebula nebula-1" />
      <div class="nebula nebula-2" />
      <div class="nebula nebula-3" />
    </div>

    <!-- Parallax layer: planets / moons -->
    <div
      class="parallax-layer planets-layer"
      :style="{ transform: getLayerTransform(0.3) }"
      aria-hidden="true"
    >
      <div class="planet planet-1">
        <div class="planet-ring" />
      </div>
      <div class="planet planet-2" />
      <div class="moon moon-1" />
      <div class="moon moon-2" />
    </div>

    <!-- Parallax layer: floating asteroids -->
    <div
      class="parallax-layer asteroids-layer"
      :style="{ transform: getLayerTransform(0.5) }"
      aria-hidden="true"
    >
      <div v-for="n in 8" :key="n" class="asteroid" :class="`asteroid-${n}`" />
    </div>

    <!-- Foreground content (fixed, no parallax) -->
    <div class="hero-content container">
      <div class="hero-text">
        <p class="hero-greeting animate-slide-up">
          <span class="prompt-char">~/</span>
          <span class="greeting-text">Hello, Universe 👋</span>
        </p>

        <h1 class="hero-title animate-slide-up" style="animation-delay: 0.1s">
          I'm
          <span class="text-gradient">CorentynDevPro</span>
        </h1>

        <div class="hero-subtitle animate-slide-up" style="animation-delay: 0.2s">
          <span class="typed-text">{{ displayedRole }}</span>
          <span class="cursor" :class="{ blink: !isTyping }">█</span>
        </div>

        <p class="hero-desc animate-slide-up" style="animation-delay: 0.3s">
          Crafting stellar digital experiences from the cosmos — full-stack developer passionate
          about clean code, performance, and open source.
        </p>

        <div class="hero-cta animate-slide-up" style="animation-delay: 0.4s">
          <a href="#projects" class="btn btn-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            View Projects
          </a>
          <a href="#contact" class="btn btn-outline">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get in Touch
          </a>
        </div>

        <!-- Quick stats -->
        <div class="hero-stats animate-slide-up" style="animation-delay: 0.5s">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <span class="stat-value text-gradient">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Terminal card -->
      <div class="hero-terminal animate-slide-up" style="animation-delay: 0.3s">
        <div class="terminal animate-float">
          <div class="terminal-header">
            <span class="terminal-dot red" />
            <span class="terminal-dot yellow" />
            <span class="terminal-dot green" />
            <span class="terminal-title">~/portfolio — bash</span>
          </div>
          <div class="terminal-body">
            <div>
              <span class="prompt">$</span>
              <span class="command">whoami</span>
            </div>
            <div class="output">CorentynDevPro</div>
            <br />
            <div>
              <span class="prompt">$</span>
              <span class="command">cat about.json</span>
            </div>
            <div class="output">{</div>
            <div class="output">
              &nbsp;&nbsp;"role":
              <span class="string">"Full-Stack Developer"</span>
              ,
            </div>
            <div class="output">
              &nbsp;&nbsp;"location":
              <span class="string">"🌍 Earth (Remote)"</span>
              ,
            </div>
            <div class="output">
              &nbsp;&nbsp;"stack": [
              <span class="string">"Vue"</span>
              ,
              <span class="string">"Nuxt"</span>
              ,
              <span class="string">"Node"</span>
              ],
            </div>
            <div class="output">
              &nbsp;&nbsp;"status":
              <span class="string-green">"Open to work"</span>
            </div>
            <div class="output">}</div>
            <br />
            <div>
              <span class="prompt">$</span>
              <span class="command">ls projects/</span>
            </div>
            <div class="output">
              <span class="dir">octo-portfolio</span>
              &nbsp;
              <span class="dir">api-gateway</span>
              &nbsp;
              <span class="dir">...</span>
            </div>
            <div class="cursor-line">
              <span class="prompt">$</span>
              <span class="cursor blink">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" aria-hidden="true">
      <span>Scroll to explore</span>
      <div class="scroll-arrow">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
  import { useParallax } from '~/composables/useParallax'

  const ROLES = [
    'Full-Stack Developer',
    'Vue.js Enthusiast',
    'Open Source Contributor',
    'Nuxt.js Developer',
    'API Architect',
  ]

  export default {
    name: 'HeroSection',
    setup() {
      const { getLayerTransform } = useParallax()
      return { getLayerTransform }
    },
    data() {
      return {
        displayedRole: '',
        isTyping: false,
        roleIndex: 0,
        charIndex: 0,
        typingTimer: null,
        stats: [
          { value: '10+', label: 'Projects Built' },
          { value: '3+', label: 'Years Coding' },
          { value: '∞', label: 'Coffee ☕' },
        ],
      }
    },
    mounted() {
      this.startTyping()
    },
    beforeUnmount() {
      clearTimeout(this.typingTimer)
    },
    methods: {
      startTyping() {
        this.typeNextChar()
      },
      typeNextChar() {
        const currentRole = ROLES[this.roleIndex]
        if (this.charIndex < currentRole.length) {
          this.isTyping = true
          this.displayedRole = currentRole.slice(0, ++this.charIndex)
          this.typingTimer = setTimeout(this.typeNextChar, 80)
        } else {
          this.isTyping = false
          this.typingTimer = setTimeout(this.eraseChars, 2200)
        }
      },
      eraseChars() {
        if (this.charIndex > 0) {
          this.isTyping = true
          this.displayedRole = ROLES[this.roleIndex].slice(0, --this.charIndex)
          this.typingTimer = setTimeout(this.eraseChars, 45)
        } else {
          this.isTyping = false
          this.roleIndex = (this.roleIndex + 1) % ROLES.length
          this.typingTimer = setTimeout(this.typeNextChar, 400)
        }
      },
    },
  }
</script>

<style scoped>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-top: var(--navbar-height);
  }

  /* ---- Nebulas ---- */
  .nebula-layer {
    z-index: 1;
  }

  .nebula {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  .nebula-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(163, 113, 247, 0.18) 0%, transparent 70%);
    top: -100px;
    right: -200px;
  }

  .nebula-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(56, 139, 253, 0.15) 0%, transparent 70%);
    bottom: 100px;
    left: -100px;
  }

  .nebula-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 220, 130, 0.1) 0%, transparent 70%);
    top: 40%;
    left: 40%;
  }

  /* ---- Planets ---- */
  .planets-layer {
    z-index: 2;
  }

  .planet {
    position: absolute;
    border-radius: 50%;
  }

  .planet-1 {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle at 35% 35%, #4a5568 0%, #1a202c 60%, #0d1117 100%);
    top: 12%;
    right: 8%;
    box-shadow:
      inset -20px -20px 40px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(163, 113, 247, 0.2);
    animation: float 8s ease-in-out infinite;
  }

  .planet-ring {
    position: absolute;
    width: 170px;
    height: 30px;
    border: 2px solid rgba(163, 113, 247, 0.35);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(70deg);
  }

  .planet-2 {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 35% 35%, #2d6a4f 0%, #1b4332 60%, #081c15 100%);
    bottom: 20%;
    right: 20%;
    box-shadow:
      inset -10px -10px 20px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(0, 220, 130, 0.15);
    animation: float 6s ease-in-out infinite;
    animation-delay: -3s;
  }

  .moon-1 {
    width: 25px;
    height: 25px;
    background: radial-gradient(circle at 35% 35%, #6e7681, #30363d);
    top: 15%;
    left: 15%;
    box-shadow: inset -4px -4px 8px rgba(0, 0, 0, 0.5);
    animation: float 5s ease-in-out infinite;
    animation-delay: -1s;
  }

  .moon-2 {
    width: 16px;
    height: 16px;
    background: radial-gradient(circle at 35% 35%, #8b949e, #484f58);
    top: 60%;
    right: 35%;
    box-shadow: inset -3px -3px 6px rgba(0, 0, 0, 0.5);
    animation: float 7s ease-in-out infinite;
    animation-delay: -4s;
  }

  /* ---- Asteroids ---- */
  .asteroids-layer {
    z-index: 3;
  }

  .asteroid {
    position: absolute;
    background: radial-gradient(circle at 40% 40%, #484f58, #21262d);
    border-radius: 30% 70% 60% 40% / 50% 30% 70% 50%;
    opacity: 0.6;
  }

  .asteroid-1 {
    width: 14px;
    height: 10px;
    top: 25%;
    left: 10%;
    animation: float 9s ease-in-out infinite;
  }
  .asteroid-2 {
    width: 8px;
    height: 6px;
    top: 70%;
    left: 5%;
    animation: float 7s ease-in-out infinite;
    animation-delay: -2s;
  }
  .asteroid-3 {
    width: 12px;
    height: 9px;
    top: 40%;
    right: 12%;
    animation: float 11s ease-in-out infinite;
    animation-delay: -5s;
  }
  .asteroid-4 {
    width: 6px;
    height: 5px;
    top: 80%;
    right: 8%;
    animation: float 8s ease-in-out infinite;
    animation-delay: -1s;
  }
  .asteroid-5 {
    width: 10px;
    height: 8px;
    top: 55%;
    left: 25%;
    animation: float 10s ease-in-out infinite;
    animation-delay: -3s;
  }
  .asteroid-6 {
    width: 7px;
    height: 5px;
    top: 18%;
    left: 55%;
    animation: float 6s ease-in-out infinite;
    animation-delay: -4s;
  }
  .asteroid-7 {
    width: 11px;
    height: 8px;
    top: 88%;
    left: 45%;
    animation: float 12s ease-in-out infinite;
    animation-delay: -6s;
  }
  .asteroid-8 {
    width: 5px;
    height: 4px;
    top: 35%;
    left: 78%;
    animation: float 8s ease-in-out infinite;
    animation-delay: -2s;
  }

  /* ---- Hero content ---- */
  .hero-content {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 6rem;
  }

  .hero-greeting {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--nuxt-green);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .prompt-char {
    opacity: 0.6;
  }

  .hero-title {
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-family: var(--font-mono);
    font-size: clamp(1rem, 2vw, 1.3rem);
    color: var(--space-blue);
    margin-bottom: 1.25rem;
    min-height: 2em;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .cursor {
    display: inline-block;
    color: var(--space-blue);
  }

  .cursor.blink {
    animation: blink-caret 1s step-end infinite;
  }

  @keyframes blink-caret {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .hero-desc {
    font-size: 1rem;
    color: var(--gh-fg-muted);
    max-width: 480px;
    margin-bottom: 2rem;
    line-height: 1.8;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  .hero-stats {
    display: flex;
    gap: 2.5rem;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--gh-fg-subtle);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ---- Terminal ---- */
  .hero-terminal {
    display: flex;
    justify-content: center;
  }

  .terminal {
    width: 100%;
    max-width: 440px;
  }

  .terminal-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--gh-fg-subtle);
    margin-left: 0.5rem;
  }

  .terminal-body {
    font-size: 0.85rem;
  }

  .string {
    color: #a5d6ff;
  }
  .string-green {
    color: var(--nuxt-green);
  }
  .dir {
    color: var(--space-blue);
  }
  .cursor-line {
    margin-top: 0.25rem;
  }

  /* ---- Scroll indicator ---- */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--gh-fg-subtle);
    animation: fade-in 1s 1.5s ease both;
    z-index: 10;
  }

  .scroll-arrow {
    animation: float 2s ease-in-out infinite;
    color: var(--nuxt-green);
  }

  /* ---- Responsive ---- */
  @media (max-width: 900px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      padding-bottom: 5rem;
    }

    .hero-terminal {
      order: -1;
    }

    .hero-stats {
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .hero-cta {
      flex-direction: column;
    }

    .hero-stats {
      gap: 1.25rem;
    }
  }
</style>
