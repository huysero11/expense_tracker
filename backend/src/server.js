import "dotenv/config";
import express from "express";
import { testDbConnection } from "./config/db.js";

const app = express();

app.get("/health", (req, res) => res.json({ status: "ok" }));

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
