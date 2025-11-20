/**
 * Tests for config.js
 */

// Load config module
const { APP_CONFIG, getActiveProvider, isDebugMode } = require('../config')

describe('Config Module', () => {
  describe('APP_CONFIG', () => {
    it('should have dataProvider setting', () => {
      expect(APP_CONFIG).toHaveProperty('dataProvider')
      expect(typeof APP_CONFIG.dataProvider).toBe('string')
    })

    it('should have dataSources configuration', () => {
      expect(APP_CONFIG).toHaveProperty('dataSources')
      expect(APP_CONFIG.dataSources).toHaveProperty('json')
      expect(APP_CONFIG.dataSources).toHaveProperty('sqlite')
    })

    it('should have default language', () => {
      expect(APP_CONFIG).toHaveProperty('defaultLanguage')
      expect(['pt', 'en']).toContain(APP_CONFIG.defaultLanguage)
    })

    it('should have settings object', () => {
      expect(APP_CONFIG).toHaveProperty('settings')
      expect(typeof APP_CONFIG.settings).toBe('object')
    })

    it('should have features flags', () => {
      expect(APP_CONFIG).toHaveProperty('features')
      expect(typeof APP_CONFIG.features).toBe('object')
    })
  })

  describe('getActiveProvider()', () => {
    beforeEach(() => {
      // Reset window.location.search
      delete window.location
      window.location = { hostname: 'localhost', search: '' }
    })

    it('should return json when forced in URL', () => {
      window.location.search = '?provider=json'
      const provider = getActiveProvider()
      expect(provider).toBe('json')
    })

    it('should return sqlite when forced in URL', () => {
      window.location.search = '?provider=sqlite'
      const provider = getActiveProvider()
      expect(provider).toBe('sqlite')
    })

    it('should return auto when specified in URL', () => {
      window.location.search = '?provider=auto'
      const provider = getActiveProvider()
      expect(provider).toBe('auto')
    })

    it('should return json for non-localhost (GitHub Pages)', () => {
      window.location.hostname = 'dwildt.github.io'
      const provider = getActiveProvider()
      expect(provider).toBe('json')
    })

    it('should return auto for localhost when config is auto', () => {
      window.location.hostname = 'localhost'
      // Assuming config default is 'auto'
      const provider = getActiveProvider()
      expect(['auto', 'json']).toContain(provider)
    })
  })

  describe('isDebugMode()', () => {
    it('should return true when debug in URL', () => {
      window.location.search = '?debug'
      const debug = isDebugMode()
      expect(debug).toBe(true)
    })

    it('should return false when no debug param', () => {
      window.location.search = ''
      APP_CONFIG.settings.debug = false
      const debug = isDebugMode()
      expect(debug).toBe(false)
    })

    it('should return true when debug in config', () => {
      window.location.search = ''
      APP_CONFIG.settings.debug = true
      const debug = isDebugMode()
      expect(debug).toBe(true)
    })
  })
})
