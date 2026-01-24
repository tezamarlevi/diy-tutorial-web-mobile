import Product from "../models/Product.js";

export async function getAllProducts (req,res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // with -1 will Sort by newest first
        res.status(200).json(products);

    } catch (error) {
        console.error("Error in getAllProducts controller", error);
        res.status(500).json({message:"Internal server error"});
    }
 }

export async function getProductById (req,res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.json(product);
    } catch (error) {
        console.error("Error in getProductById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createProduct (req,res) {
    try {
        const {name, description, price, category, stock, image} = req.body;
        const product = new Product({name, description, price, category, stock, image});

        await product.save();
        res.status(201).json({message: "Product created successfully!"});
    } catch (error) {
        console.error("Error in createProduct controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateProduct (req,res) {
    try {
        const {description, price, category, stock, image} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { description, price, category, stock, image },
            {
                new: true
            }
        );

        if (!updatedProduct) return res.status(404).json({message: "Product not found"});

        res.status(200).json({message: "Product updated successfully!"});
    } catch (error) {
        console.error("Error in updateProduct controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteProduct (req,res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({message: "Product not found"});
        res.status(200).json({message: "Product deleted successfully!"});
    } catch (error) {
        console.error("Error in deleteProduct controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

