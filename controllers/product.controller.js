import ProductModel from "../models/product.model.js";
import Ejs from "ejs";
import Path from "path";    
class ProductController {
    index = async (req, res) => {
        const products = await new ProductModel().fetchAllProducts();
        const render_product_on_cart =   await Ejs.renderFile(Path.join(process.cwd(), "views/components/cart.ejs"), {}, { async: true })

        res.render("index", { products, render_product_on_cart});
    }
}

export default new ProductController;