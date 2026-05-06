import pool from "../config/database.js";
const createTable = async () => {
  const query_text = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL)`;

  try {
    await pool.query(query_text);
    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table", err);
  }
};
export default createTable;
