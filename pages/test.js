import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

async function main() {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: "Is this working?" }],
    model: "claude-3-opus-20240229",
  });

  console.log("Hallo", message.content);
  return message;
}

export default main;
