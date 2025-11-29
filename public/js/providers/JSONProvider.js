/**
 * JSONProvider - Loads organization data from JSON files
 *
 * This provider reads data from static JSON files served by the web server.
 * It's the default provider for GitHub Pages and production environments.
 *
 * Advantages:
 * - Simple and reliable
 * - No dependencies
 * - Works on all static hosts (GitHub Pages, Netlify, etc.)
 * - Easy to edit data (just edit JSON files)
 *
 * Files loaded:
 * - /data/organizations/br-rs.json - Organization data
 * - /data/config/categories.json - Categories configuration
 * - /data/config/donation-types.json - Donation types configuration
 * - /data/locations.json - Location hierarchy
 */

class JSONProvider extends DataProvider {
  constructor() {
    super()
    this.data = {
      organizations: null,
      categories: null,
      donationTypes: null,
      locations: null
    }
    this._ready = false
  }

  /**
   * Initialize the provider by loading all JSON files
   */
  async init() {
    try {
      debugLog('JSONProvider: Initializing...')

      const sources = APP_CONFIG.dataSources.json

      // Load all JSON files in parallel
      const [orgsData, catsData, typesData, locsData] = await Promise.all([
        fetch(sources.organizations).then(r => r.json()),
        fetch(sources.categories).then(r => r.json()),
        fetch(sources.donationTypes).then(r => r.json()),
        fetch(sources.locations).then(r => r.json())
      ])

      this.data.organizations = orgsData
      this.data.categories = catsData
      this.data.donationTypes = typesData
      this.data.locations = locsData

      this._ready = true

      debugLog('JSONProvider: Initialized successfully')
      debugLog(`- Loaded ${orgsData.organizations.length} organizations`)
      debugLog(`- Loaded ${catsData.categories.length} categories`)
      debugLog(`- Loaded ${typesData.donation_types.length} donation types`)

    } catch (error) {
      console.error('JSONProvider: Failed to initialize', error)
      throw new Error(`JSONProvider initialization failed: ${error.message}`)
    }
  }

  /**
   * Get all organizations with optional filters
   */
  async getOrganizations(filters = {}) {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized. Call init() first.')
    }

    let orgs = [...this.data.organizations.organizations]

    // Filter by status
    if (filters.status) {
      orgs = orgs.filter(org => org.status === filters.status)
    } else {
      // Default: only show active organizations
      orgs = orgs.filter(org => org.status === 'active')
    }

    // Filter by categories (OR logic - match any category)
    if (filters.categories && filters.categories.length > 0) {
      orgs = orgs.filter(org =>
        filters.categories.some(cat => org.categories.includes(cat))
      )
    }

    // Filter by donation types (OR logic - match any type)
    if (filters.donationTypes && filters.donationTypes.length > 0) {
      orgs = orgs.filter(org =>
        org.donations.methods.some(method =>
          filters.donationTypes.includes(method.type)
        )
      )
    }

    // Filter by location
    if (filters.country) {
      orgs = orgs.filter(org => org.location.country === filters.country)
    }
    if (filters.state) {
      orgs = orgs.filter(org => org.location.state === filters.state)
    }
    if (filters.city) {
      orgs = orgs.filter(org => org.location.city === filters.city)
    }

    // Filter by verified status
    if (filters.verified !== undefined) {
      orgs = orgs.filter(org => org.verified === filters.verified)
    }

    debugLog(`JSONProvider: getOrganizations() returned ${orgs.length} results`, filters)

    return orgs
  }

  /**
   * Get a single organization by ID
   */
  async getOrganizationById(id) {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized')
    }

    const org = this.data.organizations.organizations.find(o => o.id === id)
    return org || null
  }

  /**
   * Search organizations by text query
   */
  async searchOrganizations(query, lang = 'pt') {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized')
    }

    if (!query || query.trim() === '') {
      return await this.getOrganizations()
    }

    const lowerQuery = query.toLowerCase().trim()
    const orgs = this.data.organizations.organizations

    const results = orgs.filter(org => {
      // Search in name
      if (org.name.toLowerCase().includes(lowerQuery)) {
        return true
      }

      // Search in description (specified language)
      const about = org.about[lang] || org.about.pt
      if (about && about.toLowerCase().includes(lowerQuery)) {
        return true
      }

      // Search in tags
      if (org.tags && org.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
        return true
      }

      // Search in city
      if (org.location.city && org.location.city.toLowerCase().includes(lowerQuery)) {
        return true
      }

      // Search in categories (match category names)
      const categoryMatches = org.categories.some(catId => {
        const category = this.data.categories.categories.find(c => c.id === catId)
        if (!category) {
          return false
        }

        const catName = category.name[lang] || category.name.pt
        return catName.toLowerCase().includes(lowerQuery)
      })
      if (categoryMatches) {
        return true
      }

      return false
    })

    // Filter out inactive organizations
    const activeResults = results.filter(org => org.status === 'active')

    debugLog(`JSONProvider: searchOrganizations("${query}") returned ${activeResults.length} results`)

    return activeResults
  }

  /**
   * Get all categories
   */
  async getCategories() {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized')
    }

    return this.data.categories.categories
  }

  /**
   * Get all donation types
   */
  async getDonationTypes() {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized')
    }

    return this.data.donationTypes.donation_types
  }

  /**
   * Get location hierarchy
   */
  async getLocations() {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized')
    }

    return this.data.locations
  }

  /**
   * Get statistics
   */
  async getStatistics() {
    if (!this.isReady()) {
      throw new Error('JSONProvider not initialized')
    }

    const orgs = this.data.organizations.organizations
    const activeOrgs = orgs.filter(o => o.status === 'active')

    // Count by category
    const byCategory = {}
    activeOrgs.forEach(org => {
      org.categories.forEach(cat => {
        byCategory[cat] = (byCategory[cat] || 0) + 1
      })
    })

    // Count by state
    const byState = {}
    activeOrgs.forEach(org => {
      const state = org.location.state
      byState[state] = (byState[state] || 0) + 1
    })

    // Count by city
    const byCity = {}
    activeOrgs.forEach(org => {
      const city = org.location.city || 'Unknown'
      byCity[city] = (byCity[city] || 0) + 1
    })

    // Count by donation methods
    const byDonationMethod = {}
    activeOrgs.forEach(org => {
      org.donations.methods.forEach(method => {
        byDonationMethod[method.type] = (byDonationMethod[method.type] || 0) + 1
      })
    })

    // Count by organization type
    const byType = {}
    activeOrgs.forEach(org => {
      byType[org.type] = (byType[org.type] || 0) + 1
    })

    // Count organizations accepting items
    const acceptsItems = activeOrgs.filter(org => org.donations.acceptsItems).length
    const acceptsVolunteers = activeOrgs.filter(org => org.donations.acceptsVolunteers).length

    // Get unique cities count
    const uniqueCities = new Set(activeOrgs.map(org => org.location.city).filter(Boolean))
    const uniqueStates = new Set(activeOrgs.map(org => org.location.state).filter(Boolean))

    // Find latest added organization
    const sortedByDate = [...activeOrgs].sort((a, b) =>
      new Date(b.dateAdded) - new Date(a.dateAdded)
    )
    const latestOrg = sortedByDate[0]

    // Growth over time (if we have date information)
    const orgsByMonth = {}
    activeOrgs.forEach(org => {
      if (org.dateAdded) {
        const month = org.dateAdded.substring(0, 7) // YYYY-MM
        orgsByMonth[month] = (orgsByMonth[month] || 0) + 1
      }
    })

    return {
      totalOrganizations: orgs.length,
      activeOrganizations: activeOrgs.length,
      byCategory,
      byState,
      byCity,
      byDonationMethod,
      byType,
      acceptsItems,
      acceptsVolunteers,
      uniqueCitiesCount: uniqueCities.size,
      uniqueStatesCount: uniqueStates.size,
      totalCategories: this.data.categories.categories.length,
      totalDonationTypes: this.data.donationTypes.donation_types.length,
      latestOrganization: latestOrg ? {
        name: latestOrg.name,
        dateAdded: latestOrg.dateAdded
      } : null,
      orgsByMonth
    }
  }

  /**
   * Clean up (no resources to clean for JSON provider)
   */
  async dispose() {
    this.data = {
      organizations: null,
      categories: null,
      donationTypes: null,
      locations: null
    }
    this._ready = false
    debugLog('JSONProvider: Disposed')
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JSONProvider
}
