const express = require("express")

const { connection } = require("./config/db")

const cors = require("cors")
const { SignupRoute } = require("./Routes/SignupRoute")

const { SigninRouter } = require("./Routes/SigninRoute")

const app = express()

app.use(express.json())

app.use(cors())


app.use("/signup",SignupRoute)

app.use("/login",SigninRouter)




const PORT = process.env.PORT || 8000

app.listen(PORT, async()=>{
    try{
        await connection
        console.log("Connected to DB successfullys")
    }
    catch(err){
        console.log(err)
    }
    console.log("PORT running on" + PORT)
})