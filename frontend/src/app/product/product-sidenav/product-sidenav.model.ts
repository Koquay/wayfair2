export class ProductSidenavModel {
    category = {
        title: 'Category',
        categories: [
            {
                name: 'Living Room Sets',
                checked: false,
            },
            {
                name: 'Sectionals',
                checked: false,
            },
            {
                name: 'Sofas',
                checked: false,
            },
            {
                name: 'Chair and Seating',
                checked: false,
            }
            ],
    };

    priceFilter = {
        title: 'Price',
        priceRange: [
          {
            range: { low: 1, high: 500 },
            label: 'Under $500',
            checked: false,
          },
          {
            range: { low: 500, high: 1000 },
            label: '$500 - $1000',
            checked: false,
          },
          {
            range: { low: 1000, high: 2000 },
            label: '$1000 - $2000',
            checked: false,
          },
          {
              range: { low: 2000, high: 3000 },
              label: '$2000 - $3000',
              checked: false,
            },
            {
                range: { low: 3000, high: 4000 },
                label: '$3000 - $4000',
                checked: false,
              },
            {
              range: { low: 4000, high: 111111111 },
              label: 'Over $4000',
              checked: false,
            }
        ],
      };
    
    ratings = {
        title: 'Ratings',
        ratings: [
        {
            rating: 5,
            checked: false,
            },
            {
            rating: 4,
            checked: false,
            },
            {
            rating: 3,
            checked: false,
            },
            {
            rating: 2,
            checked: false,
            },
            {
            rating: 1,
            checked: false,
            },
                            
        ],
    };

    pageNo= 1;
    pageSize= 9;
    pageSizeOptions = [5, 10, 15];
}