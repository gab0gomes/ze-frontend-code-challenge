const response = {
  data: {
    results: [
      {
        address_components: [
          {
            long_name: 'Avenida Mestre Lula',
            short_name: 'Av. Mte. Lula',
            types: ['route']
          },
          {
            long_name: 'Juazeiro',
            short_name: 'Juazeiro',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'Bahia',
            short_name: 'BA',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'Brasil',
            short_name: 'BR',
            types: ['country', 'political']
          },
          {
            long_name: '48900-415',
            short_name: '48900-415',
            types: ['postal_code']
          }
        ],
        formatted_address: 'Av. Mte. Lula, Juazeiro - BA, 48900-415, Brasil',
        geometry: {
          bounds: {
            northeast: {
              lat: -9.418218699999999,
              lng: -40.5012613
            },
            southwest: {
              lat: -9.4206725,
              lng: -40.5071495
            }
          },
          location: {
            lat: -9.4194,
            lng: -40.5042485
          },
          location_type: 'GEOMETRIC_CENTER',
          viewport: {
            northeast: {
              lat: -9.418096619708496,
              lng: -40.5012613
            },
            southwest: {
              lat: -9.420794580291501,
              lng: -40.5071495
            }
          }
        },
        place_id: 'ChIJQcZoQa5xcwcRz7ezc8aX2oY',
        types: ['route']
      }
    ],
    status: 'OK'
  }
}

export const getAddresses = jest.fn((param) => Promise.resolve(response))
