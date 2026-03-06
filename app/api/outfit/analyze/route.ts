import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const SYSTEM_PROMPT = `You are a fashion analyst AI. Given an outfit inspiration photo, extract detailed information about the clothing items, colors, and style.

Respond with valid JSON only (no markdown, no code fences) in this exact structure:
{
  "items": [
    {
      "name": "cream oversized cable-knit sweater",
      "category": "top|bottom|outerwear|shoes|accessory|dress|bag",
      "color": "cream",
      "description": "Relaxed-fit chunky cable-knit pullover in an off-white cream tone"
    }
  ],
  "colors": [
    { "hex": "#F5F0E8", "name": "cream" }
  ],
  "silhouette": "Relaxed oversized top with slim straight-leg bottom, creating a balanced proportion",
  "style": "Cozy minimalist with neutral earth tones",
  "shoppingAlternatives": [
    {
      "originalItem": "cream oversized sweater",
      "suggestion": "H&M Oversized Rib-Knit Sweater in Light Beige or Uniqlo Souffle Yarn Crew Neck",
      "priceRange": "$25–$50",
      "searchTerm": "cream oversized cable knit sweater women"
    }
  ]
}

Rules:
- Extract ALL visible clothing items and accessories
- Provide accurate hex color codes for the dominant 3–6 colors in the outfit
- Shopping alternatives should be real, affordable suggestions with concrete brand names
- Be specific about textures, fits, and materials when visible`;

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const response = await getClient().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this outfit photo. Extract all clothing items, the color palette, silhouette, style, and suggest shopping alternatives." },
            { type: "image_url", image_url: { url: imageData, detail: "high" } },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const analysis = JSON.parse(cleaned);

    return NextResponse.json(analysis);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    console.error("Outfit analysis error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
