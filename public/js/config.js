/**
 * Let's Help It - Application Configuration
 *
 * This file controls which data provider is used to load organization data.
 * The system supports multiple providers with automatic detection.
 */

const APP_CONFIG = {
  /**
   * Data Provider Selection
   *
   * Options:
   * - 'auto': Automatically detects best provider
   *   - On localhost: tries SQLite first, falls back to JSON
   *   - On GitHub Pages: always uses JSON
   * - 'json': Forces JSON provider (recommended for production)
   * - 'sqlite': Forces SQLite provider (for local development)
   *
   * Can be overridden via URL query: ?provider=json or ?provider=sqlite
   */
  dataProvider: 'json',

  /**
   * Data Sources Configuration
   */
  dataSources: {
    json: {
      // Organization data files
      organizations: 'data/organizations/br-rs.json',

      // Configuration files
      categories: 'data/config/categories.json',
      donationTypes: 'data/config/donation-types.json',
      locations: 'data/locations.json'
    },

    sqlite: {
      // SQLite database file (loaded in browser via sql.js)
      database: 'data/organizations.sqlite',

      // sql.js WebAssembly file
      wasmFile: 'js/sql-wasm.wasm'
    }
  },

  /**
   * Default Language
   * Options: 'pt' (Portuguese) or 'en' (English)
   */
  defaultLanguage: 'pt',

  /**
   * Application Settings
   */
  settings: {
    // Number of organizations to show per page (0 = show all)
    organizationsPerPage: 0,

    // Enable debug logging
    debug: false,

    // Cache duration in milliseconds (for future use)
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  },

  /**
   * Feature Flags
   */
  features: {
    // Enable search functionality
    search: true,

    // Enable category filters
    categoryFilters: true,

    // Enable donation type filters
    donationTypeFilters: true,

    // Enable location breadcrumb navigation
    breadcrumbNavigation: true,

    // Enable organization detail modal
    detailModal: true,

    // Enable Google AdSense (future)
    ads: false
  }
}

/**
 * Get the active data provider type
 * Checks URL query parameters first, then falls back to config
 */
function getActiveProvider() {
  // Check URL query parameter
  const urlParams = new URLSearchParams(window.location.search)
  const providerParam = urlParams.get('provider')

  if (providerParam && ['json', 'sqlite', 'auto'].includes(providerParam)) {
    return providerParam
  }

  // Use config default
  const provider = APP_CONFIG.dataProvider

  // Auto-detect logic
  if (provider === 'auto') {
    const isLocalhost = window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === ''

    // On GitHub Pages or production: always use JSON
    if (!isLocalhost) {
      return 'json'
    }

    // On localhost: return 'auto' and let provider factory handle detection
    return 'auto'
  }

  return provider
}

/**
 * Check if debug mode is enabled
 */
function isDebugMode() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.has('debug') || APP_CONFIG.settings.debug
}

/**
 * Log debug messages (only if debug mode is enabled)
 */
function debugLog(...args) {
  if (isDebugMode()) {
    // eslint-disable-next-line no-console
    console.log('[Let\'s Help It]', ...args)
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { APP_CONFIG, getActiveProvider, isDebugMode, debugLog }
}
