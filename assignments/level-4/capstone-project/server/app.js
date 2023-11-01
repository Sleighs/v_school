const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to port 8080!");
});
  
// Open AI Prompts
function generatePrompt(thing) {
  const capitalizedThing =
    thing[0].toUpperCase() + thing.slice(1).toLowerCase();

    return `JavaScript

    You: How do I combine arrays?
    JavaScript chatbot: You can use the concat() method.
    You: How do you make an alert appear after 10 seconds?
    JavaScript chatbot:: You can use the setTimeout() method.

    You: ${capitalizedThing}
    Javascript chatbot:`;
};

// OpenAI Post Requests
app.post("/api/generate/chat", (req, res) => {
  console.log("Connected to api...", req.body);

  (async () => {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(req.body.answer),
      temperature: 0.6,
      max_tokens: 100,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  })();
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));