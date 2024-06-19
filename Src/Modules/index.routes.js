import { categoryRouter } from "./Category/category.router.js"
import { subcategoryRouter } from "./subCategory/subcategory.router.js"
import { brandRouter } from './Brand/Brand.router.js';
import { productRouter } from "./Product/Product.router.js";
import { userRouter } from "./user/user.router.js";
import { authRouter } from "./auth/auth.router.js";
import { reviewRouter } from './Review/review.router.js';
import { wishListRouter } from "./whishList/wishList.router.js";
import { addressRouter } from "./address/address.router.js";
import { couponRouter } from './coupon/coupon.router.js';
import { cartRouter } from "./cart/cart.router.js";
import { orderRouter } from './order/order.router.js';



export const bootstrap = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/categories/:id/subCategories', subcategoryRouter)
    app.use('/api/v1/subCategories', subcategoryRouter)
    app.use('/api/v1/Brand', brandRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/user/manage', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/review', reviewRouter)
    app.use('/api/v1/wishList', wishListRouter)
    app.use('/api/v1/address', addressRouter)
    app.use('/api/v1/coupon', couponRouter)
    app.use('/api/v1/cart', cartRouter)
    app.use('/api/v1/order', orderRouter)
}