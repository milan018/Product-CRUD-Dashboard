import pool from "../config/database.js";
export const getAllProductsService = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};
export const getProductByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
  return result.rows[0];
};

export const createProductService = async (name, description, price) => {
  const result = await pool.query(
    "INSERT INTO products (name,description,price) VALUES ($1,$2,$3) RETURNING *",
    [name, description, price],
  );
  return result.rows[0];
};
export const updateProductService = async (id, name, description, price) => {
  const result = await pool.query(
    "UPDATE products SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING *",
    [name, description, price, id],
  );
  return result.rows[0];
};
export const deleteProductService = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
