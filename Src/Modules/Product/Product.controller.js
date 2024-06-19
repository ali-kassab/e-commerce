import slugify from 'slugify'
import { catchError } from '../../middleware/catchError.js';
import { productModel } from '../../../Database/models/product.model.js';
import { AppError } from '../../utilites/AppError.js';
import { ApiFeature } from './../../utilites/apiFeature.js';
import { subCategoryModel } from '../../../Database/models/subCategory.model.js';
import { categoryModel } from './../../../Database/models/category.model.js';
import { brandModel } from './../../../Database/models/brand.model.js';


// this function is used to add new product by admin
// check if the product exist with the same price (according to the business)
// check (category,subcategory,brand are exist in database )
export const addproduct = catchError(async (req, res, next) => {

    let productExist = await productModel.findOne({ title: req.body.title, price: req.body.price })
    if (productExist) return next(new AppError('product already exists with this price', 400));

    let categoryExist = await categoryModel.findById(req.body.category)
    if (!categoryExist) return next(new AppError('category not exist', 404))

    let subCategory = await subCategoryModel.findById(req.body.subCategory)
    if (!subCategory) return next(new AppError('subCategory not exist', 404))

    let brand = await brandModel.findById(req.body.brand)
    if (!brand) return next(new AppError('brand not exist', 404))

    req.body.slug = slugify(req.body.title)
    if (req.files.imageCover[0].filename) {
        req.body.imageCover = req.files.imageCover[0].filename;
    }
    if (req.files.images) {
        req.body.images = req.files.images.map((img) => img.filename);
    }
    let product = await productModel.create(req.body)
    res.json({ msg: 'success', product })
})

// this function is used to get all products by admin
// api Feature (search-filter-sort-select filed-pagenation)
export const getAllProduct = catchError(async (req, res, next) => {

    let apiFeature = new ApiFeature(productModel.find(), req.query)
        .fields().sort().pagenation().search().filter()
    let product = await apiFeature.mongooseQuery.populate('category')

    if (product.length === 0) {
        return next(new AppError('No products found.', 404))
    }
    product && res.json({ msg: 'success', page: apiFeature.pageNumber, product })
    !product && res.json({ msg: 'product not found' })
})

// this function is used to get product by admin
export const getSingleproduct = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
        .populate('brand category subCategory')

    if (product) {
        return res.json({ msg: 'success', product });
    } else {
        return next(new AppError('Product not found', 404));
    }
});

// this function is used to add update product by admin
// check (category,subcategory,brand are exist in database )
export const updateproduct = catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title)
    if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map((img) => img.filename)

    if (req.body.category) {
        let categoryExist = await categoryModel.findById(req.body.category)
        if (!categoryExist) return next(new AppError('category not exist', 404))
    }
    if (req.body.subCategory) {
        let subCategory = await subCategoryModel.findById(req.body.subCategory)
        if (!subCategory) return next(new AppError('subCategory not exist', 404))

    }
    if (req.body.brand) {
        let brand = await brandModel.findById(req.body.brand)
        if (!brand) return next(new AppError('brand not exist', 404))
    }
    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    product && res.json({ msg: 'success', product })
    !product && res.json({ msg: 'product not found' })
})
// this function is used to delete product by admin
export const deleteproduct = catchError(async (req, res, next) => {
    let product = await productModel.findByIdAndDelete(req.params.id)
    product && res.json({ msg: 'success', product })
    !product && res.json({ msg: 'product not found' })
})


