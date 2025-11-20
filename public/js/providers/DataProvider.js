/**
 * DataProvider - Base Interface for Data Providers
 *
 * This abstract class defines the interface that all data providers must implement.
 * It allows the application to be agnostic about where data comes from (JSON, SQLite, API, etc.)
 *
 * Pattern: Strategy/Adapter
 */

class DataProvider {
  constructor() {
    if (new.target === DataProvider) {
      throw new TypeError('Cannot construct DataProvider instances directly. Use a concrete implementation.')
    }
  }

  /**
   * Initialize the provider
   * Load necessary resources, establish connections, etc.
   * @returns {Promise<void>}
   */
  async init() {
    throw new Error('Method init() must be implemented by subclass')
  }

  /**
   * Get all organizations with optional filters
   * @param {Object} filters - Filter criteria
   * @param {Array<string>} filters.categories - Category IDs to filter by
   * @param {Array<string>} filters.donationTypes - Donation type IDs to filter by
   * @param {string} filters.country - Country code (e.g., 'BR')
   * @param {string} filters.state - State code (e.g., 'RS')
   * @param {string} filters.city - City name (e.g., 'Porto Alegre')
   * @param {string} filters.status - Organization status (e.g., 'active')
   * @returns {Promise<Array<Object>>} Array of organization objects
   */
  async getOrganizations(_filters = {}) {
    throw new Error('Method getOrganizations() must be implemented by subclass')
  }

  /**
   * Get a single organization by ID
   * @param {string} id - Organization ID
   * @returns {Promise<Object|null>} Organization object or null if not found
   */
  async getOrganizationById(_id) {
    throw new Error('Method getOrganizationById() must be implemented by subclass')
  }

  /**
   * Search organizations by text query
   * Searches in name, description, tags, etc.
   * @param {string} query - Search query
   * @param {string} lang - Language for searching description ('pt' or 'en')
   * @returns {Promise<Array<Object>>} Array of matching organizations
   */
  async searchOrganizations(_query, _lang = 'pt') {
    throw new Error('Method searchOrganizations() must be implemented by subclass')
  }

  /**
   * Get all available categories
   * @returns {Promise<Array<Object>>} Array of category objects
   */
  async getCategories() {
    throw new Error('Method getCategories() must be implemented by subclass')
  }

  /**
   * Get all available donation types
   * @returns {Promise<Array<Object>>} Array of donation type objects
   */
  async getDonationTypes() {
    throw new Error('Method getDonationTypes() must be implemented by subclass')
  }

  /**
   * Get location hierarchy
   * @returns {Promise<Object>} Location data with countries, states, cities
   */
  async getLocations() {
    throw new Error('Method getLocations() must be implemented by subclass')
  }

  /**
   * Get statistics about the data
   * @returns {Promise<Object>} Statistics (total orgs, by category, by state, etc.)
   */
  async getStatistics() {
    throw new Error('Method getStatistics() must be implemented by subclass')
  }

  /**
   * Check if provider is ready
   * @returns {boolean}
   */
  isReady() {
    return this._ready === true
  }

  /**
   * Get provider name (for debugging/logging)
   * @returns {string}
   */
  getName() {
    return this.constructor.name
  }

  /**
   * Clean up resources (close connections, free memory, etc.)
   * @returns {Promise<void>}
   */
  async dispose() {
    this._ready = false
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataProvider
}
