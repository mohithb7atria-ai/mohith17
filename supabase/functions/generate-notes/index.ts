import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a senior NCERT textbook author and subject matter expert. Your task is to create comprehensive, detailed study notes for competitive exam preparation (JEE & NEET).

INSTRUCTIONS:
- Write notes in clean Markdown format
- Cover EVERY important concept, definition, formula, derivation, and example from the NCERT textbook for the given chapter
- Use proper headings (##, ###) to organize content
- Include all important formulas in LaTeX notation wrapped in $ or $$
- Add "Key Points" boxes using blockquotes (>)
- Include diagrams descriptions where relevant
- Add mnemonics and memory aids where helpful
- Include solved examples with step-by-step solutions
- Add "Common Mistakes" section at the end
- Add "Important Formulas Summary" at the end
- Content must be exam-focused and NCERT-aligned
- Be thorough - these notes should be sufficient for complete chapter revision
- Use bullet points and numbered lists for clarity`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, chapter } = await req.json();

    if (!subject || !chapter) {
      return new Response(
        JSON.stringify({ error: "subject and chapter are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Create comprehensive, detailed NCERT-aligned study notes for:

**Subject:** ${subject}
**Chapter:** ${chapter}

Requirements:
1. Start with a brief chapter overview (2-3 lines)
2. Cover all topics systematically with detailed explanations
3. Include ALL important formulas with proper notation
4. Add solved numerical examples where applicable
5. Include diagrams descriptions (label them clearly)
6. Add "Did You Know?" facts for better retention
7. End with:
   - Key Formulas Summary table
   - Common Mistakes to Avoid
   - Previous Year Question Trends (JEE/NEET)
   - Quick Revision Checklist

Make the notes detailed enough that a student can use them as their primary study material for this chapter.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a minute." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content generated");
    }

    return new Response(
      JSON.stringify({ notes: content, subject, chapter }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-notes error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Failed to generate notes" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
