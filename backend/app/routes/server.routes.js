const indexRoutes = require('../index/index.routes');
const productRoutes = require('../product/product.routes');
// const userRoutes = require('../user/user.routes');
// const orderRoutes = require('../order/order.routes');

module.exports = (app) => {
    app.use('/api/product', productRoutes)
    // app.use('/api/user', userRoutes)
    // app.use('/api/order', orderRoutes)
    app.use('/*', indexRoutes);
}
