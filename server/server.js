require("dotenv").config();

const express = require("express");
const cors = require("cors")

const app = express(); 

const authRouter = require("./router/auth-router")
const contactRouter = require("./router/contact-router")
const serviceRouter = require("./router/service-router")
const adminRouter = require("./router/admin-router")
const connectDb = require("./util/db")

const errorMiddleware = require("./middlewares/error-middleware")

var corsOptions = {
    origin: 'http://localhost:5173',
    methods: " GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials:true,
  };

app.use(cors(corsOptions))

app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/form",contactRouter);
app.use("/api/data",serviceRouter)
// lets define admin route
app.use("/api/admin",adminRouter)

app.use(errorMiddleware)
const PORT = 9000

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running at PORT : ${PORT}`);
    })
})

