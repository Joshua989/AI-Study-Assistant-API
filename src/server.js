const express = require("express");
require("dotenv").config();
const Groq = require("groq-sdk");



const app = express();


const PORT = 5000;


app.use(express.json());


app.get("/", (req, res) => {
  res.send("AI Study Assistant API is running!");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




app.post("/ask", (req, res) =>{
    const { question } = req.body;

    if(!question){
        return res.status(404).json(
            {
                message: "question is required"
            }
        )
    }

    res.json(
        {
            message: "your question is prossessing",
            question: question
        }
    )
})



