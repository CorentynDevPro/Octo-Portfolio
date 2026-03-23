<template>
  <section id="contact" class="section contact-section">
    <div class="container">
      <div class="section-title">
        <h2>Get in Touch</h2>
      </div>
      <p class="section-subtitle">
        Have a project in mind, or just want to say hello? I'd love to hear from you.
      </p>

      <div class="contact-grid">
        <!-- Left: contact info -->
        <div class="contact-info">
          <div class="contact-card card">
            <h3>Let's work together</h3>
            <p>
              Whether it's a freelance project, a collaboration, or just a chat about tech — my
              inbox is always open.
            </p>

            <div class="contact-links">
              <a
                href="https://github.com/CorentynDevPro"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
              >
                <div class="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </div>
                <div>
                  <span class="contact-link-label">GitHub</span>
                  <span class="contact-link-value">@CorentynDevPro</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Space decoration -->
          <div class="contact-deco" aria-hidden="true">
            <div class="deco-planet" />
            <div class="deco-ring" />
            <p class="deco-text">✨ Open to opportunities &amp; collaborations</p>
          </div>
        </div>

        <!-- Right: contact form -->
        <div class="contact-form-wrap">
          <form class="contact-form card" @submit.prevent="handleSubmit">
            <div v-if="submitStatus" class="form-alert" :class="submitStatus.type">
              {{ submitStatus.message }}
            </div>

            <div class="form-group">
              <label for="contact-name">Name</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                required
                :disabled="submitting"
              />
            </div>

            <div class="form-group">
              <label for="contact-email">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                required
                :disabled="submitting"
              />
            </div>

            <div class="form-group">
              <label for="contact-subject">Subject</label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                placeholder="What's this about?"
                :disabled="submitting"
              />
            </div>

            <div class="form-group">
              <label for="contact-message">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                placeholder="Tell me about your project…"
                rows="5"
                required
                :disabled="submitting"
              />
            </div>

            <button type="submit" class="btn btn-primary submit-btn" :disabled="submitting">
              <span v-if="submitting" class="loading-spinner small" />
              {{ submitting ? 'Sending…' : 'Send Message 🚀' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ContactSection',
    data() {
      return {
        submitting: false,
        submitStatus: null,
        form: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
      }
    },
    methods: {
      async handleSubmit() {
        this.submitting = true
        this.submitStatus = null
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.form),
          })
          if (!res.ok) throw new Error('Failed to send')
          this.submitStatus = {
            type: 'success',
            message: "🚀 Message sent successfully! I'll get back to you soon.",
          }
          this.form = { name: '', email: '', subject: '', message: '' }
        } catch {
          this.submitStatus = {
            type: 'error',
            message: '❌ Failed to send. Please try again or reach out directly on GitHub.',
          }
        } finally {
          this.submitting = false
        }
      },
    },
  }
</script>

<style scoped>
  .contact-section {
    position: relative;
    z-index: 10;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: start;
  }

  .contact-card {
    margin-bottom: 1.5rem;
  }

  .contact-card h3 {
    font-size: 1.15rem;
    margin-bottom: 0.75rem;
  }

  .contact-links {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    padding: 0.6rem;
    border-radius: 8px;
    transition: background var(--transition-base);
    color: inherit;
  }

  .contact-link:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  .contact-link-icon {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: var(--gh-canvas-inset);
    border: 1px solid var(--gh-border-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gh-fg-default);
    flex-shrink: 0;
  }

  .contact-link-label {
    display: block;
    font-size: 0.78rem;
    color: var(--gh-fg-subtle);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .contact-link-value {
    display: block;
    font-size: 0.9rem;
    color: var(--nuxt-green);
    font-family: var(--font-mono);
  }

  /* Deco */
  .contact-deco {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    text-align: center;
    position: relative;
  }

  .deco-planet {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #2d3748 0%, #1a202c 60%, #0d1117 100%);
    box-shadow:
      inset -12px -12px 25px rgba(0, 0, 0, 0.5),
      0 0 25px rgba(163, 113, 247, 0.25);
    animation: float 6s ease-in-out infinite;
  }

  .deco-ring {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 110px;
    height: 20px;
    border: 1.5px solid rgba(163, 113, 247, 0.3);
    border-radius: 50%;
    margin-top: 35px;
  }

  .deco-text {
    font-size: 0.85rem;
    color: var(--gh-fg-muted);
    margin-top: 2.5rem;
  }

  /* Form */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--gh-fg-default);
  }

  .form-group input,
  .form-group textarea {
    background: var(--gh-canvas-inset);
    border: 1px solid var(--gh-border-default);
    border-radius: 8px;
    padding: 0.65rem 0.9rem;
    color: var(--gh-fg-default);
    font-family: var(--font-sans);
    font-size: 0.9rem;
    transition: border-color var(--transition-base);
    width: 100%;
    outline: none;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: var(--nuxt-green);
    box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.1);
  }

  .form-group input:disabled,
  .form-group textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-alert {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
  }

  .form-alert.success {
    background: rgba(0, 220, 130, 0.1);
    border: 1px solid rgba(0, 220, 130, 0.3);
    color: var(--nuxt-green);
  }

  .form-alert.error {
    background: rgba(248, 81, 73, 0.1);
    border: 1px solid rgba(248, 81, 73, 0.3);
    color: var(--space-red);
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  .loading-spinner.small {
    width: 14px;
    height: 14px;
    border-width: 2px;
    border-color: rgba(0, 0, 0, 0.2);
    border-top-color: #0d1117;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .contact-deco {
      display: none;
    }
  }
</style>
