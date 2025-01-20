// index.js for Lambda
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // We'll set this in Lambda
});

exports.handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body);
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                // System message to define bot's behavior
                {
                    role: "system",
                    content: "You are Hillary's portfolio AI assistant. You know about his skills, projects, and experience. Be friendly and professional."
                },
                // User's message
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 150
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // CORS support
            },
            body: JSON.stringify({
                message: completion.choices[0].message.content
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process message' })
        };
    }
};