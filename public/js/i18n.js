/**
 * i18n - Internationalization Module
 *
 * Handles translation between Portuguese (pt) and English (en)
 * Stores user language preference in localStorage
 */

const TRANSLATIONS = {
  pt: {
    // Header
    'site.title': 'Let\'s Help It',
    'site.tagline': 'Encontre ONGs para apoiar',
    'lang.switch': 'English',

    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.howto': 'Como Adicionar ONG',
    'nav.statistics': 'Estatísticas',

    // Breadcrumb
    'breadcrumb.country': 'País',
    'breadcrumb.state': 'Estado',
    'breadcrumb.city': 'Cidade',
    'breadcrumb.select': 'Selecione',
    'breadcrumb.all': 'Todos',

    // Search & Filters
    'search.placeholder': 'Buscar organizações...',
    'search.button': 'Buscar',
    'search.label': 'Buscar organizações',
    'filters.title': 'Filtros',
    'filters.button': 'Filtros',
    'filters.categories': 'Categorias',
    'filters.donationTypes': 'Tipos de Doação',
    'filters.location': 'Localização',
    'filters.active': 'Filtros ativos',
    'filters.clear': 'Limpar Filtros',
    'filters.clearAll': 'Limpar todos',
    'filters.cancel': 'Cancelar',
    'filters.apply': 'Aplicar',
    'filters.showing': 'Mostrando',
    'filters.organizations': 'organizações',

    // Organization Card
    'org.location': 'Localização',
    'org.categories': 'Categorias',
    'org.accepts': 'Aceita',
    'org.donationMethods': 'Formas de Doar',
    'org.website': 'Site',
    'org.learnMore': 'Saiba Mais',
    'org.close': 'Fechar',
    'org.verified': 'Verificada',

    // Donation Types (generic)
    'donation.money': 'Dinheiro',
    'donation.items': 'Itens',
    'donation.volunteering': 'Voluntariado',
    'donation.and': 'e',

    // Details Modal
    'modal.about': 'Sobre a Organização',
    'modal.howToDonate': 'Como Doar',
    'modal.contact': 'Contato',
    'modal.address': 'Endereço',
    'modal.openIn': 'Abrir em',
    'modal.maps.google': 'Google Maps',
    'modal.maps.waze': 'Waze',
    'modal.visitWebsite': 'Visitar Site',
    'modal.transparency': 'Transparência',

    // Share
    'share.title': 'Compartilhar',
    'share.whatsapp': 'WhatsApp',
    'share.facebook': 'Facebook',
    'share.twitter': 'Twitter',
    'share.linkedin': 'LinkedIn',
    'share.copyLink': 'Copiar Link',
    'share.copied': 'Link copiado!',
    'share.copyFailed': 'Erro ao copiar',

    // Empty States
    'empty.title': 'Nenhuma organização encontrada',
    'empty.description': 'Tente ajustar os filtros ou fazer uma nova busca',
    'empty.clearFilters': 'Limpar filtros',

    // Loading
    'loading.text': 'Carregando organizações...',
    'loading.please_wait': 'Por favor, aguarde',

    // Error
    'error.title': 'Ops! Algo deu errado',
    'error.description': 'Não foi possível carregar os dados. Tente recarregar a página.',
    'error.reload': 'Recarregar',

    // Footer
    'footer.about': 'Sobre o Projeto',
    'footer.contribute': 'Como Contribuir',
    'footer.license': 'Licença Apache 2.0',
    'footer.madeWith': 'Feito com',
    'footer.by': 'por',
    'footer.support': 'Apoie o projeto',
    'footer.sponsors': 'GitHub Sponsors',
    'footer.apoia': 'Apoia.se',
    'footer.patreon': 'Patreon',

    // Stats
    'stats.totalOrgs': 'organizações cadastradas',
    'stats.categories': 'categorias',
    'stats.donationTypes': 'formas de doar',

    // Statistics Page
    'statistics.title': '📊 Estatísticas',
    'statistics.subtitle': 'Estatísticas',
    'statistics.description': 'Dados agregados sobre as organizações cadastradas no Let\'s Help It',
    'statistics.loading': 'Carregando estatísticas...',
    'statistics.error': 'Erro ao carregar estatísticas. Por favor, tente novamente.',
    'statistics.totalOrgs': 'ONGs Ativas',
    'statistics.totalCities': 'Cidades',
    'statistics.totalCategories': 'Categorias',
    'statistics.donationMethods': 'Métodos de Doação',
    'statistics.acceptItems': 'Aceitam Itens',
    'statistics.acceptVolunteers': 'Aceitam Voluntários',
    'statistics.byCategory': '📂 Distribuição por Categoria',
    'statistics.categoryPie': 'Categorias (Pizza)',
    'statistics.categoryBar': 'Top 10 Categorias (Barras)',
    'statistics.byLocation': '📍 Distribuição por Localização',
    'statistics.citiesBar': 'Top 10 Cidades',
    'statistics.statesBar': 'Distribuição por Estado',
    'statistics.byDonation': '💰 Métodos de Doação',
    'statistics.donationBar': 'Métodos Mais Aceitos',
    'statistics.donationPie': 'Distribuição de Métodos',
    'statistics.growth': '📈 Crescimento ao Longo do Tempo',
    'statistics.growthLine': 'Cadastros por Mês',
    'statistics.details': '📋 Detalhes',
    'statistics.topCities': 'Top 10 Cidades',
    'statistics.topCategories': 'Top 10 Categorias',
    'statistics.city': 'Cidade',
    'statistics.category': 'Categoria',
    'statistics.organizations': 'ONGs',

    // Common
    'common.yes': 'Sim',
    'common.no': 'Não',
    'common.and': 'e',
    'common.or': 'ou',
    'common.more': 'mais',
    'common.less': 'menos'
  },

  en: {
    // Header
    'site.title': 'Let\'s Help It',
    'site.tagline': 'Find NGOs to Support',
    'lang.switch': 'Português',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.howto': 'How to Add NGO',
    'nav.statistics': 'Statistics',

    // Breadcrumb
    'breadcrumb.country': 'Country',
    'breadcrumb.state': 'State',
    'breadcrumb.city': 'City',
    'breadcrumb.select': 'Select',
    'breadcrumb.all': 'All',

    // Search & Filters
    'search.placeholder': 'Search organizations...',
    'search.button': 'Search',
    'search.label': 'Search organizations',
    'filters.title': 'Filters',
    'filters.button': 'Filters',
    'filters.categories': 'Categories',
    'filters.donationTypes': 'Donation Types',
    'filters.location': 'Location',
    'filters.active': 'Active filters',
    'filters.clear': 'Clear Filters',
    'filters.clearAll': 'Clear all',
    'filters.cancel': 'Cancel',
    'filters.apply': 'Apply',
    'filters.showing': 'Showing',
    'filters.organizations': 'organizations',

    // Organization Card
    'org.location': 'Location',
    'org.categories': 'Categories',
    'org.accepts': 'Accepts',
    'org.donationMethods': 'Ways to Donate',
    'org.website': 'Website',
    'org.learnMore': 'Learn More',
    'org.close': 'Close',
    'org.verified': 'Verified',

    // Donation Types (generic)
    'donation.money': 'Money',
    'donation.items': 'Items',
    'donation.volunteering': 'Volunteering',
    'donation.and': 'and',

    // Details Modal
    'modal.about': 'About the Organization',
    'modal.howToDonate': 'How to Donate',
    'modal.contact': 'Contact',
    'modal.address': 'Address',
    'modal.openIn': 'Open in',
    'modal.maps.google': 'Google Maps',
    'modal.maps.waze': 'Waze',
    'modal.visitWebsite': 'Visit Website',
    'modal.transparency': 'Transparency',

    // Share
    'share.title': 'Share',
    'share.whatsapp': 'WhatsApp',
    'share.facebook': 'Facebook',
    'share.twitter': 'Twitter',
    'share.linkedin': 'LinkedIn',
    'share.copyLink': 'Copy Link',
    'share.copied': 'Link copied!',
    'share.copyFailed': 'Copy failed',

    // Empty States
    'empty.title': 'No organizations found',
    'empty.description': 'Try adjusting filters or making a new search',
    'empty.clearFilters': 'Clear filters',

    // Loading
    'loading.text': 'Loading organizations...',
    'loading.please_wait': 'Please wait',

    // Error
    'error.title': 'Oops! Something went wrong',
    'error.description': 'Could not load data. Try reloading the page.',
    'error.reload': 'Reload',

    // Footer
    'footer.about': 'About the Project',
    'footer.contribute': 'How to Contribute',
    'footer.license': 'Apache 2.0 License',
    'footer.madeWith': 'Made with',
    'footer.by': 'by',
    'footer.support': 'Support the project',
    'footer.sponsors': 'GitHub Sponsors',
    'footer.apoia': 'Apoia.se',
    'footer.patreon': 'Patreon',

    // Stats
    'stats.totalOrgs': 'registered organizations',
    'stats.categories': 'categories',
    'stats.donationTypes': 'ways to donate',

    // Statistics Page
    'statistics.title': '📊 Statistics',
    'statistics.subtitle': 'Statistics',
    'statistics.description': 'Aggregated data about organizations registered on Let\'s Help It',
    'statistics.loading': 'Loading statistics...',
    'statistics.error': 'Error loading statistics. Please try again.',
    'statistics.totalOrgs': 'Active NGOs',
    'statistics.totalCities': 'Cities',
    'statistics.totalCategories': 'Categories',
    'statistics.donationMethods': 'Donation Methods',
    'statistics.acceptItems': 'Accept Items',
    'statistics.acceptVolunteers': 'Accept Volunteers',
    'statistics.byCategory': '📂 Distribution by Category',
    'statistics.categoryPie': 'Categories (Pie)',
    'statistics.categoryBar': 'Top 10 Categories (Bars)',
    'statistics.byLocation': '📍 Distribution by Location',
    'statistics.citiesBar': 'Top 10 Cities',
    'statistics.statesBar': 'Distribution by State',
    'statistics.byDonation': '💰 Donation Methods',
    'statistics.donationBar': 'Most Accepted Methods',
    'statistics.donationPie': 'Methods Distribution',
    'statistics.growth': '📈 Growth Over Time',
    'statistics.growthLine': 'Registrations per Month',
    'statistics.details': '📋 Details',
    'statistics.topCities': 'Top 10 Cities',
    'statistics.topCategories': 'Top 10 Categories',
    'statistics.city': 'City',
    'statistics.category': 'Category',
    'statistics.organizations': 'NGOs',

    // Common
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.and': 'and',
    'common.or': 'or',
    'common.more': 'more',
    'common.less': 'less'
  }
}

/**
 * i18n Manager Class
 */
class I18n {
  constructor() {
    this.currentLang = this.getSavedLanguage() || APP_CONFIG.defaultLanguage
    this.listeners = []
  }

  /**
   * Get current language
   */
  getLang() {
    return this.currentLang
  }

  /**
   * Set language
   */
  setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') {
      console.error(`Invalid language: ${lang}. Must be 'pt' or 'en'`)
      return
    }

    this.currentLang = lang
    this.saveLanguage(lang)
    this.notifyListeners()
    debugLog(`i18n: Language changed to ${lang}`)
  }

  /**
   * Toggle between PT and EN
   */
  toggleLang() {
    const newLang = this.currentLang === 'pt' ? 'en' : 'pt'
    this.setLang(newLang)
  }

  /**
   * Get translation for a key
   */
  t(key, defaultValue = key) {
    const translation = TRANSLATIONS[this.currentLang][key]
    if (!translation) {
      if (isDebugMode()) {
        console.warn(`i18n: Missing translation for key "${key}" in language "${this.currentLang}"`)
      }
      return defaultValue
    }
    return translation
  }

  /**
   * Get translation with fallback to other language
   */
  tWithFallback(obj, fallbackText = '') {
    if (!obj) {
      return fallbackText
    }

    // If obj is a string, return it
    if (typeof obj === 'string') {
      return obj
    }

    // If obj has current language, use it
    if (obj[this.currentLang]) {
      return obj[this.currentLang]
    }

    // Fallback to other language
    const otherLang = this.currentLang === 'pt' ? 'en' : 'pt'
    if (obj[otherLang]) {
      return obj[otherLang]
    }

    // Fallback to Portuguese (default)
    if (obj.pt) {
      return obj.pt
    }

    return fallbackText
  }

  /**
   * Add listener for language change events
   */
  onLanguageChange(callback) {
    this.listeners.push(callback)
  }

  /**
   * Remove listener
   */
  offLanguageChange(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback)
  }

  /**
   * Notify all listeners of language change
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentLang)
      } catch (error) {
        console.error('i18n: Error in language change listener', error)
      }
    })
  }

  /**
   * Get saved language from localStorage
   */
  getSavedLanguage() {
    try {
      return localStorage.getItem('letshelpit_lang')
    } catch (e) {
      return null
    }
  }

  /**
   * Save language to localStorage
   */
  saveLanguage(lang) {
    try {
      localStorage.setItem('letshelpit_lang', lang)
    } catch (e) {
      console.warn('i18n: Could not save language preference to localStorage', e)
    }
  }

  /**
   * Update all elements with data-i18n attribute
   */
  updateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n')
      const translation = this.t(key)

      // Update element based on type
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translation
        } else {
          element.value = translation
        }
      } else {
        element.textContent = translation
      }
    })

    // Update lang attribute on html element
    document.documentElement.lang = this.currentLang

    debugLog('i18n: DOM updated')
  }
}

// Create global instance
const i18n = new I18n()

// Export to window for browser use
if (typeof window !== 'undefined') {
  window.i18n = i18n
}

// Export for use in other modules (Node.js/Jest)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { I18n, i18n, TRANSLATIONS }
}
