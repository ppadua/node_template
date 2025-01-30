import mysql from "mysql2/promise";

class DatabaseModel{
    static pool;

    constructor(){
        if(!DatabaseModel.pool){
            const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

            DatabaseModel.pool = mysql.createPool({
                host: "localhost",
                user: "root",
                password: "root",
                database: "tesda",
                port: DATABASE_PORT,
            });
        }
    }
    
    executeQuery = async (query) => {
        const connection = await DatabaseModel.pool.getConnection();

        try{
            const [rows] = await connection.query(query);
            return rows;
        }
        catch(error){
            throw error;
        }
        finally{
            connection.release();
        }
    }
}

export default DatabaseModel;