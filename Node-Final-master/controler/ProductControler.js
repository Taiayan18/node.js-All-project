import { User } from "../model/authUser.js"
import { Product } from "../model/UserModel.js"

export const CreateProduct = async (req, res) => {
    try {
        const { title, content, tags } = req.body
        const { id, email, iat, exp } = req.User
        console.log(id)
        if (!title || !content || !tags) {
            return res.status(400).json({
                status: false,
                message: 'All Filed Required'
            })
        }

        const exitsProduct = await Product.findOne({ title, content })

        if (exitsProduct) {
            return res.status(400).json({
                status: false,
                message: "Product Already Created"
            })
        }

        const NewProduct = await Product({ title, content, tags, authorId: id })
        await NewProduct.save()

        return res.status(201).json({
            status: true,
            message: "Product Create Succesfully",
            data: NewProduct
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Create Product Failed ${error.message}`
        })
    }
}


export const GetProduct = async (req, res) => {
    try {
        const { Search, sortBy, Order } = req.query
        let { page, limit } = req.query

        page = parseInt(page) || 1
        limit = parseInt(limit) || 5

        let query = {}
        if (Search) {
            query = {
                $or: [
                    { title: { $regex: "^" + Search, $options: "i" } },
                    { content: { $regex: "^" + Search, $options: "i" } }
                ]
            }
        }

        let sortOption = {}
        if (sortBy) {
            sortOption[sortBy] = Order === "desc" ? -1 : 1
        }

        const skip = (page - 1) * limit
        const Products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)


        const total = await User.countDocuments(query)

        return res.json({
            status: true,
            message: "Product Get All",
            data: Products,
            pagination: {
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                perPage: limit
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Get Product Failed ${error.message}`
        })
    }
}


export const GetSingleProduct = async (req, res) => {
    try {
        const { id } = req.params

        const Products = await Product.findById(id)

        if (!Products) {
            return res.status(404).json({
                status: false,
                message: "Product Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Get Single Product Succesfully!",
            data: Products
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Get Single Product Failed ${error.message}`
        })
    }
}


export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.User.id
        const { title, content, tags } = req.body


        const ExitsProduct = await Product.findById(id)

        if (!ExitsProduct) {
            return res.status(404).json({
                status: false,
                message: "Product Not FOund"
            })
        }

        if (ExitsProduct.authorId.toString() !== userId) {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to update this product",
            })
        }

        const updateProduct = await Product.findByIdAndUpdate(id, { title, content, tags }, { new: true })

        return res.status(200).json({
            status: true,
            message: "Update Product",
            data: updateProduct
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Update Product Failed ${error.message}`
        })
    }
}


export const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.User.id

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product Not FOund"
            })
        }

        if (product.authorId.toString() !== userId) {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to delete this product",
            })
        }

        const ExitsProduct = await Product.findByIdAndDelete(id)

        return res.status(200).json({
            status: true,
            message: "Delete Product succesfully!",
            data: ExitsProduct
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Delete Product Failed ${error.message}`
        })
    }
}