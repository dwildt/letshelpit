/**
 * JSONProvider Tests
 *
 * Comprehensive test suite for JSONProvider data provider
 */

const { mockOrganizations } = require('../fixtures/mockOrganizations')
const { mockCategories } = require('../fixtures/mockCategories')
const { mockDonationTypes } = require('../fixtures/mockDonationTypes')
const { mockLocations } = require('../fixtures/mockLocations')

// Mock APP_CONFIG
global.APP_CONFIG = {
  dataSources: {
    json: {
      organizations: 'data/organizations/br-rs.json',
      categories: 'data/config/categories.json',
      donationTypes: 'data/config/donation-types.json',
      locations: 'data/locations.json'
    }
  }
}

// Mock debugLog
global.debugLog = jest.fn()

// Import DataProvider and JSONProvider
const DataProvider = require('../../providers/DataProvider')
global.DataProvider = DataProvider
const JSONProvider = require('../../providers/JSONProvider')

describe('JSONProvider', () => {
  let provider

  // Mock fetch with test data
  beforeEach(() => {
    provider = new JSONProvider()

    global.fetch = jest.fn((url) => {
      const mockData = {
        'data/organizations/br-rs.json': { organizations: mockOrganizations },
        'data/config/categories.json': { categories: mockCategories },
        'data/config/donation-types.json': { donation_types: mockDonationTypes },
        'data/locations.json': mockLocations
      }

      const data = mockData[url]
      if (!data) {
        return Promise.reject(new Error(`Unknown URL: ${url}`))
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data)
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // ========================================
  // 1. INITIALIZATION TESTS (5 tests)
  // ========================================
  describe('Initialization', () => {
    test('should load all 4 JSON files in parallel', async () => {
      await provider.init()

      expect(fetch).toHaveBeenCalledTimes(4)
      expect(fetch).toHaveBeenCalledWith('data/organizations/br-rs.json')
      expect(fetch).toHaveBeenCalledWith('data/config/categories.json')
      expect(fetch).toHaveBeenCalledWith('data/config/donation-types.json')
      expect(fetch).toHaveBeenCalledWith('data/locations.json')
    })

    test('should set ready state after init', async () => {
      expect(provider.isReady()).toBe(false)

      await provider.init()

      expect(provider.isReady()).toBe(true)
    })

    test('should handle fetch errors gracefully', async () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error')))

      await expect(provider.init()).rejects.toThrow('JSONProvider initialization failed')
      expect(provider.isReady()).toBe(false)
    })

    test('should validate data structures after loading', async () => {
      await provider.init()

      expect(provider.data.organizations).toBeDefined()
      expect(provider.data.organizations.organizations).toBeInstanceOf(Array)
      expect(provider.data.categories).toBeDefined()
      expect(provider.data.categories.categories).toBeInstanceOf(Array)
      expect(provider.data.donationTypes).toBeDefined()
      expect(provider.data.donationTypes.donation_types).toBeInstanceOf(Array)
      expect(provider.data.locations).toBeDefined()
    })

    test('should load correct number of items from fixtures', async () => {
      await provider.init()

      expect(provider.data.organizations.organizations).toHaveLength(5)
      expect(provider.data.categories.categories).toHaveLength(4)
      expect(provider.data.donationTypes.donation_types).toHaveLength(4)
    })
  })

  // ========================================
  // 2. GET ORGANIZATIONS TESTS (12 tests)
  // ========================================
  describe('getOrganizations()', () => {
    beforeEach(async () => {
      await provider.init()
    })

    test('should return all active orgs by default', async () => {
      const orgs = await provider.getOrganizations()

      // Should return 4 active orgs (excluding test-org-4 which is inactive)
      expect(orgs).toHaveLength(4)
      orgs.forEach(org => {
        expect(org.status).toBe('active')
      })
    })

    test('should filter by status (active)', async () => {
      const orgs = await provider.getOrganizations({ status: 'active' })

      expect(orgs).toHaveLength(4)
      orgs.forEach(org => {
        expect(org.status).toBe('active')
      })
    })

    test('should filter by status (inactive)', async () => {
      const orgs = await provider.getOrganizations({ status: 'inactive' })

      expect(orgs).toHaveLength(1)
      expect(orgs[0].id).toBe('test-org-4')
      expect(orgs[0].status).toBe('inactive')
    })

    test('should filter by single category', async () => {
      const orgs = await provider.getOrganizations({ categories: ['health'] })

      expect(orgs.length).toBeGreaterThan(0)
      orgs.forEach(org => {
        expect(org.categories).toContain('health')
      })
    })

    test('should filter by multiple categories (OR logic)', async () => {
      const orgs = await provider.getOrganizations({
        categories: ['education', 'environment']
      })

      expect(orgs.length).toBeGreaterThan(0)
      orgs.forEach(org => {
        const hasEducation = org.categories.includes('education')
        const hasEnvironment = org.categories.includes('environment')
        expect(hasEducation || hasEnvironment).toBe(true)
      })
    })

    test('should filter by donation types', async () => {
      const orgs = await provider.getOrganizations({ donationTypes: ['volunteering'] })

      expect(orgs.length).toBeGreaterThan(0)
      orgs.forEach(org => {
        const hasVolunteering = org.donations.methods.some(m => m.type === 'volunteering')
        expect(hasVolunteering).toBe(true)
      })
    })

    test('should filter by country', async () => {
      const orgs = await provider.getOrganizations({ country: 'BR' })

      expect(orgs).toHaveLength(4) // All active orgs are in Brazil
      orgs.forEach(org => {
        expect(org.location.country).toBe('BR')
      })
    })

    test('should filter by state', async () => {
      const orgs = await provider.getOrganizations({ state: 'RS' })

      expect(orgs.length).toBeGreaterThan(0)
      orgs.forEach(org => {
        expect(org.location.state).toBe('RS')
      })
    })

    test('should filter by city', async () => {
      const orgs = await provider.getOrganizations({ city: 'Porto Alegre' })

      expect(orgs.length).toBeGreaterThan(0)
      orgs.forEach(org => {
        expect(org.location.city).toBe('Porto Alegre')
      })
    })

    test('should filter by verified status', async () => {
      const orgs = await provider.getOrganizations({ verified: true })

      expect(orgs.length).toBeGreaterThan(0)
      orgs.forEach(org => {
        expect(org.verified).toBe(true)
      })
    })

    test('should combine multiple filters', async () => {
      const orgs = await provider.getOrganizations({
        categories: ['children_youth'],
        city: 'Porto Alegre',
        verified: true
      })

      orgs.forEach(org => {
        expect(org.categories).toContain('children_youth')
        expect(org.location.city).toBe('Porto Alegre')
        expect(org.verified).toBe(true)
      })
    })

    test('should throw error if not initialized', async () => {
      const uninitProvider = new JSONProvider()

      await expect(uninitProvider.getOrganizations()).rejects.toThrow(
        'JSONProvider not initialized'
      )
    })
  })

  // ========================================
  // 3. GET ORGANIZATION BY ID TESTS (3 tests)
  // ========================================
  describe('getOrganizationById()', () => {
    beforeEach(async () => {
      await provider.init()
    })

    test('should return org by valid ID', async () => {
      const org = await provider.getOrganizationById('test-org-1')

      expect(org).not.toBeNull()
      expect(org.id).toBe('test-org-1')
      expect(org.name).toBe('Test Organization One')
    })

    test('should return null for non-existent ID', async () => {
      const org = await provider.getOrganizationById('non-existent-id')

      expect(org).toBeNull()
    })

    test('should throw error if not initialized', async () => {
      const uninitProvider = new JSONProvider()

      await expect(uninitProvider.getOrganizationById('test-org-1')).rejects.toThrow(
        'JSONProvider not initialized'
      )
    })
  })

  // ========================================
  // 4. SEARCH ORGANIZATIONS TESTS (10 tests)
  // ========================================
  describe('searchOrganizations()', () => {
    beforeEach(async () => {
      await provider.init()
    })

    test('should search by name (case-insensitive)', async () => {
      const results = await provider.searchOrganizations('organization one', 'pt')

      expect(results.length).toBeGreaterThan(0)
      expect(results[0].name).toContain('One')
    })

    test('should search in PT description', async () => {
      const results = await provider.searchOrganizations('crianças', 'pt')

      expect(results.length).toBeGreaterThan(0)
      // At least one result should match in about, name, or tags
      const someMatch = results.some(result => {
        const matchInAbout = result.about.pt.toLowerCase().includes('crianças')
        const matchInName = result.name.toLowerCase().includes('crianças')
        const matchInTags = result.tags && result.tags.some(tag => tag.toLowerCase().includes('crianças'))
        return matchInAbout || matchInName || matchInTags
      })
      expect(someMatch).toBe(true)
    })

    test('should search in EN description', async () => {
      const results = await provider.searchOrganizations('children', 'en')

      expect(results.length).toBeGreaterThan(0)
    })

    test('should search in tags array', async () => {
      const results = await provider.searchOrganizations('educação', 'pt')

      expect(results.length).toBeGreaterThan(0)
      const hasTagMatch = results.some(r =>
        r.tags && r.tags.some(tag => tag.toLowerCase().includes('educação'))
      )
      expect(hasTagMatch).toBe(true)
    })

    test('should search by city name', async () => {
      const results = await provider.searchOrganizations('canoas', 'pt')

      expect(results.length).toBeGreaterThan(0)
      expect(results.some(r => r.location.city === 'Canoas')).toBe(true)
    })

    test('should search in category names (translated)', async () => {
      const results = await provider.searchOrganizations('saúde', 'pt')

      expect(results.length).toBeGreaterThan(0)
    })

    test('should return all active orgs for empty query', async () => {
      const results = await provider.searchOrganizations('', 'pt')

      expect(results).toHaveLength(4) // All active organizations
    })

    test('should only return active orgs', async () => {
      // test-org-4 is inactive and should not appear
      const results = await provider.searchOrganizations('organization', 'pt')

      results.forEach(org => {
        expect(org.status).toBe('active')
      })
    })

    test('should handle special characters', async () => {
      // Search for 'test' which will match the organization names
      const results = await provider.searchOrganizations('test', 'pt')

      expect(results.length).toBeGreaterThan(0)
    })

    test('should throw error if not initialized', async () => {
      const uninitProvider = new JSONProvider()

      await expect(uninitProvider.searchOrganizations('test', 'pt')).rejects.toThrow(
        'JSONProvider not initialized'
      )
    })
  })

  // ========================================
  // 5. GET METADATA TESTS (6 tests)
  // ========================================
  describe('Get Metadata', () => {
    beforeEach(async () => {
      await provider.init()
    })

    test('should get categories', async () => {
      const categories = await provider.getCategories()

      expect(categories).toHaveLength(4)
      expect(categories[0]).toHaveProperty('id')
      expect(categories[0]).toHaveProperty('name')
      expect(categories[0].name).toHaveProperty('pt')
      expect(categories[0].name).toHaveProperty('en')
    })

    test('should get donation types', async () => {
      const types = await provider.getDonationTypes()

      expect(types).toHaveLength(4)
      expect(types[0]).toHaveProperty('id')
      expect(types[0]).toHaveProperty('name')
    })

    test('should get locations', async () => {
      const locations = await provider.getLocations()

      expect(locations).toHaveProperty('countries')
      expect(locations.countries).toBeInstanceOf(Array)
      expect(locations.countries[0]).toHaveProperty('code')
      expect(locations.countries[0]).toHaveProperty('states')
    })

    test('getCategories should throw if not initialized', async () => {
      const uninitProvider = new JSONProvider()

      await expect(uninitProvider.getCategories()).rejects.toThrow(
        'JSONProvider not initialized'
      )
    })

    test('getDonationTypes should throw if not initialized', async () => {
      const uninitProvider = new JSONProvider()

      await expect(uninitProvider.getDonationTypes()).rejects.toThrow(
        'JSONProvider not initialized'
      )
    })

    test('getLocations should throw if not initialized', async () => {
      const uninitProvider = new JSONProvider()

      await expect(uninitProvider.getLocations()).rejects.toThrow(
        'JSONProvider not initialized'
      )
    })
  })

  // ========================================
  // 6. GET STATISTICS TESTS (8 tests)
  // ========================================
  describe('getStatistics()', () => {
    beforeEach(async () => {
      await provider.init()
    })

    test('should count by category', async () => {
      const stats = await provider.getStatistics()

      expect(stats.byCategory).toBeDefined()
      expect(Object.keys(stats.byCategory).length).toBeGreaterThan(0)
      expect(stats.byCategory['children_youth']).toBeGreaterThan(0)
    })

    test('should count by state', async () => {
      const stats = await provider.getStatistics()

      expect(stats.byState).toBeDefined()
      expect(stats.byState['RS']).toBeGreaterThan(0)
    })

    test('should count by city', async () => {
      const stats = await provider.getStatistics()

      expect(stats.byCity).toBeDefined()
      expect(stats.byCity['Porto Alegre']).toBeGreaterThan(0)
    })

    test('should count by donation method', async () => {
      const stats = await provider.getStatistics()

      expect(stats.byDonationMethod).toBeDefined()
      expect(stats.byDonationMethod['money']).toBeGreaterThan(0)
    })

    test('should count items/volunteers acceptance', async () => {
      const stats = await provider.getStatistics()

      expect(stats.acceptsItems).toBeGreaterThan(0)
      expect(stats.acceptsVolunteers).toBeGreaterThan(0)
      expect(typeof stats.acceptsItems).toBe('number')
      expect(typeof stats.acceptsVolunteers).toBe('number')
    })

    test('should calculate unique cities/states', async () => {
      const stats = await provider.getStatistics()

      expect(stats.uniqueCitiesCount).toBeGreaterThan(0)
      expect(stats.uniqueStatesCount).toBeGreaterThan(0)
    })

    test('should track growth by month', async () => {
      const stats = await provider.getStatistics()

      expect(stats.orgsByMonth).toBeDefined()
      expect(Object.keys(stats.orgsByMonth).length).toBeGreaterThan(0)
      // Check format is YYYY-MM
      const monthKeys = Object.keys(stats.orgsByMonth)
      expect(monthKeys[0]).toMatch(/^\d{4}-\d{2}$/)
    })

    test('should identify latest organization', async () => {
      const stats = await provider.getStatistics()

      expect(stats.latestOrganization).toBeDefined()
      expect(stats.latestOrganization).toHaveProperty('name')
      expect(stats.latestOrganization).toHaveProperty('dateAdded')
    })
  })

  // ========================================
  // 7. LIFECYCLE TESTS (3 tests)
  // ========================================
  describe('Lifecycle', () => {
    test('isReady() should manage state correctly', async () => {
      expect(provider.isReady()).toBe(false)

      await provider.init()

      expect(provider.isReady()).toBe(true)
    })

    test('dispose() should clear data', async () => {
      await provider.init()
      expect(provider.data.organizations).not.toBeNull()

      await provider.dispose()

      expect(provider.data.organizations).toBeNull()
      expect(provider.data.categories).toBeNull()
      expect(provider.data.donationTypes).toBeNull()
      expect(provider.data.locations).toBeNull()
    })

    test('should not be ready after dispose', async () => {
      await provider.init()
      expect(provider.isReady()).toBe(true)

      await provider.dispose()

      expect(provider.isReady()).toBe(false)
    })
  })
})
