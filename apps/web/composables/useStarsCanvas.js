/**
 * useStarsCanvas – draws an animated starfield on the #stars-canvas element.
 * Each star has a random size, opacity, and twinkle speed.
 */
export function useStarsCanvas() {
  let canvas = null
  let ctx = null
  let animationId = null
  let stars = []
  let width = 0
  let height = 0

  function createStars(count) {
    stars = []
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.0008 + 0.0002,
        phase: Math.random() * Math.PI * 2,
        color: randomStarColor(),
      })
    }
  }

  function randomStarColor() {
    const colors = [
      'rgba(255,255,255,',
      'rgba(200,220,255,',
      'rgba(220,200,255,',
      'rgba(255,240,200,',
      'rgba(0,220,130,',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function draw(time) {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    stars.forEach((star) => {
      const twinkle = Math.sin(time * star.speed * 1000 + star.phase)
      const opacity = star.opacity * (0.6 + 0.4 * twinkle)
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = star.color + opacity + ')'
      ctx.fill()
    })

    animationId = requestAnimationFrame(draw)
  }

  function resize() {
    if (!canvas) return
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
    createStars(Math.min(Math.floor((width * height) / 4000), 400))
  }

  function start() {
    if (typeof window === 'undefined') return
    canvas = document.getElementById('stars-canvas')
    if (!canvas) return
    ctx = canvas.getContext('2d')
    resize()
    window.addEventListener('resize', resize, { passive: true })
    animationId = requestAnimationFrame(draw)
  }

  function stop() {
    if (animationId) cancelAnimationFrame(animationId)
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', resize)
    }
  }

  return { start, stop }
}
