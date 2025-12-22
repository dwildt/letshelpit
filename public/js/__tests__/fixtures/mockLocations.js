/**
 * Mock Locations for Testing
 */

const mockLocations = {
  countries: [
    {
      code: 'BR',
      name: 'Brazil',
      states: [
        {
          code: 'RS',
          name: 'Rio Grande do Sul',
          cities: [
            'Porto Alegre',
            'Canoas',
            'Novo Hamburgo'
          ]
        },
        {
          code: 'SP',
          name: 'São Paulo',
          cities: [
            'São Paulo',
            'Campinas'
          ]
        }
      ]
    }
  ]
}

module.exports = { mockLocations }
