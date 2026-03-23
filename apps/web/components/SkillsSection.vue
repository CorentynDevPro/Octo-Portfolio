<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <div class="section-title">
        <h2>Skills &amp; Tech Stack</h2>
      </div>
      <p class="section-subtitle">Technologies I work with on a daily basis.</p>

      <!-- Category tabs -->
      <div class="skill-tabs">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="skill-tab"
          :class="{ active: activeCategory === cat.key }"
          @click="activeCategory = cat.key"
        >
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>

      <!-- Skills grid -->
      <div class="skills-grid">
        <div v-for="skill in filteredSkills" :key="skill.name" class="skill-card card">
          <div class="skill-header">
            <span class="skill-icon">{{ skill.icon }}</span>
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-percent">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-fill" :style="{ width: animated ? skill.level + '%' : '0%' }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  const SKILLS = [
    { name: 'Vue.js', icon: '💚', level: 92, category: 'frontend' },
    { name: 'Nuxt.js', icon: '🟢', level: 90, category: 'frontend' },
    { name: 'JavaScript (ES2024)', icon: '🟡', level: 95, category: 'frontend' },
    { name: 'HTML5 / CSS3', icon: '🎨', level: 93, category: 'frontend' },
    { name: 'Tailwind CSS', icon: '🌊', level: 85, category: 'frontend' },
    { name: 'Node.js', icon: '🟩', level: 88, category: 'backend' },
    { name: 'Nitro / H3', icon: '⚡', level: 82, category: 'backend' },
    { name: 'REST APIs', icon: '🔌', level: 90, category: 'backend' },
    { name: 'GraphQL', icon: '💜', level: 75, category: 'backend' },
    { name: 'PostgreSQL', icon: '🐘', level: 78, category: 'backend' },
    { name: 'Docker', icon: '🐳', level: 82, category: 'devops' },
    { name: 'GitHub Actions', icon: '⚙️', level: 85, category: 'devops' },
    { name: 'Vercel / Netlify', icon: '▲', level: 88, category: 'devops' },
    { name: 'Linux / Bash', icon: '🐧', level: 80, category: 'devops' },
    { name: 'TurboRepo', icon: '🚀', level: 78, category: 'devops' },
  ]

  export default {
    name: 'SkillsSection',
    data() {
      return {
        activeCategory: 'all',
        animated: false,
        categories: [
          { key: 'all', label: 'All', icon: '🌐' },
          { key: 'frontend', label: 'Frontend', icon: '🎨' },
          { key: 'backend', label: 'Backend', icon: '⚙️' },
          { key: 'devops', label: 'DevOps', icon: '🚀' },
        ],
        observer: null,
      }
    },
    computed: {
      filteredSkills() {
        if (this.activeCategory === 'all') return SKILLS
        return SKILLS.filter((s) => s.category === this.activeCategory)
      },
    },
    mounted() {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.animated = true
            this.observer.disconnect()
          }
        },
        { threshold: 0.2 },
      )
      this.observer.observe(this.$el)
    },
    beforeUnmount() {
      if (this.observer) this.observer.disconnect()
    },
  }
</script>

<style scoped>
  .skills-section {
    position: relative;
    z-index: 10;
  }

  .skill-tabs {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .skill-tab {
    padding: 0.45rem 1rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--gh-border-default);
    background: transparent;
    color: var(--gh-fg-muted);
    transition: all var(--transition-base);
  }

  .skill-tab:hover {
    border-color: var(--nuxt-green);
    color: var(--nuxt-green);
  }

  .skill-tab.active {
    background: rgba(0, 220, 130, 0.12);
    border-color: var(--nuxt-green);
    color: var(--nuxt-green);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .skill-card {
    padding: 1.25rem;
  }

  .skill-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  }

  .skill-icon {
    font-size: 1.25rem;
    width: 1.5rem;
    text-align: center;
  }

  .skill-name {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--gh-fg-default);
  }

  .skill-percent {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--nuxt-green);
  }
</style>
