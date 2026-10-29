require("dotenv").config();

console.log(
    "API key loaded:",
    Boolean(process.env.GOOGLE_GENAI_API_KEY)
);

const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js");
const invokeGeminiAi = require("./src/services/ai.service.js");

connectToDB()
console.log("Calling Gemini...");
// invokeGeminiAi().catch(console.error);

app.listen(3000, () => {
    console.log("Server is listening on PORT : 3000");
});
