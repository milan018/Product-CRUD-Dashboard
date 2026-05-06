import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/database.js";
import productRouter from "./routes/product_router.js";
import errorhandling from "./middleware/errorhandling.js";
import createTable from "./data/CreateTable.js";
const app = express();
const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/api", productRouter);
//error handling middleware
app.use(errorhandling);
//crete table if not exists before starting the server

createTable();
//testing
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
//serverrunning
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
