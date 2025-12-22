/**
 * Mock Organizations for Testing
 */

const mockOrganizations = [
  {
    id: 'test-org-1',
    name: 'Test Organization One',
    type: 'ngo',
    status: 'active',
    about: {
      pt: 'Organização de teste focada em crianças e educação',
      en: 'Test organization focused on children and education'
    },
    categories: ['children_youth', 'education'],
    location: {
      country: 'BR',
      countryName: 'Brazil',
      state: 'RS',
      stateName: 'Rio Grande do Sul',
      city: 'Porto Alegre',
      neighborhood: 'Centro',
      address: 'Rua Teste, 123',
      postalCode: '90000-000',
      coordinates: {
        lat: -30.0346,
        lng: -51.2177
      }
    },
    contact: {
      website: 'https://testorg1.org.br',
      email: 'contact@testorg1.org.br',
      phone: '+55 51 1234-5678',
      social: {
        instagram: 'testorg1',
        facebook: 'testorg1'
      }
    },
    donations: {
      methods: [
        {
          type: 'money',
          description: {
            pt: 'Doação via PIX',
            en: 'Donation via PIX'
          },
          details: {
            pix: 'testorg1@example.com'
          }
        },
        {
          type: 'food',
          description: {
            pt: 'Alimentos não perecíveis',
            en: 'Non-perishable food'
          }
        }
      ],
      acceptsItems: true,
      acceptsVolunteers: true
    },
    verified: true,
    dateAdded: '2024-01-15',
    lastUpdated: '2024-01-15',
    tags: ['educação', 'crianças', 'children', 'education']
  },
  {
    id: 'test-org-2',
    name: 'Test Organization Two',
    type: 'ngo',
    status: 'active',
    about: {
      pt: 'Organização de teste focada em saúde',
      en: 'Test organization focused on health'
    },
    categories: ['health'],
    location: {
      country: 'BR',
      countryName: 'Brazil',
      state: 'RS',
      stateName: 'Rio Grande do Sul',
      city: 'Canoas',
      neighborhood: 'Centro',
      address: 'Av Teste, 456',
      postalCode: '92000-000',
      coordinates: {
        lat: -29.9177,
        lng: -51.1834
      }
    },
    contact: {
      website: 'https://testorg2.org.br',
      email: 'contact@testorg2.org.br',
      phone: '+55 51 9876-5432',
      social: {
        instagram: 'testorg2'
      }
    },
    donations: {
      methods: [
        {
          type: 'money',
          description: {
            pt: 'Doação via transferência',
            en: 'Donation via transfer'
          }
        },
        {
          type: 'volunteering',
          description: {
            pt: 'Voluntariado médico',
            en: 'Medical volunteering'
          }
        }
      ],
      acceptsItems: false,
      acceptsVolunteers: true
    },
    verified: true,
    dateAdded: '2024-02-20',
    lastUpdated: '2024-02-20',
    tags: ['saúde', 'health', 'medical']
  },
  {
    id: 'test-org-3',
    name: 'Test Organization Three',
    type: 'ngo',
    status: 'active',
    about: {
      pt: 'Organização de teste focada em meio ambiente',
      en: 'Test organization focused on environment'
    },
    categories: ['environment'],
    location: {
      country: 'BR',
      countryName: 'Brazil',
      state: 'RS',
      stateName: 'Rio Grande do Sul',
      city: 'Novo Hamburgo',
      neighborhood: 'Zona Sul',
      address: 'Rua Verde, 789',
      postalCode: '93000-000',
      coordinates: {
        lat: -29.6783,
        lng: -51.1309
      }
    },
    contact: {
      website: 'https://testorg3.org.br',
      email: 'contact@testorg3.org.br',
      phone: '+55 51 5555-1234',
      social: {
        instagram: 'testorg3',
        facebook: 'testorg3',
        twitter: 'testorg3'
      }
    },
    donations: {
      methods: [
        {
          type: 'clothes',
          description: {
            pt: 'Roupas e calçados',
            en: 'Clothes and shoes'
          }
        }
      ],
      acceptsItems: true,
      acceptsVolunteers: false
    },
    verified: false,
    dateAdded: '2024-03-10',
    lastUpdated: '2024-03-10',
    tags: ['ambiente', 'environment', 'sustentabilidade']
  },
  {
    id: 'test-org-4',
    name: 'Test Organization Four',
    type: 'ngo',
    status: 'inactive',
    about: {
      pt: 'Organização de teste inativa',
      en: 'Inactive test organization'
    },
    categories: ['education'],
    location: {
      country: 'BR',
      countryName: 'Brazil',
      state: 'SP',
      stateName: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Centro',
      address: 'Rua Inativa, 999',
      postalCode: '01000-000'
    },
    contact: {
      email: 'contact@testorg4.org.br'
    },
    donations: {
      methods: [],
      acceptsItems: false,
      acceptsVolunteers: false
    },
    verified: false,
    dateAdded: '2023-12-01',
    lastUpdated: '2023-12-01',
    tags: []
  },
  {
    id: 'test-org-5',
    name: 'Test Organization Five',
    type: 'ngo',
    status: 'active',
    about: {
      pt: 'Organização com múltiplas categorias para testes de filtro',
      en: 'Organization with multiple categories for filter testing'
    },
    categories: ['children_youth', 'education', 'health'],
    location: {
      country: 'BR',
      countryName: 'Brazil',
      state: 'RS',
      stateName: 'Rio Grande do Sul',
      city: 'Porto Alegre',
      neighborhood: 'Zona Norte',
      address: 'Av Multi, 321',
      postalCode: '91000-000'
    },
    contact: {
      website: 'https://testorg5.org.br',
      email: 'contact@testorg5.org.br',
      phone: '+55 51 3333-4444',
      social: {
        instagram: 'testorg5'
      }
    },
    donations: {
      methods: [
        {
          type: 'money',
          description: {
            pt: 'Doação financeira',
            en: 'Financial donation'
          }
        },
        {
          type: 'food',
          description: {
            pt: 'Alimentos',
            en: 'Food'
          }
        },
        {
          type: 'volunteering',
          description: {
            pt: 'Voluntariado',
            en: 'Volunteering'
          }
        }
      ],
      acceptsItems: true,
      acceptsVolunteers: true
    },
    verified: true,
    dateAdded: '2024-04-05',
    lastUpdated: '2024-04-05',
    tags: ['multi', 'múltiplo', 'várias categorias']
  }
]

module.exports = { mockOrganizations }
