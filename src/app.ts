import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleError } from "./errors";
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";
import { advertisedRoutes } from "./routes/advertisedcars.routes";
import { addressRoutes } from "./routes/address.routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: ["localhost:3000"] }));

app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/advertised", advertisedRoutes);
app.use("/address", addressRoutes);

app.use(handleError);

export default app;
