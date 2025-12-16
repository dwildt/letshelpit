/**
 * ShareService - Social Media Sharing Utilities
 * Handles sharing organizations to various social media platforms
 */

class ShareService {
  /**
   * Generate a shareable URL for an organization
   * @param {string} orgId - Organization ID
   * @returns {string} Full URL with hash
   */
  static getShareUrl(orgId) {
    const baseUrl = window.location.origin + window.location.pathname
    return `${baseUrl}#org-${orgId}`
  }

  /**
   * Get organization data for sharing
   * @param {Object} org - Organization object
   * @param {string} lang - Language code ('pt' or 'en')
   * @returns {Object} Share data
   */
  static getShareData(org, lang = 'pt') {
    const url = this.getShareUrl(org.id)
    const title = org.name
    const description = org.about[lang] || org.about.pt

    // Limit description length for sharing
    const shortDescription = description.length > 200
      ? description.substring(0, 197) + '...'
      : description

    return {
      url,
      title,
      description: shortDescription,
      fullDescription: description
    }
  }

  /**
   * Share to WhatsApp
   * @param {Object} org - Organization object
   * @param {string} lang - Language code
   */
  static shareToWhatsApp(org, lang = 'pt') {
    const { url, title, description } = this.getShareData(org, lang)
    const text = `${title}\n\n${description}\n\n${url}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  /**
   * Share to Facebook
   * @param {Object} org - Organization object
   */
  static shareToFacebook(org) {
    const { url } = this.getShareData(org)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  /**
   * Share to Twitter/X
   * @param {Object} org - Organization object
   * @param {string} lang - Language code
   */
  static shareToTwitter(org, lang = 'pt') {
    const { url, title, description } = this.getShareData(org, lang)
    // Twitter has 280 char limit, keep some space for URL
    const maxTextLength = 240
    const text = description.length > maxTextLength
      ? `${title}: ${description.substring(0, maxTextLength - title.length - 5)}...`
      : `${title}: ${description}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  /**
   * Share to LinkedIn
   * @param {Object} org - Organization object
   */
  static shareToLinkedIn(org) {
    const { url } = this.getShareData(org)
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  /**
   * Copy link to clipboard
   * @param {Object} org - Organization object
   * @returns {Promise<boolean>} Success status
   */
  static async copyToClipboard(org) {
    const { url } = this.getShareData(org)

    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url)
        return true
      }

      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const success = document.execCommand('copy')
      textArea.remove()

      return success
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      return false
    }
  }

  /**
   * Use native Web Share API if available
   * @param {Object} org - Organization object
   * @param {string} lang - Language code
   * @returns {Promise<boolean>} Success status
   */
  static async nativeShare(org, lang = 'pt') {
    if (!navigator.share) {
      return false
    }

    const { url, title, description } = this.getShareData(org, lang)

    try {
      await navigator.share({
        title,
        text: description,
        url
      })
      return true
    } catch (error) {
      // User cancelled or error occurred
      if (error.name !== 'AbortError') {
        console.error('Native share failed:', error)
      }
      return false
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShareService
}
