import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleError } from "./errors";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: ["localhost:3000"] }));

app.use("/users", userRoutes);

app.use(handleError);

export default app;
