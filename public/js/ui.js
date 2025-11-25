/**
 * UI - User Interface Components
 *
 * Functions for rendering and updating the user interface
 */

const UI = {
  /**
   * Render organization cards in grid
   */
  renderOrganizations(organizations) {
    const grid = document.getElementById('organizations-grid')
    const emptyState = document.getElementById('empty-state')
    const resultsCount = document.getElementById('results-count')

    // Update results count
    const count = organizations.length
    const orgsText = i18n.t('filters.organizations')
    resultsCount.textContent = `${i18n.t('filters.showing')} ${count} ${orgsText}`

    // Show empty state if no results
    if (count === 0) {
      grid.classList.add('hidden')
      emptyState.classList.remove('hidden')
      return
    }

    // Hide empty state and show grid
    emptyState.classList.add('hidden')
    grid.classList.remove('hidden')

    // Render cards
    grid.innerHTML = organizations.map(org => this.createOrganizationCard(org)).join('')
  },

  /**
   * Create HTML for a single organization card
   */
  createOrganizationCard(org) {
    const about = i18n.tWithFallback(org.about, '')
    const truncatedAbout = about.length > 150 ? about.substring(0, 150) + '...' : about

    // Get donation methods (first 3)
    const donationMethods = org.donations.methods.slice(0, 3)
    const hasMore = org.donations.methods.length > 3
    const moreCount = org.donations.methods.length - 3

    return `
      <div class="org-card bg-white rounded-lg shadow-md p-6 cursor-pointer" onclick="openOrgModal('${org.id}')">
        <!-- Header -->
        <div class="flex justify-between items-start mb-4">
          ${org.icon ? `<div class="text-4xl mr-4 flex-shrink-0">${org.icon}</div>` : ''}
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-800 mb-1">${this.escapeHtml(org.name)}</h3>
            <div class="flex items-center text-sm text-gray-600">
              ${org.location.address ? `
                <div class="relative inline-block">
                  <button
                    class="location-icon-btn flex items-center hover:text-blue-600 transition"
                    onclick="event.stopPropagation(); UI.toggleLocationDropdown(event, '${org.id}')"
                    title="${i18n.t('modal.openIn')}">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </button>
                  <div id="location-dropdown-${org.id}" class="hidden absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div class="py-1">
                      <a href="${this.generateGoogleMapsUrl(org.location.address, org.location.city, org.location.state)}" target="_blank" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onclick="event.stopPropagation()">
                        📍 ${i18n.t('modal.maps.google')}
                      </a>
                      <a href="${this.generateWazeUrl(org.location.address, org.location.city, org.location.state)}" target="_blank" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onclick="event.stopPropagation()">
                        🚗 ${i18n.t('modal.maps.waze')}
                      </a>
                    </div>
                  </div>
                </div>
              ` : `
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              `}
              ${this.escapeHtml(org.location.city)}, ${this.escapeHtml(org.location.state)}
            </div>
          </div>
          ${org.verified ? '<div class="flex-shrink-0 ml-2 text-green-500" title="' + i18n.t('org.verified') + '">✓</div>' : ''}
        </div>

        <!-- About -->
        <p class="text-gray-600 text-sm mb-4 truncate-3">${this.escapeHtml(truncatedAbout)}</p>

        <!-- Categories -->
        <div class="flex flex-wrap gap-2 mb-4">
          ${org.categories.map(catId => this.createCategoryBadge(catId)).join('')}
        </div>

        <!-- Donation Methods -->
        <div class="border-t pt-4">
          <p class="text-xs text-gray-500 mb-2 uppercase tracking-wide">${i18n.t('org.donationMethods')}</p>
          <div class="flex flex-wrap gap-2">
            ${donationMethods.map(method => this.createDonationIcon(method.type)).join('')}
            ${hasMore ? `<span class="text-xs text-gray-500">+${moreCount} ${i18n.t('common.more')}</span>` : ''}
          </div>
        </div>

        <!-- Learn More Button -->
        <div class="mt-4">
          <button class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition font-medium">
            ${i18n.t('org.learnMore')}
          </button>
        </div>
      </div>
    `
  },

  /**
   * Create category badge
   */
  createCategoryBadge(categoryId) {
    // Category will be loaded from window.app.categories
    const category = window.app?.categoriesMap?.[categoryId]
    if (!category) {
      return ''
    }

    const name = i18n.tWithFallback(category.name)

    return `
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white badge-${categoryId}" style="background-color: ${category.color}">
        ${category.icon} ${this.escapeHtml(name)}
      </span>
    `
  },

  /**
   * Create donation type icon
   */
  createDonationIcon(typeId) {
    const donationType = window.app?.donationTypesMap?.[typeId]
    if (!donationType) {
      return ''
    }

    const name = i18n.tWithFallback(donationType.name)

    return `
      <span class="inline-flex items-center text-sm text-gray-700" title="${this.escapeHtml(name)}">
        ${donationType.icon}
      </span>
    `
  },

  /**
   * Render category filter chips
   */
  renderCategoryFilters(categories, selectedCategories = []) {
    const container = document.getElementById('category-filters')

    container.innerHTML = categories.map(cat => {
      const name = i18n.tWithFallback(cat.name)
      const isActive = selectedCategories.includes(cat.id)
      const activeClass = isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

      return `
        <button
          class="filter-chip px-4 py-2 rounded-full text-sm font-medium transition ${activeClass}"
          onclick="toggleCategoryFilter('${cat.id}')"
          data-category="${cat.id}">
          ${cat.icon} ${this.escapeHtml(name)}
        </button>
      `
    }).join('')
  },

  /**
   * Render donation type filter chips
   */
  renderDonationTypeFilters(donationTypes, selectedTypes = []) {
    const container = document.getElementById('donation-filters')

    container.innerHTML = donationTypes.map(type => {
      const name = i18n.tWithFallback(type.name)
      const isActive = selectedTypes.includes(type.id)
      const activeClass = isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

      return `
        <button
          class="filter-chip px-4 py-2 rounded-full text-sm font-medium transition ${activeClass}"
          onclick="toggleDonationTypeFilter('${type.id}')"
          data-donation-type="${type.id}">
          ${type.icon} ${this.escapeHtml(name)}
        </button>
      `
    }).join('')
  },

  /**
   * Render category filters in modal
   */
  renderModalCategoryFilters(categories, selectedCategories = []) {
    const container = document.getElementById('modal-category-filters')
    if (!container) {
      return
    }

    container.innerHTML = categories.map(cat => {
      const name = i18n.tWithFallback(cat.name)
      const isActive = selectedCategories.includes(cat.id)
      const activeClass = isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

      return `
        <button
          class="filter-chip px-4 py-2 rounded-full text-sm font-medium transition ${activeClass}"
          onclick="window.app.toggleCategoryFilter('${cat.id}')"
          data-category="${cat.id}">
          ${cat.icon} ${this.escapeHtml(name)}
        </button>
      `
    }).join('')
  },

  /**
   * Render donation type filters in modal
   */
  renderModalDonationTypeFilters(donationTypes, selectedTypes = []) {
    const container = document.getElementById('modal-donation-filters')
    if (!container) {
      return
    }

    container.innerHTML = donationTypes.map(type => {
      const name = i18n.tWithFallback(type.name)
      const isActive = selectedTypes.includes(type.id)
      const activeClass = isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

      return `
        <button
          class="filter-chip px-4 py-2 rounded-full text-sm font-medium transition ${activeClass}"
          onclick="window.app.toggleDonationTypeFilter('${type.id}')"
          data-donation-type="${type.id}">
          ${type.icon} ${this.escapeHtml(name)}
        </button>
      `
    }).join('')
  },

  /**
   * Render breadcrumb navigation in modal
   */
  renderModalBreadcrumb(locations, selectedLocation = {}) {
    const container = document.getElementById('modal-breadcrumb-container')
    if (!container) {
      return
    }

    const html = []

    // Country selector
    const countries = locations.countries || []
    if (countries.length > 0) {
      const countryOptions = countries.map(c => {
        const name = i18n.tWithFallback(c.name)
        const selected = c.code === selectedLocation.country ? 'selected' : ''
        return `<option value="${c.code}" ${selected}>${this.escapeHtml(name)}</option>`
      }).join('')

      html.push(`
        <select onchange="window.app.selectCountry(this.value)" class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
          <option value="">${i18n.t('breadcrumb.select')} ${i18n.t('breadcrumb.country')}</option>
          ${countryOptions}
        </select>
      `)
    }

    // State selector (if country selected)
    if (selectedLocation.country) {
      const country = countries.find(c => c.code === selectedLocation.country)
      if (country && country.states) {
        const stateOptions = country.states.map(s => {
          const name = i18n.tWithFallback(s.name)
          const selected = s.code === selectedLocation.state ? 'selected' : ''
          return `<option value="${s.code}" ${selected}>${this.escapeHtml(name)}</option>`
        }).join('')

        html.push(`
          <select onchange="window.app.selectState(this.value)" class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">${i18n.t('breadcrumb.select')} ${i18n.t('breadcrumb.state')}</option>
            ${stateOptions}
          </select>
        `)
      }
    }

    // City selector (if state selected)
    if (selectedLocation.state) {
      const country = countries.find(c => c.code === selectedLocation.country)
      if (country) {
        const state = country.states.find(s => s.code === selectedLocation.state)
        if (state && state.cities && state.cities.length > 0) {
          const cityOptions = state.cities.map(city => {
            const cityName = typeof city === 'string' ? city : city.name
            const selected = cityName === selectedLocation.city ? 'selected' : ''
            return `<option value="${cityName}" ${selected}>${this.escapeHtml(cityName)}</option>`
          }).join('')

          html.push(`
            <select onchange="window.app.selectCity(this.value)" class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
              <option value="">${i18n.t('breadcrumb.all')}</option>
              ${cityOptions}
            </select>
          `)
        }
      }
    }

    container.innerHTML = html.join('')
  },

  /**
   * Open organization detail modal
   */
  openOrgModal(org) {
    const modal = document.getElementById('org-modal')
    const content = document.getElementById('org-modal-content')

    const about = i18n.tWithFallback(org.about, '')

    // Build donation methods HTML
    const donationMethodsHtml = org.donations.methods.map(method => {
      const donationType = window.app?.donationTypesMap?.[method.type]
      if (!donationType) {
        return ''
      }

      const typeName = i18n.tWithFallback(donationType.name)
      const description = i18n.tWithFallback(method.description, '')

      return `
        <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div class="text-2xl">${donationType.icon}</div>
          <div>
            <p class="font-medium text-gray-800">${this.escapeHtml(typeName)}</p>
            ${description ? `<p class="text-sm text-gray-600">${this.escapeHtml(description)}</p>` : ''}
            ${method.url ? `<a href="${method.url}" target="_blank" class="text-sm text-primary hover:underline">Link</a>` : ''}
          </div>
        </div>
      `
    }).join('')

    content.innerHTML = `
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-start">
          <h2 class="text-2xl font-bold text-gray-800">${this.escapeHtml(org.name)}</h2>
          <button onclick="closeModal(event)" data-close-modal class="text-gray-400 hover:text-gray-600 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        ${org.verified ? `<span class="inline-flex items-center mt-2 text-sm text-green-600"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>${i18n.t('org.verified')}</span>` : ''}
      </div>

      <div class="px-6 py-4 max-h-96 overflow-y-auto">
        <!-- About -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${i18n.t('modal.about')}</h3>
          <p class="text-gray-600">${this.escapeHtml(about)}</p>
        </div>

        <!-- Categories -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${i18n.t('org.categories')}</h3>
          <div class="flex flex-wrap gap-2">
            ${org.categories.map(catId => this.createCategoryBadge(catId)).join('')}
          </div>
        </div>

        <!-- How to Donate -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">${i18n.t('modal.howToDonate')}</h3>
          <div class="space-y-3">
            ${donationMethodsHtml}
          </div>
        </div>

        <!-- Contact -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${i18n.t('modal.contact')}</h3>
          ${org.location.address ? `
            <p class="text-gray-600 text-sm mb-2">
              <strong>${i18n.t('modal.address')}:</strong> ${this.escapeHtml(org.location.address)}, ${this.escapeHtml(org.location.city)}, ${this.escapeHtml(org.location.state)} ${org.location.postalCode || ''}
            </p>
            <p class="text-sm text-gray-500 mb-2">
              <strong>${i18n.t('modal.openIn')}:</strong>
              <a href="${this.generateGoogleMapsUrl(org.location.address, org.location.city, org.location.state)}" target="_blank" class="text-blue-600 hover:text-blue-800 underline ml-1">📍 ${i18n.t('modal.maps.google')}</a>
              <span class="mx-1">•</span>
              <a href="${this.generateWazeUrl(org.location.address, org.location.city, org.location.state)}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">🚗 ${i18n.t('modal.maps.waze')}</a>
            </p>
          ` : ''}
          <div class="flex flex-wrap gap-3 mt-3">
            ${org.contact.website ? `<a href="${org.contact.website}" target="_blank" class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>${i18n.t('modal.visitWebsite')}</a>` : ''}
            ${org.contact.social?.instagram ? `<a href="https://instagram.com/${org.contact.social.instagram}" target="_blank" class="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">📸 Instagram</a>` : ''}
            ${org.transparency ? `<a href="${org.transparency}" target="_blank" class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">${i18n.t('modal.transparency')}</a>` : ''}
          </div>
        </div>
      </div>
    `

    modal.classList.remove('hidden')
    modal.querySelector('.inline-block').classList.add('modal-enter')
    document.body.style.overflow = 'hidden'
  },

  /**
   * Show loading state
   */
  showLoading() {
    document.getElementById('loading-state').classList.remove('hidden')
    document.getElementById('error-state').classList.add('hidden')
    document.getElementById('empty-state').classList.add('hidden')
    document.getElementById('organizations-grid').classList.add('hidden')
  },

  /**
   * Hide loading state
   */
  hideLoading() {
    document.getElementById('loading-state').classList.add('hidden')
  },

  /**
   * Show error state
   */
  showError() {
    document.getElementById('loading-state').classList.add('hidden')
    document.getElementById('error-state').classList.remove('hidden')
    document.getElementById('empty-state').classList.add('hidden')
    document.getElementById('organizations-grid').classList.add('hidden')
  },

  /**
   * Toggle location dropdown menu
   */
  toggleLocationDropdown(event, orgId) {
    event.stopPropagation()
    const dropdown = document.getElementById(`location-dropdown-${orgId}`)
    const allDropdowns = document.querySelectorAll('[id^="location-dropdown-"]')

    // Close all other dropdowns
    allDropdowns.forEach(d => {
      if (d.id !== `location-dropdown-${orgId}`) {
        d.classList.add('hidden')
      }
    })

    // Toggle current dropdown
    dropdown.classList.toggle('hidden')
  },

  /**
   * Generate Google Maps URL for an address
   */
  generateGoogleMapsUrl(address, city, state, country = 'Brazil') {
    const query = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`)
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  },

  /**
   * Generate Waze URL for an address
   */
  generateWazeUrl(address, city, state, country = 'Brazil') {
    const query = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`)
    return `https://www.waze.com/ul?q=${query}&navigate=yes`
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI
}
