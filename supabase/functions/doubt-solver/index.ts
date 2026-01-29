import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SYSTEM_PROMPT = `You are an expert JEE (Main & Advanced) and NEET tutor. Your role is to solve doubts for Class 11-12 students preparing for competitive exams.

RESPONSE FORMAT:
1. Start with "**Solution:**" heading
2. List "**Given:**" information clearly
3. Show "**Formula/Concept:**" with proper LaTeX notation (use $$ for display math, $ for inline)
4. Provide "**Step-by-step Solution:**" numbered steps
5. State the "**Answer:**" clearly highlighted
6. Add "**Key Points to Remember:**" for exam preparation
7. Include "**Common Mistakes:**" students should avoid
8. Mention if this is a frequently asked type in JEE/NEET

GUIDELINES:
- Use simple language appropriate for Class 11-12 level
- Always show formulas before calculations
- Use proper mathematical notation with LaTeX
- Highlight shortcuts and tricks useful for competitive exams
- Relate to NCERT concepts when applicable
- Be encouraging and supportive
- For numerical problems, always verify the answer
- For theory questions, be concise but complete

DIFFICULTY MODES:
- Beginner: Explain every step in detail, use analogies
- Average: Standard approach with key steps explained  
- Advanced: Competition-level approach with advanced techniques

Subject-specific notes:
- Physics: Always draw diagrams mentally, state sign conventions
- Chemistry: Balance equations, show mechanisms for organic
- Mathematics: State theorems used, show intermediate steps
- Biology: Use NCERT terminology, mention important diagrams`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { question, difficulty = 'average', subject } = await req.json();
    
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const difficultyContext: Record<string, string> = {
      beginner: 'Explain in the simplest way possible with detailed steps and analogies.',
      average: 'Use standard approach with clear explanations.',
      advanced: 'Use competition-level approach with advanced techniques and shortcuts.'
    };

    const userMessage = `
Difficulty Mode: ${difficulty.toUpperCase()} - ${difficultyContext[difficulty] || difficultyContext.average}
${subject ? `Subject: ${subject}` : ''}

Student's Question:
${question}

Provide a complete, exam-oriented solution.`;

    console.log('Sending request to Lovable AI Gateway with model: openai/gpt-5');
    
    const requestBody = {
      model: 'openai/gpt-5',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      stream: true
    };

    console.log('Request body:', JSON.stringify(requestBody));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to get AI response', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Streaming response from AI Gateway');
    
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      },
    });

  } catch (error) {
    console.error('Doubt solver error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
