/**
 * Theme Management
 * Handles dark mode toggle, persistence, and system preference detection
 */

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'theme-preference'
    this.themes = {
      LIGHT: 'light',
      DARK: 'dark',
      AUTO: 'auto'
    }
    this.currentTheme = this.themes.AUTO
    this.listeners = []
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  init() {
    // Load saved preference or use auto
    const saved = localStorage.getItem(this.STORAGE_KEY)
    this.currentTheme = saved || this.themes.AUTO

    // Apply theme
    this.applyTheme()

    // Listen for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', () => {
        if (this.currentTheme === this.themes.AUTO) {
          this.applyTheme()
        }
      })
    }
  }

  /**
   * Get effective theme (resolve AUTO to LIGHT or DARK)
   */
  getEffectiveTheme() {
    if (this.currentTheme === this.themes.AUTO) {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return this.themes.DARK
      }
      return this.themes.LIGHT
    }
    return this.currentTheme
  }

  /**
   * Apply theme to document
   */
  applyTheme() {
    const effectiveTheme = this.getEffectiveTheme()
    const root = document.documentElement

    if (effectiveTheme === this.themes.DARK) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }

    // Update icon
    this.updateIcon()

    // Notify listeners
    this.notifyListeners(effectiveTheme)
  }

  /**
   * Update theme toggle icon
   */
  updateIcon() {
    const effectiveTheme = this.getEffectiveTheme()
    const icon = effectiveTheme === this.themes.DARK ? '🌙' : '☀️'

    const iconElement = document.getElementById('theme-icon')
    if (iconElement) {
      iconElement.textContent = icon
    }

    const iconElementMobile = document.getElementById('theme-icon-mobile')
    if (iconElementMobile) {
      iconElementMobile.textContent = icon
    }
  }

  /**
   * Toggle theme
   */
  toggle() {
    // Simple toggle: light <-> dark
    const effectiveTheme = this.getEffectiveTheme()
    this.currentTheme = effectiveTheme === this.themes.DARK ? this.themes.LIGHT : this.themes.DARK

    // Save preference
    localStorage.setItem(this.STORAGE_KEY, this.currentTheme)

    // Apply
    this.applyTheme()
  }

  /**
   * Set specific theme
   * @param {string} theme - 'light', 'dark', or 'auto'
   */
  setTheme(theme) {
    if (!Object.values(this.themes).includes(theme)) {
      console.warn(`Invalid theme: ${theme}`)
      return
    }

    this.currentTheme = theme
    localStorage.setItem(this.STORAGE_KEY, theme)
    this.applyTheme()
  }

  /**
   * Get current theme preference
   */
  getTheme() {
    return this.currentTheme
  }

  /**
   * Add theme change listener
   * @param {Function} callback - Called with effective theme when it changes
   */
  addListener(callback) {
    this.listeners.push(callback)
  }

  /**
   * Remove theme change listener
   * @param {Function} callback
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback)
  }

  /**
   * Notify all listeners
   * @param {string} theme
   */
  notifyListeners(theme) {
    this.listeners.forEach(callback => {
      try {
        callback(theme)
      } catch (error) {
        console.error('Theme listener error:', error)
      }
    })
  }
}

// Create global instance
const themeManager = new ThemeManager()

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.themeManager = themeManager
}
