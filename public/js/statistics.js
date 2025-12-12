/**
 * Statistics Page - Main Application Logic
 */

let dataProvider = null
let currentLang = 'pt'

// Initialize
async function initStatistics() {
  try {
    // Initialize theme
    if (window.themeManager) {
      themeManager.init()
    }

    // Initialize i18n
    if (window.i18n) {
      currentLang = i18n.getCurrentLanguage()
    }

    // Initialize data provider
    dataProvider = new JSONProvider()
    await dataProvider.init()

    // Hide loading, show content first (so canvas elements have dimensions)
    const loadingState = document.getElementById('loading-state')
    loadingState.classList.add('hidden')
    loadingState.style.display = 'none'
    document.getElementById('statistics-content').classList.remove('hidden')

    // Wait for DOM to update and canvas elements to have proper dimensions
    await new Promise(resolve => setTimeout(resolve, 300))

    // Load statistics after canvas elements are visible
    await loadStatistics()

  } catch (error) {
    console.error('Error initializing statistics:', error)
    document.getElementById('loading-state').classList.add('hidden')
    document.getElementById('error-state').classList.remove('hidden')
  }
}

// Load and render statistics
async function loadStatistics() {
  const stats = await dataProvider.getStatistics()
  const categories = await dataProvider.getCategories()
  const donationTypes = await dataProvider.getDonationTypes()

  // Render overview cards
  renderOverviewCards(stats)

  // Render charts
  renderCategoryCharts(stats, categories)
  renderLocationCharts(stats)
  renderDonationCharts(stats, donationTypes)
  renderGrowthChart(stats)

  // Render tables
  renderTables(stats, categories)
}

// Render overview cards
function renderOverviewCards(stats) {
  const container = document.getElementById('overview-cards')
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon">🏢</div>
      <div class="stat-value">${stats.activeOrganizations}</div>
      <div class="stat-label" data-i18n="statistics.totalOrgs">ONGs Ativas</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📍</div>
      <div class="stat-value">${stats.uniqueCitiesCount}</div>
      <div class="stat-label" data-i18n="statistics.totalCities">Cidades</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📂</div>
      <div class="stat-value">${Object.keys(stats.byCategory).length}</div>
      <div class="stat-label" data-i18n="statistics.totalCategories">Categorias</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">💰</div>
      <div class="stat-value">${Object.keys(stats.byDonationMethod).length}</div>
      <div class="stat-label" data-i18n="statistics.donationMethods">Métodos de Doação</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📦</div>
      <div class="stat-value">${stats.acceptsItems}</div>
      <div class="stat-label" data-i18n="statistics.acceptItems">Aceitam Itens</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🙋</div>
      <div class="stat-value">${stats.acceptsVolunteers}</div>
      <div class="stat-label" data-i18n="statistics.acceptVolunteers">Aceitam Voluntários</div>
    </div>
  `

  // Re-translate if i18n is available
  if (window.i18n) {
    i18n.translatePage()
  }
}

// Render category charts
function renderCategoryCharts(stats, categories) {
  const categoryNames = {}
  categories.forEach(cat => {
    categoryNames[cat.id] = cat.name[currentLang] || cat.name.pt
  })

  const categoryData = {}
  Object.entries(stats.byCategory).forEach(([catId, count]) => {
    categoryData[categoryNames[catId] || catId] = count
  })

  // Pie chart
  const pieCanvas = document.getElementById('chart-category-pie')
  drawPieChart(pieCanvas, categoryData, {
    showLegend: true,
    showPercentages: true
  })

  // Bar chart
  const barCanvas = document.getElementById('chart-category-bar')
  drawBarChart(barCanvas, categoryData, {
    maxBars: 10
  })
}

// Render location charts
function renderLocationCharts(stats) {
  // Cities bar chart
  const citiesCanvas = document.getElementById('chart-cities-bar')
  drawBarChart(citiesCanvas, stats.byCity, {
    maxBars: 10,
    color: '#10b981'
  })

  // States bar chart
  const statesCanvas = document.getElementById('chart-states-bar')
  drawBarChart(statesCanvas, stats.byState, {
    maxBars: 10,
    color: '#8b5cf6'
  })
}

// Render donation charts
function renderDonationCharts(stats, donationTypes) {
  const donationNames = {}
  donationTypes.forEach(type => {
    donationNames[type.id] = type.name[currentLang] || type.name.pt
  })

  const donationData = {}
  Object.entries(stats.byDonationMethod).forEach(([typeId, count]) => {
    donationData[donationNames[typeId] || typeId] = count
  })

  // Bar chart
  const barCanvas = document.getElementById('chart-donation-bar')
  drawBarChart(barCanvas, donationData, {
    maxBars: 10,
    color: '#f59e0b'
  })

  // Pie chart
  const pieCanvas = document.getElementById('chart-donation-pie')
  drawPieChart(pieCanvas, donationData, {
    showLegend: true,
    showPercentages: false
  })
}

// Render growth chart
function renderGrowthChart(stats) {
  const canvas = document.getElementById('chart-growth-line')
  drawLineChart(canvas, stats.orgsByMonth)
}

// Render tables
function renderTables(stats, categories) {
  // Cities table
  const citiesBody = document.getElementById('table-cities-body')
  const topCities = Object.entries(stats.byCity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  citiesBody.innerHTML = topCities.map(([city, count], i) => `
    <tr>
      <td class="rank">${i + 1}</td>
      <td>${city}</td>
      <td>${count}</td>
    </tr>
  `).join('')

  // Categories table
  const categoryNames = {}
  categories.forEach(cat => {
    categoryNames[cat.id] = cat.name[currentLang] || cat.name.pt
  })

  const categoriesBody = document.getElementById('table-categories-body')
  const topCategories = Object.entries(stats.byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  categoriesBody.innerHTML = topCategories.map(([catId, count], i) => `
    <tr>
      <td class="rank">${i + 1}</td>
      <td>${categoryNames[catId] || catId}</td>
      <td>${count}</td>
    </tr>
  `).join('')
}

// Theme toggle
function toggleTheme() {
  if (window.themeManager) {
    themeManager.toggle()
  }
}

// Language toggle
function toggleLanguage() {
  if (window.i18n) {
    i18n.toggleLanguage()
    currentLang = i18n.getCurrentLanguage()
    updateLanguageFlag()
    // Reload statistics with new language
    loadStatistics()
  }
}

// Update language flag
function updateLanguageFlag() {
  const flags = document.querySelectorAll('#lang-flag, #lang-flag-mobile')
  const newFlag = currentLang === 'pt' ? '🇧🇷' : '🇺🇸'
  flags.forEach(flag => {
    flag.textContent = newFlag
  })
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initStatistics()
    updateLanguageFlag()
  })
} else {
  initStatistics()
  updateLanguageFlag()
}
