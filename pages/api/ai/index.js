import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

async function handler(req, res) {
  const { searchInput } = req.body;

  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Give me two book recommendation based on ${searchInput}. Only answer with the title and author of the book`,
      },
    ],
    model: "claude-3-opus-20240229",
  });

  console.log("Hallo", message);
  res.status(200).json(message.content);
}

export default handler;
