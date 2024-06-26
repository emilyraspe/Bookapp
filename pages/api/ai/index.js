import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

async function handler(req, res) {
  const { searchInput, genre } = req.body;

  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Give me one book recommendation based on ${searchInput} and consider the genre ${genre}. Only answer with the title of the book. `,
      },
    ],
    model: "claude-3-opus-20240229",
  });

  res.status(200).json(message.content);
}

export default handler;
