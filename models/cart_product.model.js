import { format } from "mysql2";
import DatabaseModel from "./database.model.js";

class CartProductModel extends DatabaseModel{
    constructor(){
        super();
    }

    fetchCartProductRecord = async (fields_to_select = "*", where_clause = "", where_values = []) => {
        return await this.executeQuery(format(
            `SELECT ${fields_to_select} FROM cart_products
            ${where_clause ? `WHERE ${where_clause}` : ""}
            `, where_values
        ));
    }

    fetchProductsOnCart = async () => {
        return await this.executeQuery(format(`
            SELECT cart_products.quantity, products.id, products.name, products.description, products.price
            FROM cart_products
            INNER JOIN products ON products.id = cart_products.product_id`
        ));
    }

    insertCartProductsData = async (products_data) => {
        return await this.executeQuery(format("INSERT INTO cart_products SET ?", [products_data]));
    }
    
    updateCartProductsData = async (cart_id, products_data) => {
        return await this.executeQuery(format("UPDATE cart_products SET ? WHERE id = ?", [products_data, cart_id]));
    }
    
    deleteCartProductsData = async (cart_id) => {
        return await this.executeQuery(format("DELETE FROM cart_products WHERE id = ?", [cart_id]));
    }
    
    checkoutCartProducts = async () => {
        return await this.executeQuery(format("DELETE FROM cart_products WHERE id > 0"));
    }
}

export default CartProductModel;