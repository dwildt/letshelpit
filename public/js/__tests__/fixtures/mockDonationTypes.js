/**
 * Mock Donation Types for Testing
 */

const mockDonationTypes = [
  {
    id: 'money',
    name: {
      pt: 'Dinheiro',
      en: 'Money'
    },
    icon: '💵',
    description: {
      pt: 'Doações financeiras',
      en: 'Financial donations'
    }
  },
  {
    id: 'food',
    name: {
      pt: 'Alimentos',
      en: 'Food'
    },
    icon: '🍎',
    description: {
      pt: 'Alimentos não perecíveis',
      en: 'Non-perishable food'
    }
  },
  {
    id: 'clothes',
    name: {
      pt: 'Roupas',
      en: 'Clothes'
    },
    icon: '👕',
    description: {
      pt: 'Roupas e calçados',
      en: 'Clothes and shoes'
    }
  },
  {
    id: 'volunteering',
    name: {
      pt: 'Voluntariado',
      en: 'Volunteering'
    },
    icon: '🙋',
    description: {
      pt: 'Trabalho voluntário',
      en: 'Volunteer work'
    }
  }
]

module.exports = { mockDonationTypes }
