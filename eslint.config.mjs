export default [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'build/**',
      '*.min.js',
      'public/js/sql-wasm.wasm',
      'public/data/**'
    ]
  },
  {
    files: ['public/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        // Browser
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        URLSearchParams: 'readonly',

        // App globals
        APP_CONFIG: 'readonly',
        getActiveProvider: 'readonly',
        isDebugMode: 'readonly',
        debugLog: 'readonly',
        i18n: 'readonly',
        I18n: 'readonly',
        TRANSLATIONS: 'readonly',
        DataProvider: 'readonly',
        JSONProvider: 'readonly',
        SQLiteProvider: 'readonly',
        UI: 'readonly',
        App: 'readonly',
        initApp: 'readonly',
        toggleCategoryFilter: 'readonly',
        toggleDonationTypeFilter: 'readonly',
        selectCountry: 'readonly',
        selectState: 'readonly',
        selectCity: 'readonly',
        openOrgModal: 'readonly',
        toggleLanguage: 'readonly',
        clearFilters: 'readonly',
        closeModal: 'readonly',
        initSqlJs: 'readonly',
        tailwind: 'writable',

        // Node/Testing
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'never'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'never'],
      'arrow-spacing': 'error',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-trailing-spaces': 'error'
    }
  }
]
