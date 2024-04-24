import Anthropic from "@anthropic-ai/sdk";
import { useState } from "react";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

async function main(message) {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: "Is this working?" }],
    model: "claude-3-opus-20240229",
  });

  console.log("Hallo", message.content);
}

main(message);
