/**
 * Tests for i18n.js
 */

// Import config first to make APP_CONFIG available globally
const { APP_CONFIG } = require('../config')
global.APP_CONFIG = APP_CONFIG

// Mock isDebugMode to return false (already mocked in setup.js: debugLog)
global.isDebugMode = jest.fn(() => false)

const { I18n, TRANSLATIONS } = require('../i18n')

describe('I18n Module', () => {
  let i18nInstance

  beforeEach(() => {
    i18nInstance = new I18n()
    localStorage.getItem.mockReturnValue(null)
  })

  describe('Translation Keys', () => {
    it('should have Portuguese translations', () => {
      expect(TRANSLATIONS).toHaveProperty('pt')
      expect(typeof TRANSLATIONS.pt).toBe('object')
    })

    it('should have English translations', () => {
      expect(TRANSLATIONS).toHaveProperty('en')
      expect(typeof TRANSLATIONS.en).toBe('object')
    })

    it('should have matching keys in both languages', () => {
      const ptKeys = Object.keys(TRANSLATIONS.pt)
      const enKeys = Object.keys(TRANSLATIONS.en)
      expect(ptKeys.length).toBeGreaterThan(0)
      expect(enKeys.length).toBeGreaterThan(0)
      // Most keys should match
      const commonKeys = ptKeys.filter(key => enKeys.includes(key))
      expect(commonKeys.length).toBeGreaterThan(ptKeys.length * 0.9)
    })
  })

  describe('I18n Class', () => {
    it('should initialize with default or saved language', () => {
      expect(['pt', 'en']).toContain(i18nInstance.getLang())
    })

    it('should get translation for existing key', () => {
      const translation = i18nInstance.t('site.title')
      expect(translation).toBeTruthy()
      expect(typeof translation).toBe('string')
    })

    it('should return default value for missing key', () => {
      const translation = i18nInstance.t('non.existent.key', 'Default Value')
      expect(translation).toBe('Default Value')
    })

    it('should set language', () => {
      i18nInstance.setLang('en')
      expect(i18nInstance.getLang()).toBe('en')
    })

    it('should toggle language', () => {
      const initialLang = i18nInstance.getLang()
      i18nInstance.toggleLang()
      const newLang = i18nInstance.getLang()
      expect(newLang).not.toBe(initialLang)
      expect(['pt', 'en']).toContain(newLang)
    })

    it('should save language preference to localStorage', () => {
      i18nInstance.setLang('en')
      expect(localStorage.setItem).toHaveBeenCalledWith('letshelpit_lang', 'en')
    })

    it('should load saved language from localStorage', () => {
      localStorage.getItem.mockReturnValue('en')
      const instance = new I18n()
      expect(instance.getLang()).toBe('en')
    })

    it('should get translation with fallback', () => {
      i18nInstance.setLang('pt')
      const obj = { pt: 'Olá', en: 'Hello' }
      const translation = i18nInstance.tWithFallback(obj)
      expect(translation).toBe('Olá')
    })

    it('should fallback to other language if current not available', () => {
      i18nInstance.setLang('pt')
      const obj = { en: 'Hello' }
      const translation = i18nInstance.tWithFallback(obj)
      expect(translation).toBe('Hello')
    })

    it('should notify listeners on language change', () => {
      const listener = jest.fn()
      i18nInstance.onLanguageChange(listener)
      i18nInstance.setLang('en')
      expect(listener).toHaveBeenCalledWith('en')
    })

    it('should remove listener', () => {
      const listener = jest.fn()
      i18nInstance.onLanguageChange(listener)
      i18nInstance.offLanguageChange(listener)
      i18nInstance.setLang('en')
      expect(listener).not.toHaveBeenCalled()
    })
  })
})
