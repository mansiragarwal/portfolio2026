import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const SYSTEM_PROMPT = `You are a personal wardrobe stylist AI. Given a list of clothing items extracted from an inspiration outfit and a user's wardrobe inventory, find the best matches.

Respond with valid JSON only (no markdown, no code fences) in this exact structure:
{
  "matches": [
    {
      "wardrobeItemId": "id-from-wardrobe",
      "wardrobeItemName": "name of the wardrobe piece",
      "matchedTo": "cream oversized sweater",
      "reason": "Your ivory chunky knit is very similar in tone and silhouette",
      "confidence": "high|medium|low"
    }
  ]
}

Rules:
- Only include matches with medium or high confidence
- Match based on color similarity, category, style, and overall vibe
- A wardrobe item can match multiple inspiration items if relevant
- Be specific about WHY something matches
- If nothing matches, return an empty matches array`;

export async function POST(request: NextRequest) {
  try {
    const { extractedItems, wardrobeItems } = await request.json();

    if (!extractedItems || !wardrobeItems || wardrobeItems.length === 0) {
      return NextResponse.json({ matches: [] });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const wardrobeSummary = wardrobeItems.map(
      (w: { id: string; name: string; category: string; color: string; description: string }) =>
        `[${w.id}] ${w.name} — ${w.category}, ${w.color}. ${w.description}`
    ).join("\n");

    const inspirationSummary = extractedItems.map(
      (i: { name: string; category: string; color: string; description: string }) =>
        `${i.name} — ${i.category}, ${i.color}. ${i.description}`
    ).join("\n");

    const response = await getClient().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `INSPIRATION OUTFIT ITEMS:\n${inspirationSummary}\n\nMY WARDROBE:\n${wardrobeSummary}\n\nFind the best matches from my wardrobe for each inspiration item.`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ matches: [] });
    }

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Matching failed";
    console.error("Wardrobe match error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
