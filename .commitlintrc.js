module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (no logic)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Tests
        'build', // Build system changes
        'ci', // CI/CD configuration
        'chore', // Routine tasks (deps, tooling)
        'revert', // Revert a commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [1, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 120],
    // Allow longer lines in body/footer (git trailers like Co-authored-by can be long)
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
}
