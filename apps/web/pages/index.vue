<template>
  <div class="home">
    <!-- Hero Section with Parallax -->
    <HeroSection />

    <!-- About Section -->
    <AboutSection />

    <!-- Skills Section -->
    <SkillsSection />

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script>
  import { useStarsCanvas } from '~/composables/useStarsCanvas'

  export default {
    name: 'HomePage',
    setup() {
      const { start, stop } = useStarsCanvas()
      onMounted(() => start())
      onBeforeUnmount(() => stop())
    },
  }
</script>
