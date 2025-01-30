import CartProductModel from "../models/cart_product.model.js";

class ProductController {
    updateCartData = async (req, res) => {
        const response_data = { status: false, message: "" };

        try{
            const { product_id, quantity = 1, is_delete} = req.body;
            const cartProductModel = new CartProductModel();
            const [ cart_product ] = await cartProductModel.fetchCartProductRecord("id", "product_id = ?", [product_id] );

            if(cart_product?.id){
                if(is_delete){
                    const { affectedRows } = await cartProductModel.deleteCartProductsData(cart_product.id);
                    response_data.status = !!affectedRows;
                }
                else{
                    const { affectedRows } = await cartProductModel.updateCartProductsData(cart_product.id, { quantity });
                    response_data.status = !!affectedRows;
                }
            }
            else{
                response_data.message = "Product not found in the cart.";
            }
        }
        catch(error){
            console.log(error);
        }

        res.json(response_data);
    }

    checkout = async (req, res) => {
        const response_data = { status: false, message: "" };

        try{
            const cartProductModel = new CartProductModel();
            const { affectedRows } = await cartProductModel.checkoutCartProducts();
            
            if(affectedRows){
                response_data.status = !!affectedRows;
            }
            else{
                response_data.message = "Failed to checkout products on cart.";
            }
        }
        catch(error){
            console.log(error);
        }

        res.json(response_data);
    }
}

export default new ProductController;