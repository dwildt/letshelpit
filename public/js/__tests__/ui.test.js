/**
 * UI Module Tests
 *
 * Focused test suite for UI utility functions
 */

const { mockOrganizations } = require('./fixtures/mockOrganizations')
const { mockCategories } = require('./fixtures/mockCategories')
const { mockDonationTypes } = require('./fixtures/mockDonationTypes')

// Mock global objects
global.i18n = {
  t: jest.fn((key) => key),
  tWithFallback: jest.fn((obj) => {
    if (typeof obj === 'string') return obj
    return obj?.pt || obj?.en || ''
  }),
  getLang: jest.fn(() => 'pt')
}

global.window = {
  app: {
    categoriesMap: {
      'children_youth': mockCategories[0],
      'education': mockCategories[1],
      'health': mockCategories[2],
      'environment': mockCategories[3]
    },
    donationTypesMap: {
      'money': mockDonationTypes[0],
      'food': mockDonationTypes[1],
      'clothes': mockDonationTypes[2],
      'volunteering': mockDonationTypes[3]
    },
    organizationsMap: {
      'test-org-1': mockOrganizations[0]
    }
  },
  location: {
    origin: 'https://example.com',
    href: 'https://example.com'
  }
}

global.ShareService = {
  shareToWhatsApp: jest.fn(),
  shareToFacebook: jest.fn(),
  copyLink: jest.fn().mockResolvedValue(true)
}

// Create mock DOM elements
const createMockElement = (id) => {
  const element = {
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
  }
  return element
}

// Mock document
document.getElementById = jest.fn((id) => createMockElement(id))
document.querySelectorAll = jest.fn(() => [])
document.addEventListener = jest.fn()
document.removeEventListener = jest.fn()
document.createElement = jest.fn((tag) => {
  const element = {
    tagName: tag.toUpperCase(),
    innerHTML: '',
    textContent: '',
    style: {},
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn()
  }
  // Special handling for escapeHtml
  Object.defineProperty(element, 'textContent', {
    get() { return this._text || '' },
    set(value) {
      this._text = value
      // Simulate HTML escaping
      if (value) {
        this.innerHTML = value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
      }
    }
  })
  return element
})
document.body = {
  style: {},
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}

// Import UI after mocks
const UI = require('../ui')

describe('UI Module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ========================================
  // UTILITY FUNCTIONS TESTS
  // ========================================
  describe('Utility Functions', () => {
    test('should generate Google Maps URL', () => {
      const url = UI.generateGoogleMapsUrl(
        'Rua Teste, 123',
        'Porto Alegre',
        'RS',
        'Brazil'
      )

      expect(url).toContain('google.com/maps')
      expect(url).toContain('Rua+Teste')
      expect(url).toContain('Porto+Alegre')
    })

    test('should generate Waze URL', () => {
      const url = UI.generateWazeUrl(
        'Rua Teste, 123',
        'Porto Alegre',
        'RS'
      )

      expect(url).toContain('waze.com')
      expect(url).toContain('Rua%20Teste')
    })

    test('should escapeHtml to prevent XSS', () => {
      const dangerous = '<script>alert("XSS")</script>'
      const safe = UI.escapeHtml(dangerous)

      expect(safe).not.toContain('<script>')
      expect(safe).toContain('&lt;script&gt;')
    })

    test('should handle null/undefined inputs in escapeHtml', () => {
      expect(UI.escapeHtml(null)).toBe('')
      expect(UI.escapeHtml(undefined)).toBe('')
      expect(UI.escapeHtml('')).toBe('')
    })

    test('should handle special characters in escapeHtml', () => {
      const input = '< > & " \''
      const output = UI.escapeHtml(input)

      expect(output).toBe('&lt; &gt; &amp; &quot; &#039;')
    })

    test('should escape ampersands first in escapeHtml', () => {
      const input = '&lt;'
      const output = UI.escapeHtml(input)

      // Should become &amp;lt; not &lt;lt;
      expect(output).toBe('&amp;lt;')
    })
  })

  // ========================================
  // STATE DISPLAY TESTS
  // ========================================
  describe('State Display', () => {
    test('should show loading state', () => {
      const loading = createMockElement('loading')
      document.querySelectorAll = jest.fn(() => [loading])

      UI.showLoading()

      expect(loading.classList.remove).toHaveBeenCalledWith('hidden')
    })

    test('should hide loading state', () => {
      const loading = createMockElement('loading')
      document.querySelectorAll = jest.fn(() => [loading])

      UI.hideLoading()

      expect(loading.classList.add).toHaveBeenCalledWith('hidden')
    })

    test('should show error state', () => {
      const errorState = createMockElement('error-state')
      document.getElementById = jest.fn(() => errorState)

      UI.showError()

      expect(errorState.classList.remove).toHaveBeenCalledWith('hidden')
    })

    test('should handle missing DOM elements gracefully', () => {
      document.getElementById = jest.fn(() => null)

      // Should not throw
      expect(() => UI.showError()).not.toThrow()
    })
  })

  // ========================================
  // SHARE INTEGRATION TESTS
  // ========================================
  describe('Share Integration', () => {
    test('should call ShareService.shareToWhatsApp()', async () => {
      await UI.shareToWhatsApp('test-org-1')

      expect(ShareService.shareToWhatsApp).toHaveBeenCalled()
    })

    test('should call ShareService.shareToFacebook()', async () => {
      await UI.shareToFacebook('test-org-1')

      expect(ShareService.shareToFacebook).toHaveBeenCalled()
    })

    test('should pass organization to ShareService', async () => {
      await UI.shareToWhatsApp('test-org-1')

      expect(ShareService.shareToWhatsApp).toHaveBeenCalledWith(
        mockOrganizations[0],
        'pt'
      )
    })
  })

  // ========================================
  // ORGANIZATION RENDERING TESTS
  // ========================================
  describe('Organization Rendering', () => {
    test('should render organization grid', () => {
      const grid = createMockElement('organizations-grid')
      const emptyState = createMockElement('empty-state')
      const resultsCount = createMockElement('results-count')

      document.getElementById = jest.fn((id) => {
        if (id === 'organizations-grid') return grid
        if (id === 'empty-state') return emptyState
        if (id === 'results-count') return resultsCount
        return createMockElement(id)
      })

      const orgs = [mockOrganizations[0], mockOrganizations[1]]
      UI.renderOrganizations(orgs)

      expect(grid.innerHTML).toBeTruthy()
      expect(grid.classList.remove).toHaveBeenCalledWith('hidden')
    })

    test('should show empty state when no results', () => {
      const grid = createMockElement('organizations-grid')
      const emptyState = createMockElement('empty-state')
      const resultsCount = createMockElement('results-count')

      document.getElementById = jest.fn((id) => {
        if (id === 'organizations-grid') return grid
        if (id === 'empty-state') return emptyState
        if (id === 'results-count') return resultsCount
        return createMockElement(id)
      })

      UI.renderOrganizations([])

      expect(grid.classList.add).toHaveBeenCalledWith('hidden')
      expect(emptyState.classList.remove).toHaveBeenCalledWith('hidden')
    })

    test('should create organization card HTML', () => {
      const card = UI.createOrganizationCard(mockOrganizations[0])

      expect(card).toContain('org-card')
      expect(card).toContain(mockOrganizations[0].name)
      expect(card).toContain(mockOrganizations[0].location.city)
    })

    test('should truncate long descriptions', () => {
      const longOrg = {
        ...mockOrganizations[0],
        about: {
          pt: 'A'.repeat(200),
          en: 'B'.repeat(200)
        }
      }

      const card = UI.createOrganizationCard(longOrg)

      expect(card).toContain('...')
    })
  })

  // ========================================
  // FILTER COMPONENTS TESTS
  // ========================================
  describe('Filter Components', () => {
    test('should create category badge', () => {
      const badge = UI.createCategoryBadge('children_youth')

      expect(badge).toContain(mockCategories[0].icon)
      expect(badge).toContain(mockCategories[0].color)
    })

    test('should create donation icon', () => {
      const icon = UI.createDonationIcon('money')

      expect(icon).toContain(mockDonationTypes[0].icon)
    })
  })
})
