import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a professional competitive exam paper setter for JEE and NEET.

RULES:
- Strictly follow NCERT syllabus and guidelines.
- Questions must be original and of authentic exam quality.
- No conceptual errors allowed.
- Use realistic exam-level numerical values.
- Maintain exam authenticity in language and format.
- Follow the exact difficulty distribution requested.
- Each question must have exactly 4 options.
- Provide clear, step-by-step solutions when requested.

You MUST return ONLY valid JSON with no markdown formatting, no code blocks, no extra text. Just raw JSON.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { exam, subject, chapter, num_questions, include_solutions } = await req.json();

    if (!exam || !subject || !chapter || !num_questions) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: exam, subject, chapter, num_questions" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const easy = Math.round(num_questions * 0.3);
    const hard = Math.round(num_questions * 0.2);
    const moderate = num_questions - easy - hard;

    const userPrompt = `Generate a mock test with the following configuration:

CONFIGURATION:
- Exam: ${exam}
- Subject: ${subject}
- Chapter: ${chapter}
- Total Questions: ${num_questions}
- Difficulty Distribution: Easy: ${easy}, Moderate: ${moderate}, Hard: ${hard}
- Include Solutions: ${include_solutions ? "YES" : "NO"}

OUTPUT JSON FORMAT:
{
  "meta": {
    "exam": "${exam}",
    "subject": "${subject}",
    "chapter": "${chapter}",
    "total_questions": ${num_questions},
    "estimated_time_minutes": ${num_questions * 2}
  },
  "questions": [
    {
      "id": 1,
      "difficulty": "easy|moderate|hard",
      "bloom_level": "Remember|Understand|Apply|Analyze",
      "concept_tags": ["tag1", "tag2"],
      "type": "mcq",
      "question": "Question text here",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correct_answer": "A|B|C|D",
      "solution": "Step-by-step solution (only if include_solutions is YES)"
    }
  ]
}

Return ONLY valid JSON. No markdown, no code blocks.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_completion_tokens: 8000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI Gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to generate test. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("No content in AI response");
    }

    // Clean potential markdown wrapping
    let jsonStr = rawContent.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const testData = JSON.parse(jsonStr);

    return new Response(JSON.stringify(testData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-mock-test error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
