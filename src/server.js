const express = require("express");
require("dotenv").config();
const Groq = require("groq-sdk");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


const model = "openai/gpt-oss-20b";



const app = express();


const PORT = 5000;


app.use(express.json());


app.get("/", (req, res) => {
  res.send("AI Study Assistant API is running!");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




app.post("/ask", async (req, res) =>{
    const { question } = req.body;

    if(!question){
        return res.status(404).json(
            {
                message: "question is required"
            }
        )
    }
    
    try{
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            message: [
                {
                    role: 'user',
                    content: question
                }
            ]
        });
        const answer = completion.choices[0].message.content;

        res.json({
            question: question,
            answer: answer
        });



     }catch(error){
        console.error(error);

        res.status(500).json(
            {
                message: "internal server error"
            }
        )
    }
    
    


})



