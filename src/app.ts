import "express-async-errors";
import express from "express"

import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({origin: ["localhost:3000"]}))

export default app;