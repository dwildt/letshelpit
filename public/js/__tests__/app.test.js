/**
 * App Class Tests
 *
 * Comprehensive test suite for main application logic
 */

const { mockOrganizations } = require('./fixtures/mockOrganizations')
const { mockCategories } = require('./fixtures/mockCategories')
const { mockDonationTypes } = require('./fixtures/mockDonationTypes')
const { mockLocations } = require('./fixtures/mockLocations')

// Mock APP_CONFIG
global.APP_CONFIG = {
  defaultLanguage: 'pt',
  enableDebug: false,
  dataSources: {
    json: {
      organizations: 'data/organizations/br-rs.json',
      categories: 'data/config/categories.json',
      donationTypes: 'data/config/donation-types.json',
      locations: 'data/locations.json'
    }
  }
}

// Mock functions
global.debugLog = jest.fn()
global.getActiveProvider = jest.fn(() => 'json')
global.isDebugMode = jest.fn(() => false)

// Mock i18n
global.i18n = {
  getLang: jest.fn(() => 'pt'),
  setLang: jest.fn(),
  toggleLang: jest.fn(),
  t: jest.fn((key) => key),
  tWithFallback: jest.fn((obj) => obj?.pt || obj),
  updateDOM: jest.fn(),
  onLanguageChange: jest.fn((callback) => {
    global.i18n._listeners = global.i18n._listeners || []
    global.i18n._listeners.push(callback)
  }),
  offLanguageChange: jest.fn()
}

// Mock UI
global.UI = {
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  showError: jest.fn(),
  renderOrganizations: jest.fn(),
  renderModalCategoryFilters: jest.fn(),
  renderModalDonationTypeFilters: jest.fn(),
  renderModalBreadcrumb: jest.fn(),
  openOrgModal: jest.fn()
}

// Mock JSONProvider
jest.mock('../providers/JSONProvider', () => {
  return jest.fn().mockImplementation(() => ({
    init: jest.fn().mockResolvedValue(undefined),
    isReady: jest.fn(() => true),
    getOrganizations: jest.fn().mockResolvedValue(mockOrganizations.filter(o => o.status === 'active')),
    getOrganizationById: jest.fn((id) => {
      const org = mockOrganizations.find(o => o.id === id)
      return Promise.resolve(org || null)
    }),
    searchOrganizations: jest.fn((query) => {
      const results = mockOrganizations.filter(o =>
        o.name.toLowerCase().includes(query.toLowerCase()) && o.status === 'active'
      )
      return Promise.resolve(results)
    }),
    getCategories: jest.fn().mockResolvedValue(mockCategories),
    getDonationTypes: jest.fn().mockResolvedValue(mockDonationTypes),
    getLocations: jest.fn().mockResolvedValue(mockLocations)
  }))
})

// Mock DOM elements
const createMockElement = (id) => ({
  id,
  classList: {
    add: jest.fn(),
    remove: jest.fn(),
    toggle: jest.fn(),
    contains: jest.fn(() => false)
  },
  innerHTML: '',
  textContent: '',
  value: '',
  style: {},
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(() => []),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  focus: jest.fn()
})

document.getElementById = jest.fn((id) => {
  if (id === 'search-input') {
    return createMockElement(id)
  }
  if (id === 'filters-count') {
    return createMockElement(id)
  }
  if (id === 'filters-count-mobile') {
    return createMockElement(id)
  }
  if (id === 'active-filters-container') {
    return createMockElement(id)
  }
  if (id === 'active-filters-tags') {
    return createMockElement(id)
  }
  return createMockElement(id)
})

document.querySelectorAll = jest.fn(() => [])

// Mock window
global.window = {
  location: {
    hash: '',
    hostname: 'localhost'
  },
  addEventListener: jest.fn()
}

// Import modules after mocks are set up
const DataProvider = require('../providers/DataProvider')
global.DataProvider = DataProvider
const JSONProvider = require('../providers/JSONProvider')
global.JSONProvider = JSONProvider
const { App } = require('../app')

describe('App', () => {
  let app

  // Use real timers by default
  beforeEach(() => {
    jest.clearAllMocks()
    app = new App()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  // ========================================
  // 1. INITIALIZATION TESTS (7 tests)
  // ========================================
  describe('Initialization', () => {
    test('should initialize with JSON provider (auto mode, localhost)', async () => {
      global.window.location.hostname = 'localhost'
      global.getActiveProvider = jest.fn(() => 'auto')

      await app.init()

      expect(JSONProvider).toHaveBeenCalled()
      expect(app.dataProvider).toBeDefined()
      expect(UI.hideLoading).toHaveBeenCalled()
    })

    test('should initialize with JSON provider (forced)', async () => {
      global.getActiveProvider = jest.fn(() => 'json')

      await app.init()

      expect(JSONProvider).toHaveBeenCalled()
      expect(app.dataProvider).toBeDefined()
    })

    test('should handle initialization errors', async () => {
      // Create a new app with failing provider
      const failingApp = new App()

      // Mock JSONProvider to fail
      const originalJSONProvider = global.JSONProvider
      global.JSONProvider = jest.fn().mockImplementation(() => ({
        init: jest.fn().mockRejectedValue(new Error('Init failed'))
      }))

      await failingApp.init()

      // Should show error UI
      expect(UI.showError).toHaveBeenCalled()

      // Restore original
      global.JSONProvider = originalJSONProvider
    })

    test('should load all data in parallel', async () => {
      await app.init()

      expect(app.categories).toEqual(mockCategories)
      expect(app.donationTypes).toEqual(mockDonationTypes)
      expect(app.locations).toEqual(mockLocations)
    })

    test('should setup UI components', async () => {
      await app.init()

      expect(UI.renderModalCategoryFilters).toHaveBeenCalled()
      expect(UI.renderModalDonationTypeFilters).toHaveBeenCalled()
      expect(UI.renderModalBreadcrumb).toHaveBeenCalled()
    })

    test('should setup event listeners', async () => {
      const searchInput = createMockElement('search-input')
      document.getElementById.mockReturnValue(searchInput)

      await app.init()

      expect(searchInput.addEventListener).toHaveBeenCalledWith('input', expect.any(Function))
    })

    test('should setup deep linking', async () => {
      await app.init()

      expect(window.addEventListener).toHaveBeenCalledWith('hashchange', expect.any(Function))
    })
  })

  // ========================================
  // 2. FILTER MANAGEMENT TESTS (10 tests)
  // ========================================
  describe('Filter Management', () => {
    beforeEach(async () => {
      await app.init()
      jest.clearAllMocks()
    })

    test('should toggle category filter (add)', () => {
      expect(app.filters.categories).toEqual([])

      app.toggleCategoryFilter('children_youth')

      expect(app.filters.categories).toContain('children_youth')
    })

    test('should toggle category filter (remove)', () => {
      app.filters.categories = ['children_youth']

      app.toggleCategoryFilter('children_youth')

      expect(app.filters.categories).not.toContain('children_youth')
    })

    test('should toggle donation type filter (add)', () => {
      expect(app.filters.donationTypes).toEqual([])

      app.toggleDonationTypeFilter('money')

      expect(app.filters.donationTypes).toContain('money')
    })

    test('should toggle donation type filter (remove)', () => {
      app.filters.donationTypes = ['money']

      app.toggleDonationTypeFilter('money')

      expect(app.filters.donationTypes).not.toContain('money')
    })

    test('should select country (clears state/city)', () => {
      app.filters.state = 'RS'
      app.filters.city = 'Porto Alegre'

      app.selectCountry('BR')

      expect(app.filters.country).toBe('BR')
      expect(app.filters.state).toBe('')
      expect(app.filters.city).toBe('')
    })

    test('should select state (clears city)', () => {
      app.filters.city = 'Porto Alegre'

      app.selectState('RS')

      expect(app.filters.state).toBe('RS')
      expect(app.filters.city).toBe('')
    })

    test('should select city', () => {
      app.selectCity('Porto Alegre')

      expect(app.filters.city).toBe('Porto Alegre')
    })

    test('should clear all filters', () => {
      app.filters = {
        search: 'test',
        categories: ['children_youth'],
        donationTypes: ['money'],
        country: 'BR',
        state: 'RS',
        city: 'Porto Alegre'
      }

      const searchInput = createMockElement('search-input')
      document.getElementById.mockReturnValue(searchInput)

      app.clearFilters()

      expect(app.filters.search).toBe('')
      expect(app.filters.categories).toEqual([])
      expect(app.filters.donationTypes).toEqual([])
      expect(app.filters.country).toBe('')
      expect(app.filters.state).toBe('')
      expect(app.filters.city).toBe('')
    })

    test('should remove specific filter (category)', () => {
      app.filters.categories = ['children_youth', 'education']

      app.removeFilter('category', 'children_youth')

      expect(app.filters.categories).not.toContain('children_youth')
      expect(app.filters.categories).toContain('education')
    })

    test('should populate modal filters', () => {
      app.filters = {
        search: '',
        categories: ['children_youth'],
        donationTypes: ['money'],
        country: 'BR',
        state: 'RS',
        city: 'Porto Alegre'
      }

      app.populateModalFilters()

      expect(UI.renderModalCategoryFilters).toHaveBeenCalledWith(
        mockCategories,
        ['children_youth']
      )
      expect(UI.renderModalDonationTypeFilters).toHaveBeenCalledWith(
        mockDonationTypes,
        ['money']
      )
    })
  })

  // ========================================
  // 3. SEARCH & FILTERING TESTS (8 tests)
  // ========================================
  describe('Search & Filtering', () => {
    beforeEach(async () => {
      jest.useFakeTimers()
      await app.init()
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('should debounce search input (300ms delay)', () => {
      app.handleSearch('test query')

      // Should not call immediately
      expect(app.dataProvider.searchOrganizations).not.toHaveBeenCalled()

      // Fast-forward time by 300ms
      jest.advanceTimersByTime(300)

      expect(app.filters.search).toBe('test query')
    })

    test('should apply search query (calls provider.searchOrganizations)', async () => {
      jest.useRealTimers()

      app.filters.search = 'test'
      await app.applyFilters()

      expect(app.dataProvider.searchOrganizations).toHaveBeenCalledWith('test', 'pt')
    })

    test('should apply category filters (calls provider.getOrganizations)', async () => {
      jest.useRealTimers()

      app.filters.categories = ['children_youth']
      await app.applyFilters()

      expect(app.dataProvider.getOrganizations).toHaveBeenCalledWith(
        expect.objectContaining({
          categories: ['children_youth']
        })
      )
    })

    test('should apply donation type filters', async () => {
      jest.useRealTimers()

      app.filters.donationTypes = ['money']
      await app.applyFilters()

      expect(app.dataProvider.getOrganizations).toHaveBeenCalledWith(
        expect.objectContaining({
          donationTypes: ['money']
        })
      )
    })

    test('should apply location filters', async () => {
      jest.useRealTimers()

      app.filters.city = 'Porto Alegre'
      await app.applyFilters()

      expect(app.dataProvider.getOrganizations).toHaveBeenCalledWith(
        expect.objectContaining({
          city: 'Porto Alegre'
        })
      )
    })

    test('should combine search with filters (client-side)', async () => {
      jest.useRealTimers()

      app.filters.search = 'test'
      app.filters.categories = ['children_youth']
      await app.applyFilters()

      expect(app.dataProvider.searchOrganizations).toHaveBeenCalled()
    })

    test('should client-side filter: categories', () => {
      const orgs = [mockOrganizations[0], mockOrganizations[1]]
      app.filters.categories = ['children_youth']

      const filtered = app.applyClientSideFilters(orgs)

      filtered.forEach(org => {
        expect(org.categories).toContain('children_youth')
      })
    })

    test('should client-side filter: donation types + city', () => {
      const orgs = mockOrganizations.filter(o => o.status === 'active')
      app.filters.donationTypes = ['money']
      app.filters.city = 'Porto Alegre'

      const filtered = app.applyClientSideFilters(orgs)

      filtered.forEach(org => {
        expect(org.location.city).toBe('Porto Alegre')
        expect(org.donations.methods.some(m => m.type === 'money')).toBe(true)
      })
    })
  })

  // ========================================
  // 4. LANGUAGE CHANGE TESTS (3 tests)
  // ========================================
  describe('Language Change', () => {
    beforeEach(async () => {
      await app.init()
      jest.clearAllMocks()
    })

    test('should re-render UI on language change', () => {
      app.handleLanguageChange()

      expect(i18n.updateDOM).toHaveBeenCalled()
      expect(UI.renderOrganizations).toHaveBeenCalled()
    })

    test('should update filter tags with translations', () => {
      app.filters.categories = ['children_youth']

      app.handleLanguageChange()

      expect(i18n.tWithFallback).toHaveBeenCalled()
    })

    test('should re-render modal filters', () => {
      app.handleLanguageChange()

      expect(UI.renderModalCategoryFilters).toHaveBeenCalled()
      expect(UI.renderModalDonationTypeFilters).toHaveBeenCalled()
      expect(UI.renderModalBreadcrumb).toHaveBeenCalled()
    })
  })

  // ========================================
  // 5. DEEP LINKING TESTS (4 tests)
  // ========================================
  describe('Deep Linking', () => {
    beforeEach(async () => {
      await app.init()
      jest.clearAllMocks()
    })

    test('should parse org ID from hash (#org-123)', async () => {
      global.window.location.hash = '#org-test-org-1'

      await app.handleDeepLink()

      expect(app.dataProvider.getOrganizationById).toHaveBeenCalledWith('test-org-1')
    })

    test('should open modal for deep-linked org', async () => {
      global.window.location.hash = '#org-test-org-1'

      await app.handleDeepLink()

      expect(UI.openOrgModal).toHaveBeenCalled()
    })

    test('should handle hashchange events', async () => {
      await app.init()

      expect(window.addEventListener).toHaveBeenCalledWith('hashchange', expect.any(Function))
    })

    test('should handle non-existent org ID', async () => {
      global.window.location.hash = '#org-non-existent'

      // Should not throw error
      await app.handleDeepLink()

      expect(UI.openOrgModal).not.toHaveBeenCalled()
    })
  })

  // ========================================
  // 6. UI INTEGRATION TESTS (3 tests)
  // ========================================
  describe('UI Integration', () => {
    beforeEach(async () => {
      await app.init()
      jest.clearAllMocks()
    })

    test('should render organizations after filtering', async () => {
      await app.applyFilters()

      expect(UI.renderOrganizations).toHaveBeenCalled()
    })

    test('should show loading state during init', async () => {
      const newApp = new App()
      const initPromise = newApp.init()

      expect(UI.showLoading).toHaveBeenCalled()

      await initPromise
    })

    test('should show error state on failure', async () => {
      // Mock the provider's getOrganizations to reject
      app.dataProvider.getOrganizations = jest.fn().mockRejectedValue(new Error('API Error'))

      await app.applyFilters()

      expect(UI.showError).toHaveBeenCalled()
    })
  })
})
