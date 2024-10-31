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

    priceRange = {
        title: 'Price',
        min: 0,
        max: 10000,
        step:10,
        selectedPrice: 10000
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
    pageSize= 8;
    pageSizeOptions = [5, 10, 15];
}