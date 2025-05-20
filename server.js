import express from "express"
import invoiceRoutes from "./routes/invoiceRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express()
app.use(cors())

app.use(cors({
  origin: "*", // Allow all origins (use caution in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
const PORT = process.env.PORT || 5000

// console.log(process.env.MONGO_URI)

connectDB()

app.use("/api/invoice", invoiceRoutes)


app.listen(PORT, () => {
  console.log("Server is running on port", PORT )
})

//mongodb+srv://lalremruotinfimate:K02mo6UWb0N2UcG3@cluster0.tvicdny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0