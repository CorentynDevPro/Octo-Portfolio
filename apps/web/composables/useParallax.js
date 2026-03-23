/**
 * useParallax – provides scroll-based parallax offset values.
 * Returns reactive `offsetY` values for multiple layers at different speeds.
 */
export function useParallax() {
  const scrollY = ref(0)

  function getLayerTransform(speed) {
    return `translateY(${scrollY.value * speed}px)`
  }

  function handleScroll() {
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
  })

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    scrollY,
    getLayerTransform,
  }
}
