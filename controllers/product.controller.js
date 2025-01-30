import ProductModel from "../models/product.model.js";
import CartProductModel from "../models/cart_product.model.js";
import Ejs from "ejs";
import Path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ProductController {
    index = async (req, res) => {
        try{
            const products = await new ProductModel().fetchProductRecord();    
            const products_on_cart = await new CartProductModel().fetchProductsOnCart();   
            const render_product_on_cart =   await Ejs.renderFile(Path.join(process.cwd(), "views/templates/cart.ejs"), {products_on_cart}, { async: true })
            
            res.render("index", { products, render_product_on_cart });
        }
        catch(error){
            console.log(error);
        }

    }
    
    addProductToCart = async (req, res) => {
        const response_data = { status: false, result: {}, message: "" }

        try{
            const { product_id, quantity = 1 } = req.body;
            const [ product_details ] = await new ProductModel().fetchProductRecord("id, name", "id = ?", [product_id]);;
            const cartProductModel = new CartProductModel();

            if(product_details?.id){
                /* Check if the product to be added is already in the cart. */
                const [ cart_product ] = await cartProductModel.fetchCartProductRecord(
                    "*", "product_id = ?",
                    [product_id]
                );

                /* If the product already exist on 's cart, increase the quantity. */
                if(cart_product?.id){
                    const { affectedRows } = await cartProductModel.updateCartProductsData(cart_product.id, { quantity: cart_product.quantity + parseInt(quantity) });

                    response_data.status = !!affectedRows;
                }
                /* If the product is not yet on the 's cart, create new cart product record. */
                else{
                    const { insertId } = await cartProductModel.insertCartProductsData({ product_id, quantity });

                    response_data.status = !!insertId;
                }

                const products_on_cart = await cartProductModel.fetchProductsOnCart();    
                const render_product_on_cart =   await Ejs.renderFile(Path.join(process.cwd(), "views/templates/cart.ejs"), {products_on_cart}, { async: true })

                response_data.result = { render_product_on_cart };

                response_data.message = response_data.status ? `${quantity} ${product_details.name}(s) added to cart.` : "Failed to add product to cart."

            }
            else{
                response_data.message = "Product does not exist.";
            }
        }
        catch(error){
            console.log(error);
        }

        res.json(response_data);
    }
}

export default new ProductController;