import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      '**/.output/**',
      '**/.nuxt/**',
      '**/.nitro/**',
      '**/.turbo/**',
      '**/dist/**',
      // Vue files are handled by apps/web's own ESLint config
      '**/*.vue',
    ],
  },
  {
    // ESM files
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
    },
  },
  {
    // CommonJS config files
    files: ['**/*.cjs', '.commitlintrc.js', 'apps/api/.eslintrc.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2022,
      globals: {
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
  },
  {
    // All source JS files (Nuxt / Nitro / Node auto-imports)
    files: ['apps/**/*.js', 'packages/**/*.js'],
    languageOptions: {
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        IntersectionObserver: 'readonly',
        HTMLElement: 'readonly',
        fetch: 'readonly',
        // Nitro / H3 auto-imports
        defineEventHandler: 'readonly',
        defineNitroConfig: 'readonly',
        getQuery: 'readonly',
        readBody: 'readonly',
        createError: 'readonly',
        useRuntimeConfig: 'readonly',
        $fetch: 'readonly',
        // Nuxt / Vue 3 Composition API auto-imports
        ref: 'readonly',
        computed: 'readonly',
        reactive: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onBeforeUnmount: 'readonly',
        onUnmounted: 'readonly',
        defineNuxtConfig: 'readonly',
        navigateTo: 'readonly',
        // Node globals
        process: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
]
