/**
 * Jest Setup File
 * Runs before each test suite
 */

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

// Mock fetch globally
global.fetch = jest.fn()

// Mock console.log and debugLog
global.console.log = jest.fn()
global.debugLog = jest.fn()

// Mock window object for Node environment
if (typeof window === 'undefined') {
  global.window = {
    location: {
      hostname: 'localhost',
      href: 'http://localhost:8000',
      search: '',
      hash: ''
    }
  }
  global.document = {
    documentElement: { lang: 'pt' },
    querySelectorAll: jest.fn(() => [])
  }
} else {
  // Browser environment
  delete window.location
  window.location = {
    hostname: 'localhost',
    href: 'http://localhost:8000',
    search: '',
    hash: ''
  }
}

// Mock URLSearchParams if needed
if (typeof URLSearchParams === 'undefined') {
  global.URLSearchParams = class URLSearchParams {
    constructor(search = '') {
      this.params = {}
      if (search.startsWith('?')) {
        search = search.substring(1)
      }
      search.split('&').forEach(pair => {
        const [key, value] = pair.split('=')
        if (key) {
          this.params[key] = value || ''
        }
      })
    }

    get(key) {
      return this.params[key] || null
    }

    has(key) {
      return key in this.params
    }
  }
}

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
  global.fetch.mockClear()
  global.console.log.mockClear()
  global.debugLog.mockClear()
})
