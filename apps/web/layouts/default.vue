<template>
  <div>
    <!-- Stars canvas (fixed background) -->
    <canvas id="stars-canvas" />

    <!-- Noise texture overlay -->
    <div class="noise-overlay" aria-hidden="true" />

    <!-- Navigation -->
    <NavBar />

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
  export default {
    name: 'DefaultLayout',
  }
</script>
