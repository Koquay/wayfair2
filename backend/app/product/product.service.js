require("./product.model");
const Product = require("mongoose").model("Product");

exports.getProducts = async (req, res) => {
    console.dir("ProductsService.getProducts");
  
    const sidenavFiltersStr = req.query.sidenavFilters;
  
    let sidenavFilters;
  
    const productCountPipeline = [];
  
    if (sidenavFiltersStr) {
      sidenavFilters = JSON.parse(req.query.sidenavFilters);
    } else {
      sidenavFilters = [];
    }
    console.dir("sidenavFilters", sidenavFilters);
  
    const aggregatePipeline = buildAggregatePipeline(
      sidenavFilters,
      productCountPipeline
    );
    console.dir("aggregatePipeline", aggregatePipeline);
  
    console.dir("aggregatePipeline", JSON.stringify(aggregatePipeline));
  
    try {
      const products = await Product.aggregate(aggregatePipeline);
      console.dir("products", products);
      const productCount = await getProductCount(productCountPipeline);
      console.dir("productCount", productCount);
      res.status(200).json({ products, productCount });
    } catch (error) {
      console.error(error);
      res.status(500).send("Problem getting products.");
    }
  };

  const buildAggregatePipeline = (filters, productCountPipeline) => {
    let {
      categories,
      priceRanges,
      ratings,
      pageNo,
      pageSize,
      sortFilter,
    } = filters;
    
    console.dir("categories", categories);
  
    let aggregatePipeline = [];
  
    let categoriesMatch = buildCategoriesMatch(categories);
    if (categoriesMatch) {
      aggregatePipeline.push(categoriesMatch);
      productCountPipeline.push(categoriesMatch);
    }
  
    let priceMatch = buildPriceRangeMatch(priceRanges);
    if (priceMatch) {
      aggregatePipeline.push(priceMatch);
      productCountPipeline.push(priceMatch);
    }
  
    let ratingMatch = buildRatingMatch(ratings);
    if (ratingMatch) {
        aggregatePipeline.push(ratingMatch)
        productCountPipeline.push(ratingMatch);
    }
  
    // aggregatePipeline.push(buildSortMatch(sortFilter));
    checkForEmptyAggregate(aggregatePipeline);
    checkForEmptyAggregate(productCountPipeline);
    aggregatePipeline.push(buildPageNumberFilter(pageNo, pageSize));
    aggregatePipeline.push(buildPageSizeFilter(pageSize));
  
    return aggregatePipeline;
  };
  
  
  const buildCategoriesMatch = (categories) => {
    if (categories?.length) {
      return { $match: { category: { $in: categories } } };
    }
    return null;
  };
  
  const buildRatingMatch = (ratings) => {
    if (ratings?.length) {
      return { $match: { rating: { $in: ratings } } };
    }
    return null;
  };
  
  const buildPriceRangeMatch = (priceRanges) => {
    if (priceRanges?.length) {
      let priceMatches = [];
  
      for (let priceRange of priceRanges) {
        priceMatches.push({
          $and: [
            { $gte: ["$price", +priceRange.low] },
            { $lte: ["$price", +priceRange.high] },
          ],
        });
      }
  
      return { $match: { $expr: { $or: priceMatches } } };
    }
  };
  
  const buildSortMatch = (sortFilter) => {
    let filter;
    if (sortFilter?.field == "price") {
      filter = { $sort: { price: sortFilter?.direction } };
    } else if (sortFilter?.field == "rating") {
      filter = { $sort: { rating: sortFilter?.direction } };
    }
  
    return filter;
  };
  
  const buildPageNumberFilter = (pageNo, pageSize) => {
    let skip = (pageNo - 1) * pageSize;
  
    return { $skip: skip };
  };
  
  const buildPageSizeFilter = (pageSize) => {
    return { $limit: pageSize };
  };
  
  const getProductCount = async (productCountPipeline) => {
    let productCount;
    productCountPipeline.push({ $count: "productCount" });
  
    productCount = await Product.aggregate(productCountPipeline);
  
    if (productCount.length) {
      return productCount[0].productCount;
    }
  
    return 0;
  };
  
  const checkForEmptyAggregate = (aggregatePipeline) => {
    if (aggregatePipeline.length === 0) {
      aggregatePipeline.push({ $match: { category: { $ne: null } } });
    }
  };