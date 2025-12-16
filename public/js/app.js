/**
 * App - Main Application Logic
 *
 * Coordinates between data providers, UI, and user interactions
 */

class App {
  constructor() {
    this.dataProvider = null
    this.organizations = []
    this.organizationsMap = {}
    this.categories = []
    this.categoriesMap = {}
    this.donationTypes = []
    this.donationTypesMap = {}
    this.locations = null

    // Filter state
    this.filters = {
      search: '',
      categories: [],
      donationTypes: [],
      country: '',
      state: '',
      city: ''
    }

    // Debounce timer for search
    this.searchTimeout = null
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      debugLog('App: Initializing...')
      UI.showLoading()

      // Create and initialize data provider
      this.dataProvider = await this.createDataProvider()

      // Load initial data
      await this.loadData()

      // Setup UI
      this.setupUI()

      // Setup event listeners
      this.setupEventListeners()

      // Setup deep linking
      this.setupDeepLinking()

      // Initial render
      await this.applyFilters()

      // Handle deep link if present
      this.handleDeepLink()

      UI.hideLoading()
      debugLog('App: Initialized successfully')

    } catch (error) {
      console.error('App: Initialization failed', error)
      UI.showError()
    }
  }

  /**
   * Create data provider based on configuration
   */
  async createDataProvider() {
    const providerType = getActiveProvider()
    debugLog(`App: Creating ${providerType} data provider...`)

    // Auto-detect
    if (providerType === 'auto') {
      // Try SQLite first (only if on localhost)
      const isLocalhost = window.location.hostname === 'localhost' ||
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname === ''

      if (isLocalhost && typeof SQLiteProvider !== 'undefined') {
        try {
          const provider = new SQLiteProvider()
          await provider.init()
          return provider
        } catch (error) {
          debugLog('App: SQLite provider failed, falling back to JSON', error)
        }
      }

      // Fallback to JSON
      const jsonProvider = new JSONProvider()
      await jsonProvider.init()
      return jsonProvider
    }

    // Force JSON
    if (providerType === 'json') {
      const provider = new JSONProvider()
      await provider.init()
      return provider
    }

    // Force SQLite
    if (providerType === 'sqlite') {
      if (typeof SQLiteProvider === 'undefined') {
        throw new Error('SQLiteProvider not available')
      }
      const provider = new SQLiteProvider()
      await provider.init()
      return provider
    }

    throw new Error(`Unknown provider type: ${providerType}`)
  }

  /**
   * Load data from provider
   */
  async loadData() {
    debugLog('App: Loading data...')

    // Load all data in parallel
    const [categories, donationTypes, locations] = await Promise.all([
      this.dataProvider.getCategories(),
      this.dataProvider.getDonationTypes(),
      this.dataProvider.getLocations()
    ])

    this.categories = categories
    this.donationTypes = donationTypes
    this.locations = locations

    // Create lookup maps
    this.categoriesMap = {}
    categories.forEach(cat => {
      this.categoriesMap[cat.id] = cat
    })

    this.donationTypesMap = {}
    donationTypes.forEach(type => {
      this.donationTypesMap[type.id] = type
    })

    debugLog(`App: Loaded ${categories.length} categories, ${donationTypes.length} donation types`)
  }

  /**
   * Setup UI components
   */
  setupUI() {
    // Breadcrumb is now only in the modal

    // Render modal filters (they will be populated when modal opens)
    UI.renderModalCategoryFilters(this.categories, this.filters.categories)
    UI.renderModalDonationTypeFilters(this.donationTypes, this.filters.donationTypes)
    UI.renderModalBreadcrumb(this.locations, {
      country: this.filters.country,
      state: this.filters.state,
      city: this.filters.city
    })

    // Update active filters tags and count
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Update i18n DOM elements
    i18n.updateDOM()
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input')
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value)
      })
    }

    // Language change
    i18n.onLanguageChange(() => {
      this.handleLanguageChange()
    })
  }

  /**
   * Handle search input (with debounce)
   */
  handleSearch(query) {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(async () => {
      this.filters.search = query.trim()
      await this.applyFilters()
    }, 300) // 300ms debounce
  }

  /**
   * Toggle category filter
   */
  toggleCategoryFilter(categoryId) {
    const index = this.filters.categories.indexOf(categoryId)
    if (index > -1) {
      this.filters.categories.splice(index, 1)
    } else {
      this.filters.categories.push(categoryId)
    }

    // Re-render modal filters
    UI.renderModalCategoryFilters(this.categories, this.filters.categories)

    // Update tags and count
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply filters
    this.applyFilters()
  }

  /**
   * Toggle donation type filter
   */
  toggleDonationTypeFilter(typeId) {
    const index = this.filters.donationTypes.indexOf(typeId)
    if (index > -1) {
      this.filters.donationTypes.splice(index, 1)
    } else {
      this.filters.donationTypes.push(typeId)
    }

    // Re-render modal filters
    UI.renderModalDonationTypeFilters(this.donationTypes, this.filters.donationTypes)

    // Update tags and count
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply filters
    this.applyFilters()
  }

  /**
   * Select country in breadcrumb
   */
  selectCountry(countryCode) {
    this.filters.country = countryCode
    this.filters.state = ''
    this.filters.city = ''

    // Re-render modal breadcrumb
    UI.renderModalBreadcrumb(this.locations, this.filters)

    // Update tags and count
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply filters
    this.applyFilters()
  }

  /**
   * Select state in breadcrumb
   */
  selectState(stateCode) {
    this.filters.state = stateCode
    this.filters.city = ''

    // Re-render modal breadcrumb
    UI.renderModalBreadcrumb(this.locations, this.filters)

    // Update tags and count
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply filters
    this.applyFilters()
  }

  /**
   * Select city in breadcrumb
   */
  selectCity(cityName) {
    this.filters.city = cityName

    // Re-render modal breadcrumb
    UI.renderModalBreadcrumb(this.locations, this.filters)

    // Update tags and count
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply filters
    this.applyFilters()
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.filters = {
      search: '',
      categories: [],
      donationTypes: [],
      country: '',
      state: '',
      city: ''
    }

    // Clear search input
    const searchInput = document.getElementById('search-input')
    if (searchInput) {
      searchInput.value = ''
    }

    // Re-render UI
    this.setupUI()

    // Update modal and tags
    this.populateModalFilters()
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply (empty) filters
    this.applyFilters()
  }

  /**
   * Populate modal with current filters state
   */
  populateModalFilters() {
    // Render filters in modal
    UI.renderModalCategoryFilters(this.categories, this.filters.categories)
    UI.renderModalDonationTypeFilters(this.donationTypes, this.filters.donationTypes)
    UI.renderModalBreadcrumb(this.locations, {
      country: this.filters.country,
      state: this.filters.state,
      city: this.filters.city
    })
  }

  /**
   * Update active filters tags display
   */
  updateActiveFiltersTags() {
    const container = document.getElementById('active-filters-container')
    const tagsContainer = document.getElementById('active-filters-tags')

    if (!container || !tagsContainer) {
      return
    }

    const tags = []

    // Add category tags
    this.filters.categories.forEach(catId => {
      const category = this.categoriesMap[catId]
      if (category) {
        tags.push({
          id: `category-${catId}`,
          label: i18n.tWithFallback(category.name),
          type: 'category',
          value: catId
        })
      }
    })

    // Add donation type tags
    this.filters.donationTypes.forEach(typeId => {
      const type = this.donationTypesMap[typeId]
      if (type) {
        tags.push({
          id: `donation-${typeId}`,
          label: i18n.tWithFallback(type.name),
          type: 'donationType',
          value: typeId
        })
      }
    })

    // Add location tag
    if (this.filters.city) {
      tags.push({
        id: 'location-city',
        label: this.filters.city,
        type: 'location',
        value: 'city'
      })
    } else if (this.filters.state) {
      tags.push({
        id: 'location-state',
        label: this.filters.state,
        type: 'location',
        value: 'state'
      })
    } else if (this.filters.country) {
      tags.push({
        id: 'location-country',
        label: this.filters.country,
        type: 'location',
        value: 'country'
      })
    }

    // Render tags
    if (tags.length > 0) {
      tagsContainer.innerHTML = tags.map(tag => `
        <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          ${tag.label}
          <button
            onclick="window.app.removeFilter('${tag.type}', '${tag.value}')"
            class="hover:text-blue-900 transition"
            aria-label="Remove filter">
            ×
          </button>
        </span>
      `).join('')
      container.classList.remove('hidden')
    } else {
      container.classList.add('hidden')
    }
  }

  /**
   * Update filters count badge
   */
  updateFiltersCount() {
    const count = this.filters.categories.length +
                  this.filters.donationTypes.length +
                  (this.filters.city || this.filters.state || this.filters.country ? 1 : 0)

    const badges = [
      document.getElementById('filters-count'),
      document.getElementById('filters-count-mobile')
    ]

    badges.forEach(badge => {
      if (!badge) {
        return
      }

      if (count > 0) {
        badge.textContent = count
        badge.classList.remove('hidden')
      } else {
        badge.classList.add('hidden')
      }
    })
  }

  /**
   * Remove a specific filter
   */
  removeFilter(type, value) {
    if (type === 'category') {
      const index = this.filters.categories.indexOf(value)
      if (index > -1) {
        this.filters.categories.splice(index, 1)
      }
    } else if (type === 'donationType') {
      const index = this.filters.donationTypes.indexOf(value)
      if (index > -1) {
        this.filters.donationTypes.splice(index, 1)
      }
    } else if (type === 'location') {
      if (value === 'city') {
        this.filters.city = ''
      } else if (value === 'state') {
        this.filters.state = ''
        this.filters.city = ''
      } else if (value === 'country') {
        this.filters.country = ''
        this.filters.state = ''
        this.filters.city = ''
      }
    }

    // Re-render UI
    this.setupUI()
    this.populateModalFilters()
    this.updateActiveFiltersTags()
    this.updateFiltersCount()

    // Apply filters
    this.applyFilters()
  }

  /**
   * Apply current filters and update UI
   */
  async applyFilters() {
    try {
      debugLog('App: Applying filters', this.filters)

      let results = []

      // Search takes precedence
      if (this.filters.search) {
        results = await this.dataProvider.searchOrganizations(
          this.filters.search,
          i18n.getLang()
        )
      } else {
        // Use filters
        results = await this.dataProvider.getOrganizations({
          categories: this.filters.categories.length > 0 ? this.filters.categories : undefined,
          donationTypes: this.filters.donationTypes.length > 0 ? this.filters.donationTypes : undefined,
          country: this.filters.country || undefined,
          state: this.filters.state || undefined,
          city: this.filters.city || undefined,
          status: 'active'
        })
      }

      // Additional client-side filtering if search + filters
      if (this.filters.search && (
        this.filters.categories.length > 0 ||
        this.filters.donationTypes.length > 0 ||
        this.filters.city
      )) {
        results = this.applyClientSideFilters(results)
      }

      this.organizations = results

      // Build organizations map for quick lookup (used by share feature)
      this.organizationsMap = {}
      results.forEach(org => {
        this.organizationsMap[org.id] = org
      })

      // Update UI
      UI.renderOrganizations(results)

      debugLog(`App: Showing ${results.length} organizations`)

    } catch (error) {
      console.error('App: Error applying filters', error)
      UI.showError()
    }
  }

  /**
   * Apply additional client-side filters
   * (Used when combining search with filters)
   */
  applyClientSideFilters(organizations) {
    let filtered = [...organizations]

    // Category filter
    if (this.filters.categories.length > 0) {
      filtered = filtered.filter(org =>
        this.filters.categories.some(cat => org.categories.includes(cat))
      )
    }

    // Donation type filter
    if (this.filters.donationTypes.length > 0) {
      filtered = filtered.filter(org =>
        org.donations.methods.some(method =>
          this.filters.donationTypes.includes(method.type)
        )
      )
    }

    // City filter
    if (this.filters.city) {
      filtered = filtered.filter(org => org.location.city === this.filters.city)
    }

    return filtered
  }

  /**
   * Handle language change
   */
  handleLanguageChange() {
    debugLog('App: Language changed to', i18n.getLang())

    // Update DOM
    i18n.updateDOM()

    // Re-render modal filters
    UI.renderModalCategoryFilters(this.categories, this.filters.categories)
    UI.renderModalDonationTypeFilters(this.donationTypes, this.filters.donationTypes)
    UI.renderModalBreadcrumb(this.locations, this.filters)

    // Update active filter tags (to show translated names)
    this.updateActiveFiltersTags()

    // Re-render organizations
    UI.renderOrganizations(this.organizations)
  }

  /**
   * Setup deep linking handler
   */
  setupDeepLinking() {
    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', () => {
      this.handleDeepLink()
    })
  }

  /**
   * Handle deep link from URL hash
   * Format: #org-{orgId}
   */
  handleDeepLink() {
    const hash = window.location.hash

    if (!hash || hash.length <= 1) {
      return
    }

    // Check if it's an organization deep link
    const orgMatch = hash.match(/^#org-(.+)$/)
    if (orgMatch) {
      const orgId = orgMatch[1]
      debugLog(`App: Deep link detected for organization: ${orgId}`)

      // Open the organization modal
      this.openOrgModal(orgId)
    }
  }

  /**
   * Open organization detail modal
   */
  async openOrgModal(orgId) {
    try {
      const org = await this.dataProvider.getOrganizationById(orgId)
      if (org) {
        UI.openOrgModal(org)
      } else {
        console.error('Organization not found:', orgId)
      }
    } catch (error) {
      console.error('Error loading organization', error)
    }
  }
}

// Create global app instance
window.app = new App()

/**
 * Initialize app
 * Called from index.html when DOM is ready
 */
async function initApp() {
  await window.app.init()
}

// Export global functions for HTML event handlers
window.toggleCategoryFilter = (categoryId) => window.app.toggleCategoryFilter(categoryId)
window.toggleDonationTypeFilter = (typeId) => window.app.toggleDonationTypeFilter(typeId)
window.selectCountry = (countryCode) => window.app.selectCountry(countryCode)
window.selectState = (stateCode) => window.app.selectState(stateCode)
window.selectCity = (cityName) => window.app.selectCity(cityName)
window.openOrgModal = (orgId) => window.app.openOrgModal(orgId)

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, initApp }
}
