import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { testDbConnection } from "./config/db.js";
import routes from "./routes/index.js";

const app = express();

/**
 * Global middlewares (HTTP infrastructure)
 * - cors(): allow FE (e.g. http://localhost:5173) to call BE (http://localhost:8080)
 * - express.json(): parse JSON body -> req.body
 * - morgan(): log requests to terminal
 */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api", routes);

// 404 handler (optional but helpful)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (so AppError works)
app.use((err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  // Log full error for debugging in terminal
  console.error(err);

  res.status(statusCode).json({ message });
});

const port = Number(process.env.PORT || 8080);

async function bootstrap() {
  try {
    const ok = await testDbConnection();
    if (!ok) throw new Error("DB test query failed");

    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("DB connection failed");
    console.error(err?.message || err);
    process.exit(1);
  }
}

bootstrap();
