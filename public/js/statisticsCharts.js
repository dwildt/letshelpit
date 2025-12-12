/**
 * Statistics Charts - Simple chart components using Canvas API
 *
 * This module provides simple chart visualizations without external dependencies.
 * Uses only native Canvas API for rendering.
 */

/**
 * Draw a bar chart on canvas
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} data - Data object with labels and values
 * @param {Object} options - Chart options
 */
function drawBarChart(canvas, data, options = {}) {
  const ctx = canvas.getContext('2d')
  const {
    labels = Object.keys(data),
    values = Object.values(data),
    color = '#3b82f6',
    labelColor = '#374151',
    valueColor = '#6b7280',
    maxBars = 10
  } = options

  // Sort by value (descending) and limit
  const sorted = labels.map((label, i) => ({
    label,
    value: values[i]
  })).sort((a, b) => b.value - a.value).slice(0, maxBars)

  const sortedLabels = sorted.map(item => item.label)
  const sortedValues = sorted.map(item => item.value)

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Set high DPI
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)

  const width = rect.width
  const height = rect.height
  const padding = 40
  const barPadding = 8
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...sortedValues)
  const barWidth = (chartWidth / sortedLabels.length) - barPadding

  // Draw bars
  sortedLabels.forEach((label, i) => {
    const value = sortedValues[i]
    const barHeight = (value / maxValue) * chartHeight
    const x = padding + (i * (barWidth + barPadding))
    const y = height - padding - barHeight

    // Draw bar
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth, barHeight)

    // Draw value on top
    ctx.fillStyle = valueColor
    ctx.font = '12px system-ui, -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(value, x + barWidth / 2, y - 5)

    // Draw label below
    ctx.fillStyle = labelColor
    ctx.save()
    ctx.translate(x + barWidth / 2, height - padding + 15)
    ctx.rotate(-Math.PI / 4)
    ctx.textAlign = 'right'
    ctx.fillText(label.length > 15 ? label.substring(0, 12) + '...' : label, 0, 0)
    ctx.restore()
  })
}

/**
 * Draw a pie chart on canvas
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} data - Data object with labels and values
 * @param {Object} options - Chart options
 */
function drawPieChart(canvas, data, options = {}) {
  const ctx = canvas.getContext('2d')
  const {
    labels = Object.keys(data),
    values = Object.values(data),
    colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
    ],
    showLegend = true,
    showPercentages = true
  } = options

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Set high DPI
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)

  const width = rect.width
  const height = rect.height
  const centerX = showLegend ? width / 3 : width / 2
  const centerY = height / 2
  const radius = Math.max(Math.min(centerX, centerY) - 20, 0) // Ensure radius is not negative

  const total = values.reduce((sum, val) => sum + val, 0)
  let currentAngle = -Math.PI / 2

  // Draw slices
  values.forEach((value, i) => {
    const sliceAngle = (value / total) * 2 * Math.PI

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    ctx.fillStyle = colors[i % colors.length]
    ctx.fill()

    // Draw percentage on slice
    if (showPercentages) {
      const percentage = ((value / total) * 100).toFixed(1)
      if (percentage > 5) { // Only show if slice is large enough
        const textAngle = currentAngle + sliceAngle / 2
        const textX = centerX + (radius * 0.7) * Math.cos(textAngle)
        const textY = centerY + (radius * 0.7) * Math.sin(textAngle)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 14px system-ui, -apple-system, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`${percentage}%`, textX, textY)
      }
    }

    currentAngle += sliceAngle
  })

  // Draw legend
  if (showLegend) {
    const legendX = width * 0.55
    const legendY = 30
    const lineHeight = 25

    labels.forEach((label, i) => {
      const y = legendY + (i * lineHeight)

      // Color box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(legendX, y, 15, 15)

      // Label text
      ctx.fillStyle = '#374151'
      ctx.font = '13px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      const labelText = label.length > 20 ? label.substring(0, 17) + '...' : label
      ctx.fillText(`${labelText} (${values[i]})`, legendX + 20, y + 7)
    })
  }
}

/**
 * Draw a line chart on canvas
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} data - Data object with labels and values
 * @param {Object} options - Chart options
 */
function drawLineChart(canvas, data, options = {}) {
  const ctx = canvas.getContext('2d')
  const {
    labels = Object.keys(data),
    values = Object.values(data),
    color = '#3b82f6',
    fillColor = 'rgba(59, 130, 246, 0.1)',
    pointColor = '#1e40af',
    gridColor = '#e5e7eb',
    labelColor = '#6b7280'
  } = options

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Set high DPI
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)

  const width = rect.width
  const height = rect.height
  const padding = 50
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...values, 1)
  const stepX = chartWidth / (labels.length - 1 || 1)
  const stepY = chartHeight / maxValue

  // Draw grid lines
  ctx.strokeStyle = gridColor
  ctx.lineWidth = 1
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()

    // Draw y-axis labels
    const value = Math.round(maxValue - (maxValue / 5) * i)
    ctx.fillStyle = labelColor
    ctx.font = '11px system-ui, -apple-system, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(value, padding - 10, y + 4)
  }

  // Draw line
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  values.forEach((value, i) => {
    const x = padding + (stepX * i)
    const y = height - padding - (value * stepY)

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Fill area under line
  ctx.lineTo(padding + stepX * (values.length - 1), height - padding)
  ctx.lineTo(padding, height - padding)
  ctx.closePath()
  ctx.fillStyle = fillColor
  ctx.fill()

  // Draw points
  values.forEach((value, i) => {
    const x = padding + (stepX * i)
    const y = height - padding - (value * stepY)

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = pointColor
    ctx.fill()
  })

  // Draw x-axis labels
  ctx.fillStyle = labelColor
  ctx.font = '11px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  labels.forEach((label, i) => {
    const x = padding + (stepX * i)
    const labelText = label.length > 8 ? label.substring(0, 6) + '...' : label
    ctx.fillText(labelText, x, height - padding + 20)
  })
}

/**
 * Render a statistic card
 * @param {string} containerId - Container element ID
 * @param {number} value - Statistic value
 * @param {string} label - Statistic label
 * @param {string} icon - Optional icon (emoji or text)
 */
function renderStatCard(containerId, value, label, icon = '') {
  const container = document.getElementById(containerId)
  if (!container) {
    return
  }

  container.innerHTML = `
    <div class="stat-card">
      ${icon ? `<div class="stat-icon">${icon}</div>` : ''}
      <div class="stat-value">${value}</div>
      <div class="stat-label">${label}</div>
    </div>
  `
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    drawBarChart,
    drawPieChart,
    drawLineChart,
    renderStatCard
  }
}
